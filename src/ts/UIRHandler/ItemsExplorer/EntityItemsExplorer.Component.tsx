import * as React from 'react';
import { Scene } from '../../RenderEngine/World/Scene';
import './EntityItemsExplorer.scss'

import { Header } from '../Header/Header.component';
import { EntityItemList } from './EntityItemList/EntityItemList.component';

export interface EntityItemsExplorerProps {
    scene: Scene;
}

export class EntityItemsExplorer extends React.Component<EntityItemsExplorerProps , {}> {

    constructor(props: EntityItemsExplorerProps , state: {}) {
        super(props , state);

        //Listening to Scene Updates
        this.props.scene.on('entityAdded' , () => {
            this.forceUpdate();
        });
    }

    render() {
        return <div className = 'entityItemsExplorer'>
            <Header label = "Entity Items Explorer"></Header>
            <EntityItemList entities = {Array.from(this.props.scene.entities.keys())}/>
        </div>;
    }
}

