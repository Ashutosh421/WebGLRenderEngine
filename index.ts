import { SceneManager } from "./src/ts/RenderEngine/World/SceneManager";
import { EntityComponent } from './src/ts/RenderEngine/Entity/EntityComponent';
import { MeshRenderer } from "./src/ts/RenderEngine/Entity/Coms/MeshRenderer";
import { Entity } from "./src/ts/RenderEngine/Entity/Entity";
import { Scene } from "./src/ts/RenderEngine/World/Scene";
import { Transform } from "./src/ts/RenderEngine/Transform/Transform";
import { MeshFilter } from "./src/ts/RenderEngine/Entity/Coms/MeshFilter";
import "./src/styles/index.scss";
import { gl, createWebGLContext } from "./src/ts/RenderEngine/WebGLContextManager";
import { Color } from "./src/ts/RenderEngine/3DMaths/Color";
import { MeshData } from "./src/ts/RenderEngine/Mesh/MeshData";
import { Vector3D } from "./src/ts/RenderEngine/3DMaths/Vector3D";
import { AsyncData } from "./src/ts/RenderEngine/Utils/AsyncData";
import { UIManager } from "./src/ts/UIHandler/UIManager";
import { MenuBar } from "./src/ts/UIHandler/MenuBar/MenuBar";
import { PrimitiveManager } from "./src/ts/RenderEngine/Primitives/PrimitiveManager";
import { Triangle } from "./src/ts/RenderEngine/Primitives/Primitives3D/Triangle/Triangle";
import { Triangle2D } from "./src/ts/RenderEngine/Primitives/Primitives2D/Triangle2D/Triangle2D";
import { Rectangle2D } from "./src/ts/RenderEngine/Primitives/Primitives2D/Rectangle2D/Rectangle2D";
import { Square2D } from "./src/ts/RenderEngine/Primitives/Primitives2D/Square2D/Square2D";
import { SceneHeirarchy } from "./src/ts/UIHandler/SceneHeirarchy/SceneHeirarchy";

let scene1: Scene;

let canvas: HTMLCanvasElement;
let triangle: Entity;

(function () {
    //Create the CANVAS Platform
    canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.setAttribute("class", "centerAbsolute");
    canvas.setAttribute("width", (window.innerWidth).toString());
    canvas.setAttribute("height", (window.innerHeight).toString());
    document.body.appendChild(canvas);

    //Create WebGL Context here...
    createWebGLContext(canvas);

    console.log(`Current GL Version ${gl.VERSION}`);

    scene1 = SceneManager.Instance.createScene("Scene") as Scene;
    SceneManager.Instance.showScenes();

    requestAnimationFrame(gameLoop);
    setupDebugControls();
    initializeUI();
})();


function gameLoop() {
    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    scene1.update();

    requestAnimationFrame(gameLoop);
}

function initializeUI() {
    UIManager.Instance.init();
    (<MenuBar>UIManager.Instance.menuBar).on('click', element => {
        switch (element.toString()) {
            case "Triangle":
                const triangle = PrimitiveManager.Instance.createPrimitive<Triangle2D>(Triangle2D) as Entity;
                scene1.addEntity(triangle);
                (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).updateEntity(triangle.ID);
                break;

            case "Rectangle":
                const rectangle = PrimitiveManager.Instance.createPrimitive<Rectangle2D>(Rectangle2D) as Entity;
                scene1.addEntity(rectangle);
                (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).updateEntity(rectangle.ID);
                break;

            case "Square":
                const square = PrimitiveManager.Instance.createPrimitive<Square2D>(Square2D) as Entity;
                scene1.addEntity(square);
                (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).updateEntity(square.ID);
                break;

            default:
                break;
        }
    });
    
    (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).on('click' , event=> console.log(`Scene Heirarchy clicked ${event}`));
    
    document.onkeydown = event => (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).eventEmitter.showCallback('click');
}

function setupDebugControls() {
    const XSlider: HTMLElement = document.querySelector("#XSlider") as HTMLElement;
    const YSlider: HTMLElement = document.querySelector("#YSlider") as HTMLElement;
    XSlider.setAttribute("min", "0");
    XSlider.setAttribute("max", (window.innerWidth).toString());
    YSlider.setAttribute("min", "0");
    YSlider.setAttribute("max", (window.innerHeight).toString());
}



