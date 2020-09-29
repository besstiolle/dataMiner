import { Progress } from './Progress.class'
import { Utils } from './Utils.class'

export class GapiMiner {

    constructor(gapi, sheetId){
        this.gapi = gapi;
        this.sheetId = sheetId;
    }

    /**
     * Calcul the Google Sheet Range from a 2 dimentionals array
     * @param {*} oneArray a 2 dimentionals array
     * @returns String 
     */
    static getRange(oneArray){
        let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        return "A1:" + letters[oneArray[0].length-1] + oneArray.length; 
    }

      /**
       * Return all the content of a Sheet Table Name in an Array
       * @param {*} spreadsheetTableName the name of the Google Sheet Table
       * @returns Array
       */
    getAll(spreadsheetTableName){
        Progress.addStep();
        return new Promise((resolve, reject)=>{
            this.gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: this.sheetId,
                range: spreadsheetTableName + '!A2:Z', //Avoid retrieve headers
            }).then(function(response) {
                Progress.moveStep();
                let values = [];
                if(response.result.values !== undefined){
                    values = response.result.values;
                }
                resolve(values);
            }, function(response) {
                reject(Utils.appendPre('Error: ' + response.result.error.message));
            }); 
        });
    }

    put(spreadsheetTableName, data){

        let body={};
        let range = GapiMiner.getRange(data);
        
        Progress.addStep();
        let test = this.gapi;
        let sheetId = this.sheetId

        return new Promise((resolve, reject)=>{
            window.gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: this.sheetId,
                range: spreadsheetTableName + '!A:Z',
            }).then(function(response) {
                Progress.moveStep();
                Progress.addStep();
                body['values'] = data;
                test.client.sheets.spreadsheets.values.update({
                    spreadsheetId: sheetId,
                    range: spreadsheetTableName + '!' + range,
                    includeValuesInResponse: false,
                    valueInputOption: 'RAW',
                }, body).then(function(response) {
                    Progress.moveStep();
                    resolve();
                }, function(response) {
                Utils.appendPre('Error: ' + response.result.error.message);
                });
            }, function(response) {
            Utils.appendPre('Error: ' + response.result.error.message);
            });
        });
    }

}
