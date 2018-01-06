export class Quaternion {
    private x:number = 0;
    private y:number = 0;
    private z:number = 0;
    private w:number = 0;

    constructor(x:number , y:number ,z:number , w:number) {
        this.x = x; this.y = y; this.z = z; this.w = w;
    }

    static get Identity():Quaternion{
        return new Quaternion( 0 , 0 , 0 , 1);
    }
}