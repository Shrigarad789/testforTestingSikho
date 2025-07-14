import { LightningElement } from 'lwc';

export default class CreateContactByQUickAction extends LightningElement {

    handleNameChange(event){
        this.accountRecord.Name = event.target.value;
        //window.console.log(this.accountRecord.Name);
      }
     
      
     
       handlePhoneChange(event){
         this.accountRecord.Phone = event.target.value;
         //window.console.log(this.accountRecord.Phone);
       }
     
    handleSaveAccount(){
        
        }
    

}