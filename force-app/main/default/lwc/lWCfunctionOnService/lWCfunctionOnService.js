import { LightningElement, track, wire } from 'lwc';
import servicelistdisplay from '@salesforce/apex/LWCfunctionOnService.servicelistdisplay';
export default class LWCfunctionOnService extends LightningElement {
    @track searchvar ; //store value
    @track serviceList;
    @track err;

    HandleKeyChange(event){
        this.searchvar = event.target.value;
        //alert('search val :',+this.searchvar);
    }
    @wire(servicelistdisplay, {searchService:'$searchvar'})
    serviceList({data,error}){//method name
        if(data){
           // alert('data present');
            this.serviceList =data;
            this.err =undefined;
        }
        else{
           // alert('Error present');
            this.serviceList =undefined;
            this.err=error;
        }

    }
}