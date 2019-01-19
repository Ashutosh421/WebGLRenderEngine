import { Entity } from "../Entity/Entity";
import { EventEmitter } from "../Utils/EventEmitter";

export class Scene extends EventEmitter{

    private sceneName:string;
    public entities: Map<string , Entity>;

    constructor(name:string){
        super();
        this.sceneName = name;
        this.entities = new Map<string, Entity>();
    }

    public update(){
        this.entities.forEach(entity=> entity.onUpdate());
    }

    public addEntity(entity:Entity){
        entity.onInit();
        this.entities.set(entity.ID , entity);
        this.trigger('entityAdded' , entity.ID , entity);
    }   

    public getEntity(entityID:string):Entity{
        return this.entities.get(entityID) as Entity;
    }
}