import { Scene } from "./Scene";

export class SceneManager{

    private static instance:SceneManager;
    private scenes: Map<string , Scene>;

    private constructor(){
        this.scenes = new Map<string , Scene>();
    }
    
    public createScene(name:string):Scene | null{
        return this.scenes.get(name) == (null || undefined) ? new Scene(name) : null;
    }

    public static get Instance():SceneManager{
        this.instance = this.instance == null ? new SceneManager() : this.instance;
        return this.instance;
    }

    public showScenes():void{
        for (const iterator of this.scenes) {
            console.log(iterator);
        }
    }
}