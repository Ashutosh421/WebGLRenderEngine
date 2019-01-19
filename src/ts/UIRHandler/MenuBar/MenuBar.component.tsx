import * as React from 'react';
import './MenuBar.scss';

import { MenuList } from './MenuList/MenuList.component';

export interface MenuBarProps {
    menuItems: string[];
}

export interface MenuBarState {

}

export class MenuBar extends React.Component<MenuBarProps , MenuBarState> {

    private menuItems: JSX.Element[];

    public static defaultProps = {
        'menuItems' : [
            'File',
            'Edit',
            'Add',
            'Help'
        ]
    }

    constructor(props: MenuBarProps , state: MenuBarState) {
        super (props , state);
        this.menuItems = this.props.menuItems.map((e , index) => <MenuList key = {index} label = {e} />);
    }
    
    render() {
        return <nav className = 'menuBar'>
            <ul>
                {this.menuItems}
            </ul>
        </nav>;
    }
}

