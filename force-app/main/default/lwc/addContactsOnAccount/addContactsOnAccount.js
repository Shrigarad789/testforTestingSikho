import { LightningElement ,api,wire} from 'lwc';
import fetchSobject from '@salesforce/apex/ContactQuery.fetchSobject';
export default class AddContactsOnAccount extends LightningElement {
    @api recordId;
    CaseRec;
    CaseColumns = [];
    ContactRec; 
    ContactColumns;

    @wire(fetchSobject,{
        RecordId : '$recordId'
    })lstObjects({error,data}){
        if(data){
            var CaseCol = [];
            var conCol=[];

         console.log('data===> ' + JSON.stringify(data));
         let lstSobject = JSON.parse(JSON.stringify(data));
         var lstContact =  lstSobject.lstContact;
         var lstCase =  lstSobject.lstCase;

         for(let Rec in lstCase[0]){
            CaseCol.push( { label: Rec, fieldName: Rec });
        }
       this.CaseColumns = CaseCol;
       this.CaseRec = lstCase;

    

         for(let Rec in lstContact[0]){
                conCol.push( { label: Rec, fieldName: Rec });
            }
           this.ContactColumns = conCol;
           this.ContactRec = lstContact;

        }
        else if(error){
            console.log('error===> ' + JSON.stringify(error));
        }

    }
}