import * as React from 'react';

import './Header.scss';

export interface HeaderProps {
    label?: string;
}

export interface HeaderState {
    hover: boolean;
}

export class Header extends React.Component<HeaderProps , HeaderState> {

    constructor (props: HeaderProps , state: HeaderState) {
        super(props , state);
    }

    render () {
        return <div className = 'header'> 
            <span> {this.props.label || 'Header'} </span>
        </div>;
    }
}