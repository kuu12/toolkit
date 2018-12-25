import React from 'react';

const AsyncComponent = importer => (name = 'default') =>
    class extends React.Component {
        async componentDidMount() {
            this.C_ = (await importer())[name];
            this.forceUpdate();
        }
        render() {
            return this.C_
                ? <this.C_ {...this.props} />
                : null;
        }
    };

export default AsyncComponent;
