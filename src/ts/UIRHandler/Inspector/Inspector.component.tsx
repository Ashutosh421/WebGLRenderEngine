import * as React from 'react';

export class Inspector extends React.Component<{} , {}> {

    constructor(props: {} , state: {}) {
        super(props , state);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
 }