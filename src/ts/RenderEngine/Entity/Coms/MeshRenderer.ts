import { EntityComponent } from "../EntityComponent";
import { Material } from "../../Material/Material";
import { Entity } from "../Entity";
import { MeshFilter } from "./MeshFilter";
import { gl, DisplaySize} from "../../WebGLContextManager";
import { MeshData2D } from "../../Mesh/MeshData2D";
 
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
        !this.shaderProgram && (this.shaderProgram = this.material.MShader.ShaderProgram as WebGLProgram);
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
            this.updateUniforms();
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