export class AsyncData {
    private constructor() {}

    public static getDatafromURL(url:string, callback:(response:string|null , error:string|null) => void){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url , true);
        xhr.onload = e => xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 ? callback(xhr.response , null) : callback(null , "Invalid error!");
        xhr.onerror = event => callback(null , event.error);
        xhr.send(null);
    }
}