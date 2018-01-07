import { MenuBar } from "./MenuBar";

export class MenuEventEmitter {

    private menuBar:MenuBar;
    private events:Map<string, Array<(...args:any[])=>void>>;

    constructor(menuBar:MenuBar) {
        this.menuBar = menuBar;
        this.events = new Map<string , Array<()=>void>>();
    }

    public on(eventName:string , callback:(...args:any[])=>void){
        if(!this.events.has(eventName)){
            const newCallBackList = new Array<()=>void>();
            newCallBackList.push(callback);
            this.events.set(eventName , newCallBackList);
        }
        else{
            for(let [key , value] of this.events){
                if(key === eventName) value.push(callback);
            }
        }
    }

    public trigger(eventName:string , ...args:any[]){
        let eventList = this.events.get(eventName);
        eventList && eventList.forEach(callback => callback(args));
    }

    public ShowEvents():void{
        console.log(`Showing MenuBar Events`);
        for(let [key,value] of this.events){
            console.log(`EventName ${key}`);
            value.forEach(calllback => console.log(`Callback: ${calllback}`));
        }
    }
}