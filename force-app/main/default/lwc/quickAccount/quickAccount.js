import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/accountCreationControllerLwc.createAccount';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class AccountCreationLwc extends LightningElement {
@track accountid;
@track error;    
@track accountRecord={
    Name:ACCOUNT_NAME,
    Type:ACCOUNT_TYPE,
    Phone:ACCOUNT_PHONE
};

handleNameChange(event){
   this.accountRecord.Name = event.target.value;
   //window.console.log(this.accountRecord.Name);
 }

 handleTypeChange(event){
    this.accountRecord.Type = event.target.value;
    //window.console.log(this.accountRecord.Type);
  }

  handlePhoneChange(event){
    this.accountRecord.Phone = event.target.value;
    //window.console.log(this.accountRecord.Phone);
  }

  handleSaveAccount(){
    window.console.log('before save' + this.createAccount);
    createAccount({accountRecObj:this.accountRecord})
    .then(result=>{
      window.console.log(this.createAccount);
        this.accountRecord={};
        this.accountid=result.Id;
        window.console.log('after save' + this.accountid);
        
        const toastEvent = new ShowToastEvent({
          title:'Success!',
          message:'Account Record is created successfully',
          variant:'success'
        });
        this.dispatchEvent(toastEvent);
    })
    .catch(error=>{
       this.error=error.message;
       window.console.log(this.error);
    });
  }


}