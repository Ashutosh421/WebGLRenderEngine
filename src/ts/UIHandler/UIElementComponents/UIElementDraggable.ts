import { UIElementComponent } from "../UIElementComponent";
import { UIElement } from "../UIElement";
import { Vector2D } from "../../RenderEngine/3DMaths/Vector2D";

export class UIElementDraggable implements UIElementComponent {

    private uiElement:UIElement;
    public selectorTarget:HTMLElement;
    public draggableTarget:HTMLElement;

    private currentPos:Vector2D;
    private deltaPos:Vector2D;

    private translation:Vector2D;

    //Callbacks References
    private onMouseDownRef:(event:MouseEvent)=>void;
    private onMouseMoveRef:(event:MouseEvent)=>void;
    private onMouseUpRef:()=>void;

    constructor(uiElement:UIElement){
        this.uiElement = uiElement;
    }

    /**
     * This function manages the drag of the draggable element while events are applied on the selector
     * @param selector Element responsible to movable event
     * @param draggable Element to be draggble
     */
    public enableDraggable(selector:HTMLElement , draggable:HTMLElement){
        this.selectorTarget = selector;
        this.draggableTarget = draggable;
        this.currentPos = Vector2D.Zero;
        this.deltaPos = Vector2D.Zero;
        this.translation = Vector2D.Zero;

        this.onMouseDownRef = this.onMouseDown.bind(this);
        this.onMouseMoveRef = this.onMouseMove.bind(this);
        this.onMouseUpRef = this.onMouseUp.bind(this);
        this.selectorTarget.addEventListener('mousedown', this.onMouseDownRef);
        this.selectorTarget.addEventListener('mouseover',event=> this.selectorTarget.style.cursor = "pointer");
        this.selectorTarget.addEventListener('mouseout',event=> this.selectorTarget.style.cursor = "default");
    }

    private onMouseDown(event:MouseEvent){
        console.log(`${this.uiElement.constructor.name} mouse down`);

        this.currentPos.x = event.clientX;
        this.currentPos.y = event.clientY;

        window.addEventListener('mousemove', this.onMouseMoveRef);
        window.addEventListener('mouseup', this.onMouseUpRef);
    }

    private onMouseMove(event:MouseEvent){
        this.deltaPos.x = event.clientX - this.currentPos.x;
        this.deltaPos.y = event.clientY - this.currentPos.y;
        this.currentPos.x = event.clientX;
        this.currentPos.y = event.clientY;
        this.translation.x += this.deltaPos.x;
        this.translation.y += this.deltaPos.y;
        this.draggableTarget.style.transform = `translate(${this.translation.x+"px"} , ${this.translation.y+"px"})`;
    }

    private onMouseUp(){
        //console.log(`Mouse Up`);
        window.removeEventListener('mousemove', this.onMouseMoveRef);
        window.removeEventListener('mouseup', this.onMouseUpRef);
    }
}