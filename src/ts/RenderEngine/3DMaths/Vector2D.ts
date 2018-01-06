export class Vector2D {

    public x:number = 0;
    public y:number = 0;

    constructor(x:number = 0, y:number =0) {
        this.x = x; this.y = y
    }

     //#region Properties
     static get Zero():Vector2D
     {
         return new Vector2D(0,0);
     }
 
     static get Up():Vector2D
     {
         return new Vector2D(0 , 1);
     }
 
     static get Right():Vector2D
     {
         return new Vector2D(1, 0);
     }
     //#endregion
}