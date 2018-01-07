import { MenuBar } from "./MenuBar";
import { MenuEventEmitter } from "./MenuEventEmitter";

export class MenuItem {

    private menuItem:HTMLElement;
    
    //Menu Item Details
    private menuItemName:string;
    private menuItemList:Array<HTMLLIElement>;
    private menuEventEmitter:MenuEventEmitter;

    constructor(menuBar:MenuBar, menuItem:HTMLElement) {
        this.menuEventEmitter = menuBar.menuEventEmitter;
        this.menuItem = menuItem;
        this.menuItemName = (<HTMLElement>this.menuItem.querySelector(".menuItem span")).textContent as string;
        this.menuItemList = new Array<HTMLLIElement>();
       
        const menuItemListHolder = this.menuItem.querySelector(".menuItem .menuItemList ul") as HTMLElement;
        let menuItemList;
        if(menuItemListHolder){
            menuItemList = menuItemListHolder.querySelectorAll(":scope > li") as NodeListOf<HTMLElement>;
            menuItemList.forEach(menuItemElement => this.menuItemList.push(menuItemElement as HTMLLIElement));
            this.assignEventsTOMenuItems();
        }
    }

    private assignEventsTOMenuItems():void{
        this.menuItemList.forEach( menuItem => {
            menuItem.onclick = event => this.menuEventEmitter.trigger('click', menuItem.textContent);
        });
    }
}