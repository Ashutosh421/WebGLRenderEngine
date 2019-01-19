import { MenuBar } from "./MenuBar/MenuBar";
import { SceneHeirarchy } from "./SceneHeirarchy/SceneHeirarchy";
import { Inspector } from "./Inspector/Inspector";

export class UIManager {
    public menuBar:MenuBar|null = null;
    public sceneHeirarchy:SceneHeirarchy|null = null;
    public inspector:Inspector|null = null
    private static instance:UIManager;

    //HTML UI Elements
    //HTML UI Elements
    private menuElement!: HTMLElement;

    private constructor() {}

    public static get Instance():UIManager{
        UIManager.instance = !UIManager.instance ? new UIManager() : UIManager.instance;
        return UIManager.instance;
    }

    public init(){
        customElements.define('ar-menu',MenuBar);
        customElements.define('ar-inspector',Inspector);
        customElements.define('ar-scene-heirarchy',SceneHeirarchy);
    }

    public initMenuBar = new Promise((resolve, reject)=>{
        customElements.whenDefined('ar-menu').then(()=>{
            this.menuBar = document.getElementsByTagName('ar-menu')[0] as MenuBar;
            this.menuBar = document.querySelector('ar-menu') as MenuBar;
            resolve();
        });
    });

    public initSceneHeirarchy = new Promise((resolve, reject)=>{
        customElements.whenDefined('ar-scene-heirarchy').then(()=>{
            this.sceneHeirarchy = document.getElementsByTagName('ar-scene-heirarchy')[0] as SceneHeirarchy;
            this.sceneHeirarchy = document.querySelector('ar-scene-heirarchy') as SceneHeirarchy;
            resolve();
        });
    });

    public initInspector = new Promise((resolve, reject)=>{
        customElements.whenDefined('ar-inspector').then(()=>{
            this.inspector = document.getElementsByTagName('ar-inspector')[0] as Inspector;
            this.inspector = document.querySelector('ar-inspector') as Inspector;
            resolve();
        });
    });

}