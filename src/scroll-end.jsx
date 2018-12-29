import React from 'react';

class ScrollEnd extends React.Component {
    constructor(props) {
        super(props);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    onTouchEnd(event) {
        const bound = event.currentTarget.getBoundingClientRect();
        if (
            bound.height < window.innerHeight ||
            bound.height + bound.top <= window.innerHeight
        ) this.props.onScrollEnd();
    }

    render() {
        const { children, ...props } = this.props;
        delete props.onScrollEnd;
        return (
            <ul {...props} onTouchEnd={this.onTouchEnd}>
                {children}
            </ul>
        );
    }
}

export default ScrollEnd;
