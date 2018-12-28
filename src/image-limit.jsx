import React from 'react';

const ImageLimit = ({
    width,
    height,
    imgStyle = {},
    imgClassName,
    divStyle = {},
    divClassName,
    src,
    onClick,
    ref,
    ...rest
}) => (
        <div
            style={{
                ...divStyle,
                minWidth: width,
                minHeight: height,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            className={divClassName}
            onClick={onClick}
            ref={ref}
        >
            {src && (
                <img
                    style={{
                        ...imageStyle,
                        display: 'block',
                        maxWidth: width,
                        maxHeight: height,
                    }}
                    className={imgClassName}
                    src={src}
                    {...rest}
                />
            )}
        </div>
    );

export default ImageLimit;
