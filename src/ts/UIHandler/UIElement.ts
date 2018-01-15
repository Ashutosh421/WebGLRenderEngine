import { UIElementComponent } from "./UIElementComponent";
import { UIElementEventEmitter } from "./UIElementComponents/UIElementEventEmitter";

export class UIElement extends HTMLElement {
    private uiElementComponents:Array<UIElementComponent>;
    
    
    constructor() {
        super();
        this.uiElementComponents = new Array<UIElementComponent>();
    }

    public addComponent<T extends UIElementComponent>( com : new(uiElement:UIElement)=>T) {
        this.uiElementComponents.some(component => component.constructor.name === com.name) ? console.warn(`${com.name} registration failed! It already exist`) : this.uiElementComponents.push(new com(this));
    }

    public removeComponent<T extends UIElementComponent>( com: new(uiElement:UIElement)=>T){ 
        const component = this.uiElementComponents.find(component => component.constructor.name === com.name);
        component ? this.uiElementComponents.splice(this.uiElementComponents.indexOf(component) , 1) : console.warn(`${com.name} not found!`);
    }

    public getComponent<T extends UIElementComponent>( com: new(uiElement:UIElement)=>T):UIElementComponent|null{
        return this.uiElementComponents.find(component => component.constructor.name === com.name) as UIElementComponent|null;
    }
}