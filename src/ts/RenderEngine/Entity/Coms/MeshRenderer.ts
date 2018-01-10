import { EntityComponent } from "../EntityComponent";
import { Material } from "../../Material/Material";
import { Entity } from "../Entity";
import { MeshFilter } from "./MeshFilter";
import { gl, DisplaySize} from "../../WebGLContextManager";
import { MeshData2D } from "../../Mesh/MeshData2D";
import { Transform2D } from "../../Transform/Transform2D";
 
export class MeshRenderer implements EntityComponent {

    public material:Material;
    private meshFilter:MeshFilter;
    private transform2D:Transform2D;
    private shaderProgram:WebGLProgram;
    private entity:Entity;

    constructor(entity:Entity){
        this.entity = entity;
        this.material = new Material();
        this.shaderProgram = this.material.MShader.ShaderProgram as WebGLProgram;
    }

    public onInit(): void {
        this.meshFilter = this.entity.getComponent<MeshFilter>(MeshFilter) as MeshFilter;
        this.transform2D = this.entity.getComponent<Transform2D>(Transform2D) as Transform2D;
    }

    public addMaterial(material:Material){}

    public getUniformLocation(uniformName:string):WebGLUniformLocation|null{
        !this.shaderProgram && (this.shaderProgram = this.material.MShader.ShaderProgram as WebGLProgram);
        return this.shaderProgram ? (<WebGL2RenderingContext>gl).getUniformLocation(this.shaderProgram, uniformName) : null;
    }

    public onEnabled(): void {}

    public onUpdate(): void {
        if(this.material.MShader.ShaderProgram)
        {
            this.material.bind();
            this.meshFilter.bind();
            this.updateUniforms();
            this.transform2D && this.transform2D.bind();
            gl.drawArrays(gl.TRIANGLES , 0 , this.meshFilter.RenderMesh.VPositionCount);
            this.meshFilter.unbind();
            this.material.unbind();
        }
    }

    private updateUniforms(){
        if(this.meshFilter.RenderMesh instanceof MeshData2D){
            const resolutionUniformLocation = this.getUniformLocation("resolution");;
            gl.uniform2f(resolutionUniformLocation , DisplaySize.x , DisplaySize.y );
        }
    }

    public onDisabled(): void {}

    public onDestroy(): void {}
}