import * as React from 'react';
import './EntityItem.scss';

export interface EntityItemState {
    selected: boolean;
    active: boolean;
}

export interface EntityItemProp {
    name: string;
    onEntityClick?: (event : React.MouseEvent<HTMLLIElement , MouseEvent>) => void;
}

export class EntityItem extends React.Component<EntityItemProp , EntityItemState> {

    constructor(props: EntityItemProp , state: EntityItemState) {
        super(props , state);
    }

    render() {
        return <li className = 'entityItem' onClick = {(event) => this.props.onEntityClick && this.props.onEntityClick(event)}>{this.props.name}</li>;
    }
}