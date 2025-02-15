import { LightningElement,wire,track } from 'lwc';
import createRecord from '@salesforce/apex/CraeteServiceRecord.createRecord';

export default class CreateSevicerecordOncase extends LightningElement {
//Property declare 
  @track serviceids;
  @track SeviceNames;
  @track CustomerNames;

   handleNameChange(event){  //Field me value get karne ke liye event lagate hai
    this.SeviceNames =event.target.value;
   } 

   handleCustomerChange(event){
    this.CustomerNames=event.target.value;
   }

  @wire(createRecord)
  oncreaterecord({data,error}){
    if(data){
        this.data =data;
            }
else if(error){
    console.log("error occured")
}
   }

}