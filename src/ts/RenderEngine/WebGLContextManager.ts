import { Vector2D } from "./3DMaths/Vector2D";

export let gl: WebGL2RenderingContext | WebGLRenderingContext;
export let DisplaySize:Vector2D;

const contextAttributes = {
    alpha: true,
    depth:true,
    stencil:true,
    antialias:true,
    premultipliedAlpha:true,
    preserveDrawingBuffer:true,
    failIfMajorPerformanceCaveat:true
}

export function createWebGLContext(canvas:HTMLCanvasElement){
    gl = (<HTMLCanvasElement>canvas).getContext("webgl2", contextAttributes) as WebGL2RenderingContext == null ? 
         (<HTMLCanvasElement>canvas).getContext("webgl", contextAttributes) as WebGLRenderingContext == null ? 
         (<HTMLCanvasElement>canvas).getContext("experimental-webgl", contextAttributes) as WebGLRenderingContext : 
         (<HTMLCanvasElement>canvas).getContext("webgl", contextAttributes) as WebGLRenderingContext : 
         (<HTMLCanvasElement>canvas).getContext("webgl2", contextAttributes) as WebGL2RenderingContext;
    gl.viewport(0 , 0 , canvas.width , canvas.height);
    DisplaySize = new Vector2D(canvas.width , canvas.height);
    return gl;
}


