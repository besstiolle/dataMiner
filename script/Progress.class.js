
export class Progress {

    constructor() {
    }
  
    static #count = 0;
    static #countMax = 0;
    static #startMS = 0;
    static #endMS = 0;
  
    static init(){
        this.#count=0;
        this.#countMax=0;
    }

    static reset(){
        Progress.init();
        Progress.refreshProgress();
    }

    static moveStep() {
        this.#count += 1;
        
        if(this.#count === this.#countMax){
            this.#endMS=Date.now();
        }

        Progress.refreshProgress();
    }
    
    static addStep() {
        if(this.#countMax == 0){
            this.#startMS=Date.now();
        }
        this.#countMax += 1;

        Progress.refreshProgress();
    }
  
    static get() {
        return [this.#count,this.#countMax];
    }

    static durationMS(){
        return this.#endMS - this.#startMS;
    }

    static refreshProgress() {
        dmProgressA.style.width = (this.#count * 100 / this.#countMax)+'%';
        dmCountA.innerText=this.#count;
        dmCountT.innerText=this.#countMax;
        //console.info(`Processing ${this.#count} / ${this.#countMax}`);
    }
}