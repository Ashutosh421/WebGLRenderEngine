import { EntityComponent } from "../EntityComponent";
import { MeshData } from "../../Mesh/MeshData";
import { Entity } from "../Entity";
import { gl } from "../../WebGLContextManager";

export class MeshFilter implements EntityComponent {

    private mesh: MeshData;
    private gl: WebGLRenderingContext | WebGL2RenderingContext;

    private vertexBuffer: WebGLBuffer;
    private colorBuffer: WebGLBuffer;
    private vertexArray: any;

    constructor(entity: Entity) {
        this.mesh && this.prepareMeshBuffers();
    }

    private prepareMeshBuffers() {
        //Create the first Vertex Buffer
        this.vertexBuffer = gl.createBuffer() as WebGLBuffer;
        //Bind the current buffer for operations
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        //Upload the vertices data to the currently bound vertex buffer
        gl.bufferData(gl.ARRAY_BUFFER, this.mesh.VPositions, gl.STATIC_DRAW);
        //Unbind the current bounded buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /**Color Buffer Setup */
        this.colorBuffer = gl.createBuffer() as WebGLBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.mesh.Colors, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    public bind() {
        if(this.mesh)
        {  
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(0, this.mesh.VPositionStride, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER , this.colorBuffer);
            gl.vertexAttribPointer(1, this.mesh.ColorStride, gl.FLOAT , true, 0, 0);
            gl.enableVertexAttribArray(1);
        }
    }

    public unbind() {
        if(this.mesh){
            gl.disableVertexAttribArray(0);
            gl.disableVertexAttribArray(1);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    }

    public onInit(): void {
    }

    public onUpdate(): void {

    }

    public onEnabled(): void {
    }

    public onDisabled(): void {
    }

    public onDestroy(): void {
    }

    //#region Properties
    public set RenderMesh(mesh: MeshData) {
        (this.mesh = mesh as MeshData) && this.prepareMeshBuffers();
    }

    public get RenderMesh(): MeshData {
        return this.mesh;
    }
    //#endregion
}