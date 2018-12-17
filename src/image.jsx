import React from 'react';

const Image = ({ height, width, style, src, ...rest }) => {
    const moreStyle = height ? {
        ...style,
        height: height,
        minHeight: height,
    } : width ? {
        ...style,
        width: width,
        minWidth: width,
    } : style;

    return src
        ? <img style={moreStyle} {...rest} src={src} />
        : <div style={moreStyle} {...rest} />;
};

export default Image;
