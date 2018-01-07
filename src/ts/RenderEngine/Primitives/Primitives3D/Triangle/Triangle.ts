import { Entity } from "../../../Entity/Entity";
import { MeshFilter } from "../../../Entity/Coms/MeshFilter";
import { MeshRenderer } from "../../../Entity/Coms/MeshRenderer";
import { MeshData } from "../../../Mesh/MeshData";
import { TriangleMesh } from "./TriangleMesh";

export class Triangle extends Entity{

    private meshData:MeshData;

    //#region LifeCycle Hooks
    public onInit(): void {
        super.onInit();
        this.meshData = new TriangleMesh();
        
        this.addComponent<MeshFilter>(MeshFilter);
        (<MeshFilter>this.getComponent<MeshFilter>(MeshFilter)).RenderMesh = this.meshData;
        this.addComponent<MeshRenderer>(MeshRenderer);
    }
    public onEnabled(): void {
        super.onEnabled();

    }
    public onUpdate(): void {
        super.onUpdate();

        //console.log("Updating Triangle");
    }
    public onDestroy(): void {
        super.onDestroy();

    }
    // #endregion
}