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
        let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ',
        'BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ'];
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
                range: spreadsheetTableName + '!A2:BZ', //Avoid retrieve headers
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

        if(data == null){
            console.info("data null for PUT on spreadsheetTableName " + spreadsheetTableName);
            return new Promise((resolve)=>{resolve()});
        }

        let body={};
        let range = GapiMiner.getRange(data);
        
        Progress.addStep();
        let test = this.gapi;
        let sheetId = this.sheetId

        return new Promise((resolve)=>{
            window.gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: this.sheetId,
                range: spreadsheetTableName + '!A:BZ',
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
                    if(response.result.error !== undefined){
                        Utils.appendPre('Error: ' + response.result.error.message);
                    } else {
                        Utils.appendPre('Error non spécifiée durant la requête gapi PUT');
                    }
                });
            }, function(response) {
                if(response.result.error !== undefined){
                    Utils.appendPre('Error: ' + response.result.error.message);
                } else {
                    Utils.appendPre('Error non spécifiée durant la requête gapi DELETE');
                }
            });
        });
    }

}
