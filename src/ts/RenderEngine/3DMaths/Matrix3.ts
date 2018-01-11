import { Vector2D } from "./Vector2D";

export class Matrix3{

    private elements:Float32Array;

    private constructor(){
        this.elements = new Float32Array(9);
        for(let i = 0 ; i < 3 * 3; i++){
            (i % 4 == 0) ? this.elements[i] = 1 : this.elements[i] = 0;
        }
    }

    public translate(translation:Vector2D){
        this.elements[2] = translation.x;
        this.elements[5] = translation.y;
    }

    public scale(scale:Vector2D){
        //this.elements[0] = scale.x;
        //this.elements[4] = scale.y;
        const angle = Math.sinh(this.elements[1]);
        const existingCosine = Math.cos(angle);
        const existingScale = this.elements[0]/existingCosine;
        this.elements[0] = scale.x * existingCosine;
        this.elements[4] = scale.y * existingCosine;
        //this.elements[1] = Math.sin(scale.x * existingCosine)
        //Matrix3.Scale(scale);
        return this.multiply(Matrix3.Scale(scale));
    }

    public rotate(){

    }

    /**
     * Returns the translation matrix with translation of tx, ty
     * @param tx Translation at x
     * @param ty Translation at y
     */
    public static Translation(ts:Vector2D):Matrix3{
        const identity:Matrix3 = Matrix3.Identity;
        identity.elements[2] = ts.x;
        identity.elements[5] = ts.y;
        return identity;
    }

    /**
     * Creates a rotation matrix
     * @param angle Angle in Radians
     */
    public static RotationRad(angle:number):Matrix3{
        const matrix:Matrix3 = Matrix3.Identity;
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        matrix.elements[0] = c;
        matrix.elements[1] = s;
        matrix.elements[3] = -s;
        matrix.elements[4] = c;
        return matrix;
    }

    /**
     * Creates a rotation matrix
     * @param angle Angle in degrees
     */
    public static RotationDeg(angle:number):Matrix3{
        const angleInRadians:number = angle * Math.PI/180;
        const rotationMatrix:Matrix3 = Matrix3.Identity;
        const s = Math.sin(angleInRadians);
        const c = Math.cos(angleInRadians);
        rotationMatrix.elements[0] = c;
        rotationMatrix.elements[1] = s;
        rotationMatrix.elements[3] = -s;
        rotationMatrix.elements[4] = c;
        return rotationMatrix;
    }

    /**
     * Creates a scale matrix with 
     * @param sx 
     * @param sy 
     */
    public static Scale(sc:Vector2D):Matrix3{
        const scaleMatrix:Matrix3 = Matrix3.Identity;
        scaleMatrix.elements[0] = sc.x;
        scaleMatrix.elements[4] = sc.y;
        return scaleMatrix;
    }

    /**
     * Helper method to get a Identity Matrix
     */
    public static get Identity():Matrix3{
        return new Matrix3();
    }

    public print(){
        console.log("\n\n");
        for(let i = 0; i < (3 * 3); i+=3){
            console.log(`${this.elements[i]} , ${this.elements[i+1]} , ${this.elements[i + 2]}`);
        }
    }

    /**
     * Mutplies the supplied matrix to the current matrix and returns the product
     * @param matrix2 
     */
    public multiply(matrix:Matrix3):Matrix3{
        const product:Matrix3 = Matrix3.Identity;
        let r = 0;
        let c = 0;
        // console.log("");
        for(let i = 0 ; i < (3 * 3) ; i++){ //To fill the product matrix
            product.elements[i] = (this.elements[r] * matrix.elements[c]) + (this.elements[r + 1]  * matrix.elements[c+3]) + (this.elements[r+2] * matrix.elements[c + 6]);
            // console.log(`Multiplying ${this.elements[r]} * ${matrix.elements[c]} + ${this.elements[r+1]} * ${matrix.elements[c+3]} + ${this.elements[r + 2]} * ${matrix.elements[c+6]}`);
            c+=1;
            if((i + 1) % 3 == 0){
              //  console.log("");
                r += 3;
                c = 0;
            }
        }
        this.elements.slice(0, this.elements.length)
        this.elements = new Float32Array(product.elements);
        return this;
    }

    public add(matrix:Matrix3):Matrix3{
        return Matrix3.Identity;
    }

    public get matrix():Float32Array{
        return this.elements;
    }
}