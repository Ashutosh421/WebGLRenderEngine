import * as React from 'react';
import { Vector2D } from '../../../RenderEngine/3DMaths/Vector2D';

export interface RNumberBoxProps {
    label: string,
    onValueUpdate?: (value: number) => void
}

export interface RNumberBoxState {
    value: number
}

export class RNumberBox extends React.Component<RNumberBoxProps , RNumberBoxState> {

    private inputRef: React.RefObject<HTMLInputElement>;

    private startPos: Vector2D = Vector2D.Zero;
    private delta: Vector2D = Vector2D.Zero;
    private isDragging: boolean = false;

    constructor(props:RNumberBoxProps , state:RNumberBoxState)  {
        super(props , state);

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.setState((prevState , props) => {
            return {
                value: 0
            }
        });
        this.registerEvents();
    }

    componentWillUnmount() {
        this.unregisterEvents();
    }

    private registerEvents() {
        (this.inputRef.current as HTMLInputElement).addEventListener('mousedown' , this.onMouseDown);
    }
 
    private unregisterEvents() {
        (this.inputRef.current as HTMLInputElement).removeEventListener('mousedown' , this.onMouseDown);
    }

    //#region Event_Handling
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

            this.setState((prevState , props) => {
                return {
                    value: prevState.value + event.x
                }
            });

            this.props.onValueUpdate && this.props.onValueUpdate(this.state.value);

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

        window.removeEventListener('mousemove' , this.onMouseMove);
        window.removeEventListener('mouseup' , this.onMouseMove);
    }
    //#endregion

    render(){
        return (
            <div>
                <span></span>
                <input ref = {this.inputRef}  type="number" value = {this.state.value}/>
            </div>
        )
    }
 }