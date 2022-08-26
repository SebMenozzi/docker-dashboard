const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const { exec, spawn } = require('child_process');
const readline = require('readline');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// static path
app.use(express.static(__dirname));
// logging
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const cmd_promise = (command) =>
    new Promise((resolve, reject) => {
        exec(command, { encoding: 'utf8' }, (error, stdout) => {
            if (error !== null) reject(error);
            else resolve(stdout);
        });
    });

app.get('/api/containers', async (req, res) => {
    try {
        const containers = await cmd_promise(
            'docker ps -a --format "{{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}\t{{.Names}}"'
        );
        const containers_list = containers.split('\n');

        let data = [];

        for (let container of containers_list) {
            let container_json = {};
            const container_data = container.split('\t');

            let [id, image, status, port, name] = container_data;

            container_json['id'] = id;
            container_json['image'] = image;
            container_json['status'] = status;
            container_json['is_active'] = status
                ? status.split(' ')[0] == 'Up'
                : false;
            container_json['port'] = port
                ? port.split(':')[1].split('-')[0]
                : '';
            container_json['name'] = name;

            data.push(container_json);
        }

        data.pop();

        return res.status(200).json({ success: true, containers: data });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/start_container', async (req, res) => {
    try {
        const { id } = req.body;
        await cmd_promise(`docker restart ${id}`);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/stop_container', async (req, res) => {
    try {
        const { id } = req.body;
        await cmd_promise(`docker stop ${id}`);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/delete_container', async (req, res) => {
    try {
        const { id } = req.body;
        await cmd_promise(`docker container rm ${id}`);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/send_command', async (req, res) => {
    try {
        const { id, command } = req.body;
        await cmd_promise(`docker exec -it ${id} sh -c "${command}"`);

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/restart_containers', async (req, res) => {
    try {
        await cmd_promise('docker restart $(docker ps -a -q)');

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.post('/api/delete_containers', async (req, res) => {
    try {
        await cmd_promise('docker rm -f $(docker ps -a -q)');

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SocketIO endpoint

let statsProcesses = {};
let logsProcesses = {};

io.sockets.on('connection', (socket) => {
    socket.on('containers.stats', () => {
        statsProcesses[socket.id] = spawn('docker', [
            'stats',
            '--all',
            '--format',
            '{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}'
        ]);

        statsProcesses[socket.id].stdout.on('data', (data) => {
            const containers_list = data.toString().split('\n');

            let stats = [];

            for (let container of containers_list) {
                let container_json = {};
                const container_data = container.split('\t');

                let [name, cpu, mem] = container_data;

                const weirdStdoutString = '[2J[H';

                if (name.includes(weirdStdoutString))
                    container_json['name'] = name.split(weirdStdoutString)[1];
                else container_json['name'] = name;

                container_json['cpu'] = cpu;
                container_json['mem'] = mem;

                stats.push(container_json);
            }

            stats.pop();

            if (stats.length > 0) io.emit('containers.stats', stats);
        });
    });

    socket.on('containers.stats.bye', () => {
        if (socket.id in statsProcesses) statsProcesses[socket.id].kill();
    });

    // get logs
    socket.on('containers.logs', (name) => {
        if (!(socket.id in logsProcesses)) {
            logsProcesses[socket.id] = spawn('docker', [
                'logs',
                name,
                '--tail',
                '1000',
                '--follow'
            ]);

            // listen to stdout
            logsProcesses[socket.id].stdout.on('data', (data) => {
                io.emit('containers.logs', data.toString());
            });

            // listen to stderr
            logsProcesses[socket.id].stderr.on('data', (data) => {
                io.emit('containers.logs', data.toString());
            });
        }
    });

    socket.on('containers.logs.bye', () => {
        if (socket.id in logsProcesses) logsProcesses[socket.id].kill();
    });
});

const PORT = process.env.PORT || 9090;

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}...`);
});
