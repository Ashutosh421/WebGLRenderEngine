import { MenuBar } from "./MenuBar/MenuBar";
import { SceneHeirarchy } from "./SceneHeirarchy/SceneHeirarchy";

export class UIManager {
    public menuBar:MenuBar|null = null;
    public sceneHeirarchy:SceneHeirarchy|null = null;
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

        //Create the Scene Heirarchy
        this.sceneHeirarchy = new SceneHeirarchy();
        this.sceneHeirarchy.load();
    }
}