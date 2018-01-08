import { Entity } from "../Entity/Entity";

export class Scene{

    private sceneName:string;
    public entities: Map<string , Entity>;

    constructor(name:string){
        this.sceneName = name;
        this.entities = new Map<string, Entity>();
    }

    public update(){
        //console.log(`Updating Scene ${this.sceneName}`);
        this.entities.forEach(entity=> entity.onUpdate());
    }

    public addEntity(entity:Entity){
        this.entities.set(entity.ID , entity);
        entity.onInit();
    }   

    public getEntity(entityID:string):Entity{
        return this.entities.get(entityID) as Entity;
    }
}