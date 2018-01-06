import { gl } from "../WebGLContextManager";

export class Shader {

    private vertexShaderSource: string;
    private fragmentShaderSource: string;

    //Shader Program Assets
    private vertexShader: WebGLShader;
    private fragmentShader: WebGLShader;
    private shaderProgram: WebGLProgram;
    private programReady: boolean = false;

    private gl: WebGL2RenderingContext | WebGLRenderingContext;

    constructor(vertexShaderLink:string = "", fragmentShaderLink:string = "") {
        this.gl = gl as WebGL2RenderingContext | WebGLRenderingContext;
        this.retrieveShaderSource(vertexShaderLink , fragmentShaderLink);

        //Temp Code
        this.vertexShaderSource =
            `#version 300 es

            in vec3 vertexPosition;
            in vec4 vertexColor;

            //Uniforms
            uniform vec3 translation;
            uniform vec2 u_resolution;

            out vec4 outColor;

            void main(){
                // gl_Position = vec4(vertexPosition , 1.0) + vec4(translation , 1.0);
                // gl_Position = gl_Position / vec4(u_resolution , 1.0f , 1.0f);
                //outColor = vertexColor;

                vec3 position = vertexPosition + translation;  //Implemented Offset
                position = position / vec3(u_resolution, 1.0); //0 to 1
                position = position * 2.0; //0 to 2
                position = position - 1.0; //-1 to 1

                gl_Position = vec4(position.xy * vec2(1,-1) , 0 , 1);

                outColor = vec4(u_resolution.x , u_resolution.y,u_resolution.x , 1);
            }
           `;

        this.fragmentShaderSource =
            `#version 300 es

            precision mediump float;

            in vec4 outColor;

            out vec4 fragColor;

            void main(){
                fragColor = outColor;                
            }
            `;

        this.prepareShaderProgram();
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
        this.gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS) ? console.log(`Vertex Shader successfully compiled `) : console.log(`Vertex Shader compilation failed ${this.gl.getShaderInfoLog(this.vertexShader)}`);

        this.gl.compileShader(this.fragmentShader);
        this.gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS) ? console.log(`Fragment Shader successfully compiled`) : console.log(`Fragment Shader compilation failed ${this.gl.getShaderInfoLog(this.fragmentShader)}`);

        //Create the final shader program
        this.shaderProgram = this.gl.createProgram() as WebGLProgram;
        this.gl.attachShader(this.shaderProgram, this.vertexShader);
        this.gl.attachShader(this.shaderProgram, this.fragmentShader);

        this.gl.linkProgram(this.shaderProgram);
        this.gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS) ? console.log(`Shader Program linked successfully`) : console.log(`Shader Program linking failed ${this.gl.getProgramInfoLog(this.shaderProgram)}`);
        this.gl.validateProgram(this.shaderProgram);
        this.gl.getProgramParameter(this.shaderProgram, gl.VALIDATE_STATUS) ? (console.log(`Shader Program validated successfully`), this.programReady = true) : console.log(`Shader Program validation failed ${this.gl.getProgramInfoLog(this.shaderProgram)}`);

        const vertexShaderInfoLog: string = this.gl.getShaderInfoLog(this.vertexShader) as string;
        const fragmentShaderInfoLog: string = this.gl.getShaderInfoLog(this.fragmentShader) as string;
    }

    private retrieveShaderSource(vShader:string , fShader:string){

    }

    public bind(): void {
        this.programReady && this.gl.useProgram(this.shaderProgram);
    }

    public unbind(): void {
        this.programReady && this.gl.useProgram(null);
    }

    public get ShaderProgram(): WebGLProgram{
        return this.shaderProgram;
    }
}