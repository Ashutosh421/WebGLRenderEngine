import { Entity } from "../../../Entity/Entity";
import { MeshData2D } from "../../../Mesh/MeshData2D";
import { SquareMesh2D } from "./SquareMesh2D";
import { Transform2D } from "../../../Transform/Transform2D";
import { MeshFilter } from "../../../Entity/Coms/MeshFilter";
import { MeshRenderer } from "../../../Entity/Coms/MeshRenderer";

export class Square2D extends Entity {
    
    private meshData:MeshData2D;

    public onInit(){
        super.onInit();
        this.meshData = new SquareMesh2D();
        
        this.addComponent<Transform2D>(Transform2D);
        this.addComponent<MeshFilter>(MeshFilter);
        (this.getComponent<MeshFilter>(MeshFilter) as MeshFilter).RenderMesh = this.meshData;
        this.addComponent<MeshRenderer>(MeshRenderer);
    }
}