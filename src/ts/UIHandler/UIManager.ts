import { MenuBar } from "./MenuBar/MenuBar";

export class UIManager {
    public menuBar:MenuBar|null = null;
    private static instance:UIManager;

    //HTML UI Elements
    private menuElement:HTMLElement;

    private constructor() {}

    public static get Instance():UIManager{
        UIManager.instance = !UIManager.instance ? new UIManager() : UIManager.instance;
        return UIManager.instance;
    }

    public init(){
        const menuElement = document.querySelector("#dropDownMenu");
        menuElement && (this.menuBar = new MenuBar(menuElement as HTMLElement) as MenuBar);
    }
}