import { Entity } from "../../../Entity/Entity";
import { MeshFilter } from "../../../Entity/Coms/MeshFilter";
import { Transform } from "../../../Transform/Transform";
import { MeshRenderer } from "../../../Entity/Coms/MeshRenderer";
import { MeshData2D } from "../../../Mesh/MeshData2D";
import { TriangleMesh } from "../../Primitives3D/Triangle/TriangleMesh";
import { TriangleMesh2D } from "./TriangleMesh2D";

export class Triangle2D extends Entity {

    private meshData:MeshData2D;

    public onInit(){
        super.onInit();
        this.meshData = new TriangleMesh2D();

        this.addComponent<Transform>(Transform);
        this.addComponent<MeshFilter>(MeshFilter);
        (this.getComponent<MeshFilter>(MeshFilter) as MeshFilter).RenderMesh = this.meshData;
        this.addComponent<MeshRenderer>(MeshRenderer);
    }

    public onUpdate():void{
        super.onUpdate();
    }
}