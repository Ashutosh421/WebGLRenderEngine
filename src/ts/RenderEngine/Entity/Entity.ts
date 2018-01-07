import { EntityComponent } from './EntityComponent';
import { Transform } from "../Transform/Transform";

export class Entity implements EntityComponent{
  
    private components:Array<EntityComponent>;
    private uniqueID:string;

    constructor(uniqueID:string){
        this.uniqueID = uniqueID;
        this.components = new Array<EntityComponent>();
    }

    public onInit(): void {
        this.components.forEach(component => component.onInit());
    }

    public onEnabled(): void {
        this.components.forEach(component => component.onEnabled());
    }

    public onUpdate(): void {
        this.components.forEach(component => component.onUpdate());
    }

    public onDisabled(): void {
        this.components.forEach(component => component.onDisabled());
    }   

    public onDestroy(): void {
        this.components.forEach(component => component.onDestroy());
    }

    public addComponent<T extends EntityComponent>( com: new(entity:Entity)=>T ){
        this.components.some(component => component.constructor.name === com.name) ? 
        console.log(`Component registration failed! ${com.name} already exist`) : this.components.push(new com(this))
    }

    public removeComponent<T extends EntityComponent>( com: new(entity:Entity)=>T ){
        const component = this.components.find(component=> component.constructor.name === com.name);
        component ? this.components.splice(this.components.indexOf(component) , 1) : console.log(`Failed!! No component of type ${com.name} exist`);
    }

    public getComponent<T extends EntityComponent>( com: new(entity:Entity)=>T):EntityComponent|null{
        return this.components.find(component => component.constructor.name === com.name) as EntityComponent|null;
    }

    //#region Properties
    public get ID():string{
        return this.uniqueID;
    }
    //#endregion
}

