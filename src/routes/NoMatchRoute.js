import React, { useEffect } from 'react';

const NoMatchRoute = (props) => {
    useEffect(() => props.setTitle('404 ERROR'));

    return <div>No Match</div>;
};

export default NoMatchRoute;
