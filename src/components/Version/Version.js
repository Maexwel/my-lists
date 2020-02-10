import React from 'react';

// Display Version value
const Version = () => {
    return (
        <div>{process.env.REACT_APP_VERSION}</div>
    );
};
export default Version;