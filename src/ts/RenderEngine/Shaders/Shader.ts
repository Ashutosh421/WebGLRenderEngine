import { gl } from "../WebGLContextManager";
import { AsyncData } from "../Utils/AsyncData";

export class Shader {

    private vertexShaderSource!: string;
    private fragmentShaderSource!: string;

    //Shader Program Assets
    //Shader Program Assets
    private vertexShader!: WebGLShader;
    private fragmentShader!: WebGLShader;
    private shaderProgram: WebGLProgram | null;
    private programReady: boolean = false;

    private gl: WebGL2RenderingContext | WebGLRenderingContext;
    private shaderReady:boolean = false;

    constructor(vertexShaderLink:string = "./src/shaders/default/3D/vShader.vs", fragmentShaderLink:string = "./src/shaders/default/3D/fShader.fs") {
        this.gl = gl as WebGL2RenderingContext | WebGLRenderingContext;
        this.shaderProgram = null;
        this.retrieveShaderSource(vertexShaderLink , fragmentShaderLink);
    }

    private prepareShaderProgram() {
        //Create the vertex and fragment shader
        this.vertexShader = this.gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
        this.fragmentShader = this.gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

        //Assiging the Shader Code to the WebGLShaders
        this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
        this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);

        //Compiling Shaders
        this.gl.compileShader(this.vertexShader);
        !this.gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS) && console.log(`Vertex Shader compilation failed ${this.gl.getShaderInfoLog(this.vertexShader)}`);

        this.gl.compileShader(this.fragmentShader);
        !this.gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS) && console.log(`Fragment Shader compilation failed ${this.gl.getShaderInfoLog(this.fragmentShader)}`);

        //Create the final shader program
        this.shaderProgram = this.gl.createProgram() as WebGLProgram;
        this.gl.attachShader(this.shaderProgram, this.vertexShader);
        this.gl.attachShader(this.shaderProgram, this.fragmentShader);

        this.gl.linkProgram(this.shaderProgram);
        !this.gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS) && console.log(`Shader Program linking failed ${this.gl.getProgramInfoLog(this.shaderProgram)}`);
        this.gl.validateProgram(this.shaderProgram);
        this.gl.getProgramParameter(this.shaderProgram, gl.VALIDATE_STATUS) ? this.programReady = true : console.log(`Shader Program validation failed ${this.gl.getProgramInfoLog(this.shaderProgram)}`);

        const vertexShaderInfoLog: string = this.gl.getShaderInfoLog(this.vertexShader) as string;
        const fragmentShaderInfoLog: string = this.gl.getShaderInfoLog(this.fragmentShader) as string;
        // console.log(`Shader Program Ready`);
    }

    private retrieveShaderSource(vShader:string , fShader:string){
        //TODO- Replace the Async Call Tree with modern javascript Asynchronous Requests
        AsyncData.getDatafromURL(vShader, (response:string|null , error:string|null)=>
            {
                response ? this.vertexShaderSource = response : console.error(`Error Loading Vertex Shader!! ${error}`);
                response && AsyncData.getDatafromURL(fShader, (response:string|null , error:string|null)=>{
                        response ? this.fragmentShaderSource = response : console.error(`Error Loading Fragment Shader ${error}`);
                        this.prepareShaderProgram();
                    }
                );
            }
        );
    }

    public bind(): void {
        this.programReady && this.gl.useProgram(this.shaderProgram);
    }

    public unbind(): void {
        this.programReady && this.gl.useProgram(null);
    }

    public get ShaderProgram(): WebGLProgram | null{
        return this.shaderProgram;
    }
}