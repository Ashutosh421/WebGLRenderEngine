import * as React from 'react';

export interface MenuListProp {
    label : string;
}

export class MenuList extends React.Component<MenuListProp , {}> {
    
    constructor(props: MenuListProp , state: {}) {
        super (props , state);
    }

    render() {
        return <li><span>{this.props.label}</span>
            <ul></ul>
        </li>
    }
}