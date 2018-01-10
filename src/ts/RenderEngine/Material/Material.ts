import { Shader } from "../Shaders/Shader";
export class Material {

    private shader:Shader;

    constructor() {
        this.shader = new Shader('./src/shaders/default/2D/vShader.vs','./src/shaders/default/2D/fShader.fs');
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