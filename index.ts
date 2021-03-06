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
import { AsyncData } from "./src/ts/RenderEngine/Utils/AsyncData";

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
})();


function gameLoop(){
    gl.clearColor(0.2, 0.2, 0.2 , 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    scene1.update();
    
    requestAnimationFrame(gameLoop);
}

 