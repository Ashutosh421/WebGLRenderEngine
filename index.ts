import { SceneManager } from "./src/ts/RenderEngine/World/SceneManager";
import { Triangle } from "./src/ts/RenderEngine/Primitives/Triangle";

import { EntityComponent } from './src/ts/RenderEngine/Entity/EntityComponent';
import { MeshRenderer } from "./src/ts/RenderEngine/Entity/Coms/MeshRenderer";
import { Entity } from "./src/ts/RenderEngine/Entity/Entity";
import { Scene } from "./src/ts/RenderEngine/World/Scene";
import { Transform } from "./src/ts/RenderEngine/Transform/Transform";
import { MeshFilter } from "./src/ts/RenderEngine/Entity/Coms/MeshFilter";
import "./src/styles/index.scss";
import { gl , createWebGLContext} from "./src/ts/RenderEngine/WebGLContextManager";
import { TriangleMesh } from "./src/ts/RenderEngine/Primitives/TriangleMesh";
import { Color } from "./src/ts/RenderEngine/3DMaths/Color";
import { MeshData } from "./src/ts/RenderEngine/Mesh/MeshData";
import { Vector3D } from "./src/ts/RenderEngine/3DMaths/Vector3D";


let scene1:Scene;

let canvas:HTMLCanvasElement;
let triangle:Entity;

(function(){
    //Create the CANVAS Platform
    canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.setAttribute("class","centerAbsolute");
    canvas.setAttribute("width", (window.innerWidth).toString());
    canvas.setAttribute("height", (window.innerHeight).toString());
    document.body.appendChild(canvas);

    //Create WebGL Context here...
    createWebGLContext(canvas);

    console.log(`Current GL Version ${gl.VERSION}`);

    scene1 = SceneManager.Instance.createScene("Scene") as Scene;
    SceneManager.Instance.showScenes();

    const triangleMesh:MeshData = new TriangleMesh();

    triangle = new Triangle("1");
    triangle.addComponent<MeshFilter>(MeshFilter);
    triangle.addComponent<MeshRenderer>(MeshRenderer);
    scene1.addEntity(triangle);

    (<MeshFilter>triangle.getComponent<MeshFilter>(MeshFilter)).RenderMesh = triangleMesh;

   requestAnimationFrame(gameLoop);
   setupDebugControls();
   testAsynchronousShaderLoad();
})();


function gameLoop(){
    gl.clearColor(0.2, 0.2, 0.2 , 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    scene1.update();
    
    requestAnimationFrame(gameLoop);
}

function testAsynchronousShaderLoad(){
    console.log(`Loading Shaders Asynchronously`);
    const vertexShaderLink = "./src/shaders/default/3D/fShader.fs";
    const fragmentShaderLink = "./src/shaders/default/3D/vShader.fs";

    let xhr = new XMLHttpRequest();
    xhr.open('GET' , vertexShaderLink , true);
    xhr.onload = e =>{
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(`Request Successful ${xhr.responseText}`);
            }
            else{
                console.log(`XHTTP Error!! ${xhr.statusText}`);
            }
        }
    };

    xhr.onerror = e => console.log(`XHTTP Error ${e.error}`);
    xhr.send(null);
}

function setupDebugControls(){
    const XSlider:HTMLElement = document.querySelector("#XSlider") as HTMLElement;
    const YSlider:HTMLElement = document.querySelector("#YSlider") as HTMLElement;
    XSlider.setAttribute("min", "0");
    XSlider.setAttribute("max", (window.innerWidth).toString());
    YSlider.setAttribute("min", "0");
    YSlider.setAttribute("max", (window.innerHeight).toString());
    
    XSlider.oninput = event => {
                 const val = Number((<HTMLInputElement>event.target).value);
                 triangle.transform.Translate = new Vector3D(val, triangle.transform.Translate.y , triangle.transform.Translate.z);
          };
    YSlider.oninput = event => {
                 const val = Number((<HTMLInputElement>event.target).value);
                 triangle.transform.Translate = new Vector3D(triangle.transform.Translate.x, val , triangle.transform.Translate.z);
          };

    //triangleMesh
}



 