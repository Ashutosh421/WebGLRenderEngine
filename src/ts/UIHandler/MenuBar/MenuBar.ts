import { MenuItem } from "./Menutem";
import { MenuEventEmitter } from "./MenuEventEmitter";

export class MenuBar {

    private menuItems:Array<MenuItem>;
    private menuBarRef:HTMLElement;
    public menuEventEmitter:MenuEventEmitter;

    constructor(menuBar:HTMLElement){
        this.menuBarRef = menuBar;
        this.menuItems = new Array<MenuItem>();
        this.menuEventEmitter = new MenuEventEmitter(this);
        this.updateMenuListItems();
    }

    private updateMenuListItems(){
        const menuList:HTMLElement = this.menuBarRef.querySelector(".menuList") as HTMLElement;
        const menuItems:NodeListOf<HTMLElement> = menuList.querySelectorAll(":scope > li") as NodeListOf<HTMLElement>;
        menuItems.forEach(menuItem => this.menuItems.push(new MenuItem(this, menuItem)));
    }

    //Forwarding the Event to the Menu Handler
    public on(eventName:string , callback:(...args:any[])=>void ){this.menuEventEmitter.on(eventName , callback);}
}
