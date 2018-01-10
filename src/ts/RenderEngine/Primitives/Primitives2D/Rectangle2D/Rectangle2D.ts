import { Entity } from "../../../Entity/Entity";
import { MeshFilter } from "../../../Entity/Coms/MeshFilter";
import { MeshRenderer } from "../../../Entity/Coms/MeshRenderer";
import { MeshData2D } from "../../../Mesh/MeshData2D";
import { RectangleMesh2D } from "./RectangleMesh2D";
import { Transform2D } from "../../../Transform/Transform2D";

export class Rectangle2D extends Entity {

    private meshData:MeshData2D;

    constructor(uniqueID:string){
        super(uniqueID);
        this.meshData = new RectangleMesh2D();
        
        this.addComponent<Transform2D>(Transform2D);
        this.addComponent<MeshFilter>(MeshFilter);
        (this.getComponent<MeshFilter>(MeshFilter) as MeshFilter).RenderMesh = this.meshData;
        this.addComponent<MeshRenderer>(MeshRenderer);
    }

    public onInit(){
        super.onInit();

       
    }
}