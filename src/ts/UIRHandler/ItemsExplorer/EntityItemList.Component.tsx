import * as React from 'react';

import { EntityItem } from './EntityItem.Component';

export interface EntityType {
    id: number , 
    name: string
}

export interface EntityItemListState {
    items: EntityType[];
}

export interface EntityItemListProps {

}

export class EntityItemList extends React.Component<{} , EntityItemListState> {

    private entities: EntityType[] = [];

    constructor(props: {} , state: EntityItemListState) {
        super(props , state);
    }

    render() {
        const entityTemplates = this.entities.map(e => <EntityItem key = {e.id} id = {e.id} name = {e.name}/>)
        return <ul>
            {entityTemplates}
        </ul>;
    }

    public addItemToList(item: EntityType){
        this.setState((prevState , props) => {
            const newItems = prevState.items;
            newItems.push(item);
            return {
                items: newItems
            }
        });
    }
}