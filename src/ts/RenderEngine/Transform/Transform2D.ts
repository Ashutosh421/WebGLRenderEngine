import { Vector2D } from "../3DMaths/Vector2D";
import { EntityComponent } from "../Entity/EntityComponent";
import { Entity } from "../Entity/Entity";
import { gl } from "../WebGLContextManager";
import { MeshFilter } from "../Entity/Coms/MeshFilter";
import { MeshRenderer } from "../Entity/Coms/MeshRenderer";
import { Matrix3 } from "../3DMaths/Matrix3";


export class Transform2D extends EntityComponent{

    private entity:Entity;
    
    // private translationLocation:WebGLUniformLocation|null;
    // private rotationLocation:WebGLUniformLocation|null;
    // private scaleLocation:WebGLUniformLocation|null;

    private meshRenderer:MeshRenderer;
    
    private position:Vector2D;
    private angle:number;
    private scale:Vector2D;

    private transformMatrix:Matrix3;
    private transformMatrixLocation:WebGLUniformLocation;

    constructor(entity:Entity){
        super();
        this.entity = entity;

        //Setting up the default transform
        this.position = Vector2D.Zero;
        this.scale = Vector2D.One;
        this.angle = 0; 
        this.transformMatrix = Matrix3.Translation(Vector2D.Zero).multiply(Matrix3.RotationDeg(this.angle)).multiply(Matrix3.Scale(this.scale));
    }

    public onInit(){
        this.meshRenderer = this.entity.getComponent<MeshRenderer>(MeshRenderer) as MeshRenderer;
        this.transformMatrixLocation = this.meshRenderer.getUniformLocation("modelMatrix") as WebGLUniformLocation;
        // this.translationLocation = this.meshRenderer.getUniformLocation("translation") as WebGLUniformLocation|null;
        // this.rotationLocation = this.meshRenderer.getUniformLocation("rotation") as WebGLUniformLocation|null;
        // this.scaleLocation = this.meshRenderer.getUniformLocation("scale") as WebGLUniformLocation|null;
        this.meshRenderer && console.log(`Transform Recevied mesh renderer`);
    }

    public bind():void{
        // this.translationLocation ? gl.uniform2f(this.translationLocation , this.position.x , this.position.y) : this.translationLocation = this.meshRenderer.getUniformLocation("translation") as WebGLUniformLocation|null;
        // const angleInRadians = this.angle * Math.PI/180;
        // this.rotationLocation ? gl.uniform2f(this.rotationLocation , Math.cos(angleInRadians), Math.sin(angleInRadians)) : this.rotationLocation = this.meshRenderer.getUniformLocation("rotation") as WebGLUniformLocation|null;
        // this.scaleLocation ? gl.uniform2f(this.scaleLocation , this.scale.x , this.scale.y) : this.scaleLocation = this.meshRenderer.getUniformLocation("scale") as WebGLUniformLocation|null;

     //  this.transformMatrixLocation ? gl.uniformMatrix3fv(this.transformMatrixLocation , false , this.transformMatrix.matrix) : this.transformMatrixLocation = this.meshRenderer.getUniformLocation("modelMatrix") as WebGLUniformLocation;
        this.transformMatrixLocation ? gl.uniformMatrix3fv(this.transformMatrixLocation , false , this.transformMatrix.matrix) : this.transformMatrixLocation = this.meshRenderer.getUniformLocation("modelMatrix") as WebGLUniformLocation;
    }

    public unbind():void{
        
    }

    //#region Properties
    public set Position(position:Vector2D){
        this.position.x = position.x;
        this.position.y = position.y;
        this.transformMatrix.translate(position);
    }

    public get Position():Vector2D{
        return this.position;
    }

    public set Scale(scale:Vector2D){
        this.scale.x = scale.x;
        this.scale.y = scale.y;
        this.transformMatrix = Matrix3.Translation(this.position).multiply(Matrix3.RotationDeg(this.angle)).multiply(Matrix3.Scale(this.scale));
       //this.transformMatrix.scale(scale);
    }

    public get Scale():Vector2D{
        return this.scale;
    }

    public set Angle(angle:number){
        this.angle = angle;
        this.transformMatrix = Matrix3.Translation(this.position).multiply(Matrix3.RotationDeg(this.angle)).multiply(Matrix3.Scale(this.scale));
    }

    public get Angle(){
        return this.angle;
    }
    //#endregion
}