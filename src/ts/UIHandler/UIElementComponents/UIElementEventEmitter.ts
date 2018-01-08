import { UIElement } from "../UIElement";

export class UIElementEventEmitter {

    private uiElement:UIElement;
    private events:Map<string, Array<(...args:any[])=>void>>;

    constructor(uiElement:UIElement) {
        this.uiElement = uiElement;
        this.events = new Map<string , Array<(...args:any[])=>void>>();
    }

    public on(eventName:string , callback:(...args:any[])=>void){
        this.events.get(eventName) ? (this.events.get(eventName) as Array<(...args:any[])=>void>).push(callback) :  this.events.set(eventName , new Array<(...args:any[])=>void>(callback));
    }

    public trigger(eventName:string , ...args:any[]){
        this.events.get(eventName) && (this.events.get(eventName) as Array<(...args:any[])=>void>).forEach(callback => callback(args));
    }

    public showCallback(eventName:string){
        (this.events.get(eventName) as Array<(...args:any[])=>void>).forEach(callback => console.log(callback));
    }
}