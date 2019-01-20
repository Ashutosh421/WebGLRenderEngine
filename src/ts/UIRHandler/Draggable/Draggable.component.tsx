import * as React from 'react';
import './Draggable.scss';

import { Vector2D } from '../../RenderEngine/3DMaths/Vector2D';

interface DraggableState {
    isDragging: boolean;
}

export class Draggable extends React.Component<{} , DraggableState> {

    private ref: React.RefObject<HTMLDivElement>;
    
    private startPos: Vector2D = Vector2D.Zero;
    private delta: Vector2D = Vector2D.Zero;
    private isDragging: boolean = false;

    constructor(props: {} , state: DraggableState) {
        super(props , state);

        this.ref = React.createRef();
    }
    
    //#region Private_Methods
    private registerEvents() {
        (this.ref.current as HTMLDivElement).addEventListener('mousedown' , this.onMouseDown);
       
    }

    private unregisterEvents() {
        (this.ref.current as HTMLDivElement).removeEventListener('mousedown' , this.onMouseDown);
    }
    //#endregion

    //#region Component_LifeCycleHooks
    public componentDidMount() {
        this.registerEvents();
    }

    public componentWillUnmount() {
        this.unregisterEvents();
    }
    //#endregion

    //#region Draggable Events
    private onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
        this.startPos.x = event.x;
        this.startPos.y = event.y;

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    }

    private onMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if(this.isDragging) {
            this.delta.x = event.x - this.startPos.x;
            this.delta.y = event.y - this.startPos.y;
            console.log(`Drag towards` , this.delta);

            (this.ref.current as HTMLDivElement).style.left = ((this.ref.current as HTMLDivElement).offsetLeft + this.delta.x) + 'px';
            // (this.ref.current as HTMLDivElement).style.top = ((this.ref.current as HTMLDivElement).offsetTop) + 'px';
            console.log(`New Position X`,((this.ref.current as HTMLDivElement).offsetLeft + this.delta.x).toString());
            console.log(`New Position y`,(this.ref.current as HTMLDivElement).offsetTop);
            // this.forceUpdate();

            this.startPos.x = event.x;
            this.startPos.y = event.y;
        }
    }

    private onMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if(this.isDragging){
            this.isDragging = false;
        }

        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
    //#endregion

    render() {
        return (
            <div id = 'draggable' className = 'draggableC' ref = {this.ref}>{this.props.children}</div>
        )
    }
}