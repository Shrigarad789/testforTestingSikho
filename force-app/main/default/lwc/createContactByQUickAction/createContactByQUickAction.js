import { LightningElement } from 'lwc';
import CreateContact from '@salesforce/apex/ContactCreationControllerLwc.addParentAccount';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import Phone_FIELD from '@salesforce/schema/Contact.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateContactByQUickAction extends LightningElement {
    @track error;    
    @track ParentId;
    @track accountRecord={
        FIRSTNAME:FIRSTNAME_FIELD,
        LASTNAME :LASTNAME_FIELD,
        Phone:Phone_FIELD
    };

    handleNameChange(event){
        this.accountRecord.FIRSTNAME = event.target.value;
        //window.console.log(this.accountRecord.Name);
      }
     
      handleNameChange(event){
        this.accountRecord.LASTNAME = event.target.value;
        //window.console.log(this.accountRecord.Name);
      }
     
       handlePhoneChange(event){
         this.accountRecord.Phone = event.target.value;
         //window.console.log(this.accountRecord.Phone);
       }
     
       handleSaveAccount(){
        window.console.log('before save' + this.createAccount);
        CreateContact({lstOfContactIds:this.accountRecord})
        .then(result=>{
          window.console.log(this.CreateContact);
            this.accountRecord={};
            this.ParentId=result.Id;
            window.console.log('after save' + this.ParentId);
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Contact Record is created successfully',
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