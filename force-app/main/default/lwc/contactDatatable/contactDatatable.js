import { LightningElement,wire,track } from 'lwc';
import getContactList from '@salesforce/apex/ContactDatatable.getContactList';
import servicelistdisplay from '@salesforce/apex/ContactDatatable.servicelistdisplay';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'First Name', fieldName: 'FirstName' },
   
];
export default class ApexDatatableExample extends LightningElement {
    @track searchvar ; //store value
    @track serviceList;
    @track err;

    @track checked = true;
changeToggle(event){
    this.checked = !this.checked;
}
    HandleKeyChange(event){
        this.searchvar = event.target.value;
       // alert('search val :',+this.searchvar);
    }

    

    error;
    columns = columns;

    @wire(getContactList)
    contacts;

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