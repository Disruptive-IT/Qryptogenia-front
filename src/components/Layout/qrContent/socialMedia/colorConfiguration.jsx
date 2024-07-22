import React from 'react';

const ColorConfiguration = ({ children, headerColor, bodyColor }) => {
    return React.cloneElement(children, { headerColor, bodyColor });
};

export default ColorConfiguration;