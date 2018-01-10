export class Vector3D {

    public x:number = 0;
    public y:number = 0;
    public z:number = 0;

    constructor(x:number = 0, y:number = 0, z:number = 0) {
        this.x = x; this.y = y; this.z = z;
    }    

    //#region Properties
    static get Zero():Vector3D{
        return new Vector3D(0,0,0);
    }

    static get Up():Vector3D{
        return new Vector3D(0 , 1, 0);
    }

    static get Right():Vector3D{
        return new Vector3D(1, 0 , 0);
    }

    static get Forward():Vector3D{
        return new Vector3D(0, 0 , 1);
    }
    //#endregion
}