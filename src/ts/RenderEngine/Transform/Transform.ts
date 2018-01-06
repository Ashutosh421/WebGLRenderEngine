import { Vector3D } from "../3DMaths/Vector3D";
import { Vector2D } from "../3DMaths/Vector2D";
import { Quaternion } from "../3DMaths/Quaternion";
import { EntityComponent } from "../Entity/EntityComponent";
import { Entity } from "../Entity/Entity";
import { gl , DisplaySize } from "../WebGLContextManager";
import { MeshRenderer } from "../Entity/Coms/MeshRenderer";

export class Transform implements EntityComponent{
   
    private entity: Entity;
    private position:Vector3D = Vector3D.Zero;
    private scale:Vector3D = Vector3D.Zero;

    private eulerAngles:Vector3D = Vector3D.Zero;
    private quaternion:Quaternion = Quaternion.Identity;

    private translation2D:Vector3D = Vector3D.Zero;
    //private rotation2D:Vector2D = 

    //WebGLUniform Locations;
    private translateUL:WebGLUniformLocation|null;

    //Other Components
    private meshRenderer:MeshRenderer;

    constructor(entity:Entity){
        this.entity = entity;
        this.meshRenderer = entity.getComponent<MeshRenderer>(MeshRenderer) as MeshRenderer;
        this.translateUL = this.meshRenderer ?this.meshRenderer.getUniformLocation("translation") : null;
    }

    public onInit(): void {}
    public onUpdate(): void {}
    public onEnabled(): void {}
    public onDisabled(): void {}
    public onDestroy(): void {}

    //#region Properties
    public set Position(position:Vector3D){this.position = position;}
    public set EulerAngles(eulerAngles:Vector3D){this.eulerAngles = eulerAngles;}
    public set Scale(scale:Vector3D){this.scale = scale;}

    //TODO defanately need to organize this
    public set Translate(translate:Vector3D){
        this.translation2D = translate;
        if(this.translateUL){
             console.log(`Sending ${this.translation2D.x} ${this.translation2D.y}`);
             gl.uniform3f(this.translateUL , translate.x , translate.y, translate.z);
        }
        else{
            this.meshRenderer = this.entity.getComponent<MeshRenderer>(MeshRenderer) as MeshRenderer;
            this.translateUL = this.meshRenderer ?this.meshRenderer.getUniformLocation("translation") : null;    
        }
    };

    public get Translate():Vector3D{
        return this.translation2D;
    }
    //#endregion
}