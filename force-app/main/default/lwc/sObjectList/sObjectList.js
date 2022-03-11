import { LightningElement, api, wire } from "lwc";
import getRelatedRecords from '@salesforce/apex/GenericSbjectList.getRelatedRecords';
export default class SObjectList extends LightningElement {
    @api recordId;
    @api object;
    @api relation;
    @api fields;
    @api filter;

    data = [];
    visibleData = [];
    columns = []
    error;
    loaded = false;

    get len() {
        if (this.data.length == 0) {
            return false;
        }
        return true;
    }

    connectedCallback() {
        this.loadData();
    }
    handleDataDisplay(evt) {
        this.loadData();
    }
    updatePagination(event) {
        this.visibleData = [...event.detail.records]
        console.log(event.detail.records)
    }
    loadData() {
        console.log('Data load Called');
        this.loaded = false;
        getRelatedRecords({ sobjectName: this.object, relation: this.relation, fields: this.fields, filter: this.filter, recordId: this.recordId })
            .then(result => {
                let temparray = this.fields.split(",");
                if (temparray.indexOf("Id") == -1) {
                    this.fields = "Id," + this.fields;
                    temparray.unshift("Id");
                }
                console.log(result);
                let col = temparray;
                let res = result;
                let records = [];
                for (let each of res) {
                    let object = {};
                    for (let item in each) {
                        if (item === 'Id' && temparray.indexOf(item)!==-1) {
                            let url = 'https://concretio38-dev-ed.lightning.force.com/lightning/r/' + this.object + '/' + each[item] + '/view';
                            object.URL = url;
                            object[item] = each[item];
                        }
                        else if(temparray.indexOf(item)!==-1){
                                object[item] = each[item];
                        }
                    }
                    records.push(object);
                }
                let cols = [];
                for (let each of col) {
                    if (each == 'Id') {
                        cols.push({ label: each, fieldName: 'URL', type: 'url', typeAttributes: { label: { fieldName: each }, target: "_blank" } });
                    }
                    else {
                        cols.push({ label: each, fieldName: each });
                    }
                }
                this.data = records;
                this.columns = cols;
                this.loaded = true;
            })
            .catch(error => {
                console.log(error);
                this.error = error.body.message;
                this.loaded = true;
            })
    }
}