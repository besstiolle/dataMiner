
export class Storage {

    load(){
        //Retrieve default var from localStorage
        this.sheetId=localStorage.getItem('sheetId');
        this.gAPIClientId=localStorage.getItem('gAPIClientId');
        this.aPIKey=localStorage.getItem('aPIKey');
        this.start=localStorage.getItem('start');
        this.end=localStorage.getItem('end');
        this.ul=localStorage.getItem('ul');

        //Set default value
        if(this.sheetId==null){this.sheetId="";}
        if(this.gAPIClientId==null){this.gAPIClientId="";}
        if(this.aPIKey==null){this.aPIKey="";}
        if(this.start===null || this.start===""){this.start=15;}
        if(this.end===null || this.end===""){this.end=30;}
        if(this.ul===null || this.ul===""){this.ul=474;}
    }

    save(){
        //Save parameter for futur script
        localStorage.setItem('sheetId', this.sheetId);
        localStorage.setItem('gAPIClientId', this.gAPIClientId);
        localStorage.setItem('aPIKey', this.aPIKey);
        localStorage.setItem('start', this.start);
        localStorage.setItem('end', this.end);
        localStorage.setItem('ul', this.ul);
    }

}