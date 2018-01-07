import { Entity } from "../Entity/Entity";

export class PrimitiveManager {

    private static instance:PrimitiveManager;
    private currentPrimitiveID:number = 0;

    private constructor()
    {}

    public static get Instance():PrimitiveManager{
        PrimitiveManager.instance = PrimitiveManager.instance ? PrimitiveManager.instance : new PrimitiveManager();
        return PrimitiveManager.instance;
    }

    public createPrimitive<T extends Entity>(primitive:new(uniqueID:string)=>T):Entity{
        return new primitive(`Entity: ${this.currentPrimitiveID++}`);
    }
}