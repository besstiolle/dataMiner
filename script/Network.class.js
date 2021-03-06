

import { Progress } from './Progress.class'

export class Network {

    constructor(baseUrlApi){
        this.baseUrlApi = baseUrlApi;
    }
    
    getJSON(url, callbackValue) {
        Progress.addStep();
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.baseUrlApi + url, true);
            xhr.responseType = 'json';
            xhr.onload = () => {
                let status = xhr.status;
                Progress.moveStep();
                if (status == 200) {
                    if(callbackValue != null){
                        resolve([xhr.response, callbackValue]);
                    } else {
                        resolve(xhr.response);
                    }
                } else {
                    console.error('HTTP error', xhr.status, xhr.statusText);
                    resolve([[], callbackValue]);
                }
            };
            xhr.send();
        });
        
    }

}