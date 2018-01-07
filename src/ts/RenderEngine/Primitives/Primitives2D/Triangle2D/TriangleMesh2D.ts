import { MeshData2D } from "../../../Mesh/MeshData2D";
import { Vector2D } from "../../../3DMaths/Vector2D";
import { Color } from "../../../3DMaths/Color";

export class TriangleMesh2D extends MeshData2D {
   
    constructor(){
        super();

        this.vPositions = new Array<Vector2D>();
        this.vPositions.push(new Vector2D(0, 80));
        this.vPositions.push(new Vector2D(40 , 0));
        this.vPositions.push(new Vector2D(80, 80));

        this.colors = new Array<Color>();
        this.colors.push(new Color(0,0,1,1));
        this.colors.push(new Color(0,1,0,1));
        this.colors.push(new Color(1,0,0,1));

        this.processMesh();
    }
}