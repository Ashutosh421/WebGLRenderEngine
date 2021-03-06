import { Shader } from "../Shaders/Shader";
export class Material {

    private shader:Shader;

    constructor() {
        this.shader = new Shader();
    }

    public bind():void{
        this.shader.bind();
    }

    public unbind():void{
        this.shader.unbind();
    }   

    public get MShader():Shader{
        return this.shader;
    }
}