import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    currentPage =1
    totalRecords
    @api recordSize=1;
    totalPage = 0
    get records(){
        return this.visibleRecords
    }
    @api 
    set records(data){
        if(data){ 
            this.totalRecords = data
            this.recordSize = Number(this.recordSize)
            this.totalPage = Math.ceil(data.length/this.recordSize)
            this.currentPage=1;
            this.updateRecords()
        }
    }


    value = 1;

    get options() {
        return [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
        ];
    }

    handleChange(event) {
        this.value = event.target.value;
        this.recordSize=Number(this.value);
        this.totalPage = Math.ceil(this.totalRecords.length/this.recordSize)
        console.log('total page',this.totalPage);
        this.currentPage=1;
        this.updateRecords();
    }
    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }
    }
    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1
            this.updateRecords()
        }
    }
    updateRecords(){ 
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords
            }
        }))
    }
}