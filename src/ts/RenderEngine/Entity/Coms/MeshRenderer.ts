import { EntityComponent } from "../EntityComponent";
import { Material } from "../../Material/Material";
import { Entity } from "../Entity";
import { MeshFilter } from "./MeshFilter";
import { gl, DisplaySize} from "../../WebGLContextManager";
 
export class MeshRenderer implements EntityComponent {

    public material:Material;
    private meshFilter:MeshFilter;
    private shaderProgram:WebGLProgram;

    constructor(entity:Entity){
        this.material = new Material();
        this.meshFilter = entity.getComponent<MeshFilter>(MeshFilter) as MeshFilter;
    }

    public addMaterial(material:Material){}

    public getUniformLocation(uniformName:string):WebGLUniformLocation|null{
        const uniformLocation:WebGLUniformLocation|null = (<WebGL2RenderingContext>gl).getUniformLocation(this.shaderProgram, uniformName);
        return uniformLocation;
    }

    public onInit(): void {}

    public onEnabled(): void {}

    public onUpdate(): void {
        if(this.material.MShader.ShaderProgram)
        {
            this.material.bind();
            this.meshFilter.bind();
            gl.drawArrays(gl.TRIANGLES , 0 , this.meshFilter.RenderMesh.VPositionCount);
            this.meshFilter.unbind();
            this.material.unbind();
        }
    }

    public onDisabled(): void {}

    public onDestroy(): void {}
}