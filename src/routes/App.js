import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavigationRoutes from './NavigationRoutes';

const App = (props) => {
    return (
        <BrowserRouter>
            <NavigationRoutes />
        </BrowserRouter>
    );
};

export default App;
