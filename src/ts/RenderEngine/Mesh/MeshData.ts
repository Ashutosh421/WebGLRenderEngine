import { gl } from "../WebGLContextManager";
import { Vector3D } from "../3DMaths/Vector3D";
import { Color } from "../3DMaths/Color";
import { Vector2D } from "../3DMaths/Vector2D";

export class MeshData {

    protected rVPositions:Float32Array;
    protected rNormals: Float32Array;
    protected rUvs: Float32Array;
    protected rColors: Float32Array;

    protected vPositions:Array<Vector3D>;
    protected normals:Array<Vector3D>;
    protected uvs:Array<Vector2D>;
    protected colors:Array<Color>;

    //Stride Contributions
    protected vPositionStride:number;
    protected colorStride:number;

    protected processMesh(){
        this.vPositionStride = Object.keys(this.vPositions[0]).length;
        this.rVPositions = new Float32Array(this.vPositions.length * this.vPositionStride);
        let index:number = 0;
        this.vPositions.forEach(vertex => 
            {
                //Appending Vertices
                Object.keys(vertex).forEach(num => this.rVPositions[index++] = (<any>vertex)[num])
                //Appending Colors
            }
        );
        this.colorStride = Object.keys(this.colors[0]).length;
        this.rColors = new Float32Array(this.colors.length * this.colorStride);
        index = 0;
        this.colors.forEach(color=>
            {  
                Object.keys(color).forEach(key=> this.rColors[index++] = (<any>color)[key]);
            }
        );
    }

    
    //#region Properties
    public get VPositions():Float32Array { return this.rVPositions; }
    public get VPositionCount():number { return this.vPositions.length; }
    public get VPositionStride():number { return this.vPositionStride; } 

    public get Colors():Float32Array { return this.rColors; }
    public get ColorCount():number { return this.colors.length; }
    public get ColorStride():number { return this.colorStride; }
    //#endregion
}