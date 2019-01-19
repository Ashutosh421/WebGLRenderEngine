import * as React from 'react';
import './EntityItemList.scss';

import { EntityItem } from '../EntityItem/EntityItem.component';

export interface EntityType {
    id: number , 
    name: string
}

export interface EntityItemListState {
   
}

export interface EntityItemListProps {
    entities: string[];
}

export class EntityItemList extends React.Component<EntityItemListProps , EntityItemListState> {

    constructor(props: EntityItemListProps , state: EntityItemListState) {
        super(props , state);
    }

    render() {
        const entityTemplates = this.props.entities.map((e , index) => <EntityItem key = {index} name = {e}/>)
        return <ul className = 'entityItemList'>
            {entityTemplates}
        </ul>;
    }
}