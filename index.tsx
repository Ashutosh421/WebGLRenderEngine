import { SceneManager } from "./src/ts/RenderEngine/World/SceneManager";
import { Entity } from "./src/ts/RenderEngine/Entity/Entity";
import { Scene } from "./src/ts/RenderEngine/World/Scene";
import "./src/styles/index.scss";
import { gl, createWebGLContext } from "./src/ts/RenderEngine/WebGLContextManager";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { EntityItemsExplorer } from './src/ts/UIRHandler/ItemsExplorer/EntityItemsExplorer.component';
import { PrimitiveManager } from "./src/ts/RenderEngine/Primitives/PrimitiveManager";
import { Triangle2D } from "./src/ts/RenderEngine/Primitives/Primitives2D/Triangle2D/Triangle2D";
import { Transform2D } from "./src/ts/RenderEngine/Transform/Transform2D";
import { Vector2D } from "./src/ts/RenderEngine/3DMaths/Vector2D";
import { Rectangle2D } from "./src/ts/RenderEngine/Primitives/Primitives2D/Rectangle2D/Rectangle2D";
import { MenuBar } from "./src/ts/UIRHandler/MenuBar/MenuBar.component";

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
    document.body.insertBefore(canvas , document.body.querySelector("#uiLayer") as HTMLDivElement);

    //Create WebGL Context here...
    createWebGLContext(canvas);

    console.log(`Current GL Version ${gl.VERSION}`);

    scene1 = SceneManager.Instance.createScene("Scene") as Scene;
    SceneManager.Instance.showScenes();

    requestAnimationFrame(gameLoop);
    initializeReactUI(scene1);
    // initializeUI();
    // setupDebugControls();
    // testingMathsAPI();
})();

function gameLoop() {
    gl.clearColor(0.2, 0.2, 0.2, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    scene1.update();

    requestAnimationFrame(gameLoop);
}

/*
function testingMathsAPI(){
    const translateMatrix:Matrix3 = Matrix3.Translation(new Vector2D(10,10));
    translateMatrix.print();

    const rotationMatrix:Matrix3 = Matrix3.RotationDeg(30);
    rotationMatrix.print();

    const scaleMatrix:Matrix3 = Matrix3.Scale(new Vector2D(20,20));
    scaleMatrix.print();

    const productMatrix:Matrix3 = scaleMatrix.multiply(rotationMatrix).multiply(translateMatrix);
    productMatrix.print();
}*/

function initializeReactUI(sceneToRender: Scene) {
    ReactDOM.render(<EntityItemsExplorer scene = {sceneToRender}/> , document.querySelector("#itemsExplorer"));
    ReactDOM.render(<MenuBar/> , document.querySelector("#menuBar"));

    const triangle = PrimitiveManager.Instance.createPrimitive<Triangle2D>(Triangle2D) as Entity;
    scene1.addEntity(triangle);
    (triangle.getComponent<Transform2D>(Transform2D) as Transform2D).Position = new Vector2D(400 , 100);

    const rectangle = PrimitiveManager.Instance.createPrimitive<Rectangle2D>(Rectangle2D) as Entity;
    scene1.addEntity(rectangle);
    (rectangle.getComponent<Transform2D>(Transform2D) as Transform2D).Position = new Vector2D(400 , 100);
    

    for(let i = 0 ; i < 10 ; i++){
        const rectangle = PrimitiveManager.Instance.createPrimitive<Rectangle2D>(Rectangle2D) as Entity;
        scene1.addEntity(rectangle);
        (rectangle.getComponent<Transform2D>(Transform2D) as Transform2D).Position = new Vector2D(400 + (i * 100) , 100 + (i * 100));
    }
}

/*
function initializeUI() {
    UIManager.Instance.init();
    UIManager.Instance.initMenuBar.then((success)=>{
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
    });
}

function setupDebugControls() {
    let currentEntity:Entity|null;
    UIManager.Instance.initSceneHeirarchy.then(()=>{
        (UIManager.Instance.sceneHeirarchy as SceneHeirarchy).on('click' , enitityID=> {
            currentEntity = scene1.getEntity(enitityID.toString()) as Entity;
        });
    });

    UIManager.Instance.initInspector.then(()=>{
        (<Inspector>UIManager.Instance.inspector).onReady.then(()=>{
            console.log(`Promise Resolved`);
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

            XSlider.oninput = event => {
                if (currentEntity) {
                    (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position = new Vector2D(Number((XSlider as HTMLInputElement).value), (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position.y);
                    console.log(`Current Position X ${(currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position.x}`);
                }
            };
            YSlider.oninput = event => {
                if (currentEntity) {
                    //(currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position.y = Number((YSlider as HTMLInputElement).value);
                    (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position = new Vector2D((currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Position.x, Number((YSlider as HTMLInputElement).value));
                }
            }
            AngleSlider.oninput = event => {
                if (currentEntity) {
                    (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Angle = Number((AngleSlider as HTMLInputElement).value);
                }
            }
            XScaleSlider.oninput = event => {
                if (currentEntity) {
                    (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Scale = new Vector2D(Number((XScaleSlider as HTMLInputElement).value), (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Scale.y);
                }
            }
            YScaleSlider.oninput = event => {
                if (currentEntity) {
                    (currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Scale = new Vector2D((currentEntity.getComponent<Transform2D>(Transform2D) as Transform2D).Scale.x, Number((YScaleSlider as HTMLInputElement).value));
                }
            }
        });
    });
}

*/
