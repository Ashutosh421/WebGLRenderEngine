import { MeshData } from "../Mesh/MeshData";
import { Vector3D } from "../3DMaths/Vector3D";
import { Color } from "../3DMaths/Color";

export class TriangleMesh extends MeshData {
    constructor() {
        super();

        this.vPositions = new Array<Vector3D>();
        this.vPositions.push(new Vector3D( -0.5 , -0.5 , 0.0));
        this.vPositions.push(new Vector3D( 0.0 , 0.5 , 0.0));
        this.vPositions.push(new Vector3D( 0.5 , -0.5 , 0.0));

        this.colors = new Array<Color>();
        this.colors.push(new Color(1,0,0,1));
        this.colors.push(new Color(0,1,0,1));
        this.colors.push(new Color(0,0,1,1));
        this.colors.push(new Color(2,2,2,2));
        

        this.processMesh();
    }
}