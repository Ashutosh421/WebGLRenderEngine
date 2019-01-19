import { UIElement } from "../UIElement";
import { UIElementDraggable } from "../UIElementComponents/UIElementDraggable";
import { AsyncData } from "../../RenderEngine/Utils/AsyncData";

export class Inspector extends UIElement {

   private displayTemplate: string = 'src/ts/UIHandler/Inspector/Inspector.html';
    private displayTemplate2: string = `<div id="transformControl">
    <div class="positionSlider">
        <label for="XSlider">X: </label>
        <input type="range" id="XSlider">
    </div>
    <div class="positionSlider">
        <label for="YSlider">Y: </label>
        <input type="range" id="YSlider">
    </div>
    <div class="positionSlider">
        <label for="AngleSlider">Angle: </label>
        <input type="range" id="AngleSlider">
    </div>
    <div class="positionSlider">
        <label for="XScaleSlider">XScale: </label>
        <input type="range" id="XScaleSlider">
    </div>
    <div class="positionSlider">
        <label for="YScaleSlider">YScale: </label>
        <input type="range" id="YScaleSlider">
    </div>
</div>`;
   
    private inspecterDragger!: UIElementDraggable;
    private transformControl!: HTMLElement;

    constructor() {
        super();
        this.innerHTML = this.displayTemplate;
        // AsyncData.getDatafromURL(this.displayTemplate , (response , error)=>{
        //     this.innerHTML = response as string;
        //     console.log(`Updated`);
        // });
        // this.transformControl = this.querySelector("#transformControl") as HTMLElement;

        // this.inspecterDragger = this.getComponent<UIElementDraggable>(UIElementDraggable) as UIElementDraggable;
        // this.inspecterDragger.enableDraggable(this.transformControl , this.transformControl);
    }

    // private loadContent(displayTemplate:string){
    //     let xhr;
    //     xhr = new XMLHttpRequest()
    // }

    public onReady = new Promise((resolve, reject)=>{
        if(!this.innerHTML || this.innerHTML == ""){
            console.log(`Resolving again`);
            AsyncData.getDatafromURL(this.displayTemplate , (response , error)=>{
                this.innerHTML = response as string;
                resolve();
            }); 
        }
        else{
            resolve();
        }
    })

    // private loadContent = new Promise((resolve, reject)=>{
    //     const xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = ()=>{
    //         if(xhr.readyState == 4){
    //             xhr.status == 200 ? resolve(xhr.responseText) : reject(xhr.responseText);
    //         }
    //     }
    //     xhr.onerror = ()=>{
    //         reject(`An error occureds`);
    //     }
    //     xhr.open('GET',this.displayTemplate, true);
    //     xhr.send(null);
    // });
}