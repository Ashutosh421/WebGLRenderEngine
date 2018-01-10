import { Vector2D } from "../3DMaths/Vector2D";
import { EntityComponent } from "../Entity/EntityComponent";
import { Entity } from "../Entity/Entity";
import { gl } from "../WebGLContextManager";
import { MeshFilter } from "../Entity/Coms/MeshFilter";
import { MeshRenderer } from "../Entity/Coms/MeshRenderer";


export class Transform2D extends EntityComponent{

    private entity:Entity;

    public translation2D:Vector2D = Vector2D.Zero;
    public angle:number = 0;
    public scale2D:Vector2D = Vector2D.Zero;

    private translationLocation:WebGLUniformLocation|null;
    private rotationLocation:WebGLUniformLocation|null;
    private scaleLocation:WebGLUniformLocation|null;

    private meshRenderer:MeshRenderer;

    constructor(entity:Entity){
        super();
        this.entity = entity;
        this.scale2D = new Vector2D(1,1);
    }

    public onInit(){
        this.meshRenderer = this.entity.getComponent<MeshRenderer>(MeshRenderer) as MeshRenderer;
        this.translationLocation = this.meshRenderer.getUniformLocation("translation") as WebGLUniformLocation|null;
        this.rotationLocation = this.meshRenderer.getUniformLocation("rotation") as WebGLUniformLocation|null;
        this.scaleLocation = this.meshRenderer.getUniformLocation("scale") as WebGLUniformLocation|null;
        this.meshRenderer && console.log(`Transform Recevied mesh renderer`);
    }

    public bind():void{
        this.translationLocation ? gl.uniform2f(this.translationLocation , this.translation2D.x , this.translation2D.y) : this.translationLocation = this.meshRenderer.getUniformLocation("translation") as WebGLUniformLocation|null;
        const angleInRadians = this.angle * Math.PI/180;
        this.rotationLocation ? gl.uniform2f(this.rotationLocation , Math.sin(angleInRadians), Math.cos(angleInRadians)) : this.rotationLocation = this.meshRenderer.getUniformLocation("rotation") as WebGLUniformLocation|null;
        this.scaleLocation ? gl.uniform2f(this.scaleLocation , this.scale2D.x , this.scale2D.y) : this.scaleLocation = this.meshRenderer.getUniformLocation("scale") as WebGLUniformLocation|null;
       // console.log(`Translaation Location ${this.meshRenderer.getUniformLocation("translation")}`);
        //console.log(`Rotation Location ${this.rotationLocation}`);
        // console.log(`Scale Location ${this.scaleLocation}`);
    }

    public unbind():void{
        
    }
}