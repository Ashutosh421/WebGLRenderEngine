import { UIElement } from "../UIElement";
import { UIElementEventEmitter } from "../UIElementComponents/UIElementEventEmitter";
import { UIElementDraggable } from "../UIElementComponents/UIElementDraggable";

export class SceneHeirarchy extends UIElement{

    public styleH:string = 'scene-heirarchy';


    public eventEmitter!: UIElementEventEmitter;
    private uiElementDraggable!: UIElementDraggable;
    private node!: HTMLElement;

    private base!: HTMLElement;
    private entitiyList!: HTMLUListElement;

    constructor(){
        super();
        this.load();
    }

    public load():void{
        this.base = document.createElement("div");
        this.base.classList.add(this.styleH);
        document.body.appendChild(this.base);

        const header:HTMLElement = document.createElement("div");
        header.classList.add(`header`);
        header.textContent = "Scene Heirarchy";
        this.base.appendChild(header);

        this.entitiyList = document.createElement("ul");
        this.entitiyList.classList.add(`elementList`);
        this.base.appendChild(this.entitiyList);

        this.addComponent<UIElementEventEmitter>(UIElementEventEmitter);
        this.eventEmitter = this.getComponent<UIElementEventEmitter>(UIElementEventEmitter) as UIElementEventEmitter;
        this.addComponent<UIElementDraggable>(UIElementDraggable);
        this.uiElementDraggable = this.getComponent<UIElementDraggable>(UIElementDraggable) as UIElementDraggable;
        this.uiElementDraggable.enableDraggable(header , this.base);

        this.on('click', entityID=> this.hightLightEntity(entityID));
    }

    private hightLightEntity(entityID:string){
        console.log(`HightLight ${entityID}`);
        this.entitiyList.childNodes.forEach(node => {
            (((<HTMLElement>node).textContent as string)  == entityID as string) ? ((<HTMLElement>node).classList.add("clicked"),(<HTMLElement>node).classList.remove("default")) : ((<HTMLElement>node).classList.remove("clicked"),(<HTMLElement>node).classList.add("default"));
        });
    }

    public updateEntity(entityID:string){
        const newLI:HTMLLIElement = document.createElement('li');
        newLI.textContent = entityID;
        newLI.classList.add(`element`);
        newLI.classList.add(`default`);
        this.entitiyList.appendChild(newLI);

        newLI.onclick = event=> this.eventEmitter.trigger('click',newLI.textContent);
    }

    public on(eventName:string , callback:(...args:any[])=>void ){this.eventEmitter.on(eventName , callback);}
}