import axios from 'axios'

const nodeApi = () => axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 10000
})

export default nodeApi
