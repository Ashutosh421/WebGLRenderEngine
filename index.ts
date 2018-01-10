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
import { Transform2D } from "./src/ts/RenderEngine/Transform/Transform2D";
import { Vector2D } from "./src/ts/RenderEngine/3DMaths/Vector2D";

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
    initializeUI();
    setupDebugControls();
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
}

function setupDebugControls() {
    const XSlider: HTMLElement = document.querySelector("#XSlider") as HTMLElement;
    const YSlider: HTMLElement = document.querySelector("#YSlider") as HTMLElement;
    const AngleSlider: HTMLElement = document.querySelector('#AngleSlider') as HTMLElement;
    const XScaleSlider: HTMLElement = document.querySelector(`#XScaleSlider`) as HTMLElement;
    const YScaleSlider: HTMLElement = document.querySelector(`#YScaleSlider`) as HTMLElement;
    XSlider.setAttribute("min", "0");
    XSlider.setAttribute("max", (window.innerWidth).toString());
    YSlider.setAttribute("min", "0");
    YSlider.setAttribute("max", (window.innerHeight).toString());
    AngleSlider.setAttribute("min", "0");
    AngleSlider.setAttribute("max", "360");
    XScaleSlider.setAttribute("min" , "0");
    XScaleSlider.setAttribute("max" , "10");
    XScaleSlider.setAttribute("step" , "0.0001");
    (<HTMLInputElement>XScaleSlider).value = "1";
    YScaleSlider.setAttribute("min" , "0");
    YScaleSlider.setAttribute("max" , "10");
    YScaleSlider.setAttribute("step" , "0.0001");
    (<HTMLInputElement>YScaleSlider).value = "1";

    let currentEntity:Entity|null;
    (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).on('click' , enitityID=> {
        currentEntity = scene1.getEntity(enitityID.toString()) as Entity;
    });
    XSlider.oninput = event => {
        if(currentEntity){
            (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).translation2D.x = Number((XSlider as HTMLInputElement).value);
        }
    };
    YSlider.oninput = event => {
        if(currentEntity){
            (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).translation2D.y = Number((YSlider as HTMLInputElement).value);
        }
    }
    AngleSlider.oninput = event => {
        if(currentEntity){
            (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).angle = Number((AngleSlider as HTMLInputElement).value);
        }
    }
    XScaleSlider.oninput = event => {
        if(currentEntity){
            (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).scale2D.x = Number((XScaleSlider as HTMLInputElement).value);
        }
    }
    YScaleSlider.oninput = event => {
        if(currentEntity){
            (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).scale2D.y = Number((YScaleSlider as HTMLInputElement).value);
        }
    }
   // window.onkeydown = event => event.keyCode == 32 && scene1.entities.forEach((value , key) => {console.log(`Entity ID ${key} and value ${value}`)});
}



