import * as React from 'react';

export interface EntityItemState {
    selected: boolean;
    active: boolean;
}

export interface EntityItemProp {
    id: number;
    name: string;
    onEntityClick?: (event : React.MouseEvent<HTMLLIElement , MouseEvent>) => void;
}

export class EntityItem extends React.Component<EntityItemProp , EntityItemState> {

    constructor(props: EntityItemProp , state: EntityItemState) {
        super(props , state);
    }

    render() {
        return <li onClick = {(event) => this.props.onEntityClick && this.props.onEntityClick(event)}>{this.props.name}</li>;
    }
}