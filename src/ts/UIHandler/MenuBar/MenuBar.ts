import { MenuItem } from "./Menutem";
import { UIElement } from "../UIElement";
import { UIElementEventEmitter } from "../UIElementComponents/UIElementEventEmitter";

export class MenuBar extends UIElement {

    private menuItems:Array<MenuItem>;
    private menuBarRef:HTMLElement;

    private eventEmitter:UIElementEventEmitter;

    constructor(menuBar:HTMLElement){
        super();
        this.menuBarRef = menuBar;
        this.menuItems = new Array<MenuItem>();
        this.addComponent<UIElementEventEmitter>(UIElementEventEmitter);
        this.eventEmitter = this.getComponent<UIElementEventEmitter>(UIElementEventEmitter) as UIElementEventEmitter;
        this.updateMenuListItems();
    }

    private updateMenuListItems(){
        const menuList:HTMLElement = this.menuBarRef.querySelector(".menuList") as HTMLElement;
        const menuItems:NodeListOf<HTMLElement> = menuList.querySelectorAll(":scope > li") as NodeListOf<HTMLElement>;
        menuItems.forEach(menuItem => this.menuItems.push(new MenuItem(this, menuItem)));
    }

    //Forwarding the Event to the Menu Handler
    public on(eventName:string , callback:(...args:any[])=>void ){this.eventEmitter.on(eventName , callback);}
}
