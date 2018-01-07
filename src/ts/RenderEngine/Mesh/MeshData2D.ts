import { Vector2D } from "../3DMaths/Vector2D";
import { Color} from "../3DMaths/Color";

export class MeshData2D {
 
    private rVPostitions:Float32Array;
    private rNormals:Float32Array;
    private rUvs:Float32Array;
    private rColors:Float32Array;

    protected vPositions:Array<Vector2D>;
    protected normals:Array<Vector2D>;
    protected uvs:Array<Vector2D>;
    protected colors:Array<Color>;

    //Stride Contributtions
    protected vPositionStride:number;
    protected colorStride:number;

    protected processMesh(){
        this.vPositionStride = Object.keys(this.vPositions[0]).length;
        this.rVPostitions = new Float32Array(this.vPositions.length * this.vPositionStride);
        let index:number = 0;
        this.vPositions.forEach(vertex => {
            Object.keys(vertex).forEach(num => this.rVPostitions[index++] = (<any>vertex)[num]);
        });
        index = 0;
        this.colorStride = Object.keys(this.colors[0]).length;
        this.rColors = new Float32Array(this.colors.length * this.colorStride);
        this.colors.forEach(color => {
            Object.keys(color).forEach(channel => this.rColors[index++] = (<any>color)[channel]);
        });
    }

    //#region Properties
    public get VPositions():Float32Array{return this.rVPostitions};
    public get VPositionCount():number{return this.vPositions.length};
    public get VPositionStride():number{return this.vPositionStride};

    public get Colors():Float32Array{return this.rColors};
    public get ColorCount():number{return this.colors.length};
    public get ColorStride():number{return this.colorStride};
    //#endregion
}