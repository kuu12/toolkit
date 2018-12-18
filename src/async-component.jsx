import React from 'react';

const AsyncComponent = importer => name =>
    class extends React.Component {
        componentDidMount() {
            importer().then(chunk => {
                this.C_ = chunk[name || 'default'];
                this.forceUpdate();
            });
        }

        render() {
            return this.C_
                ? <this.C_ {...this.props} />
                : null;
        }
    };

export default AsyncComponent;