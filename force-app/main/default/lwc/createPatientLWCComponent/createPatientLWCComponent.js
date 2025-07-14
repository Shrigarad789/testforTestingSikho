import { LightningElement ,api,wire} from 'lwc';
import Apex_Method_One_Ref from "@salesforce/apex/Patientclass.m_Insert_A_Contact_Record";
//import getallAccount from '@salesforce/apex/Patientclass.allAccount';
import Account_Object from '@salesforce/schema/Patient__c';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import Industry_FIELD from '@salesforce/schema/Patient__c.Gender__c';
import State_FIELD from '@salesforce/schema/Patient__c.State__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CreatePatientLWCComponent extends  NavigationMixin(LightningElement){
    // account = '';
    // options = []
    // constructor() {
    //     super();
    //     this.getAccountInfo();
    // }
    // getAccountInfo() {
    //     getallAccount().then(item => {
    //         this.options = item.map(items => {
    //             return {
    //                 label: items.Name,
    //                 value: items.Id
    //             }
    //         })
    //     })
    // }
recordTypeId;
picklistValue;
picklistValues;
optionsArray;
optionsArrays;
selectedCricketerNationality;
selectedCricketerNationalitys;

@wire(getObjectInfo, { objectApiName: Account_Object })
objectInfos({data,error}){
if(error){
console.log('error:'+JSON.stringify(Error))
}
else if(data){
this.recordTypeId =data.defaultRecordTypeId;
console.log('this.recordTypeId:'+JSON.stringify(this.recordTypeId))

}
}
@wire(getPicklistValues,{ recordTypeId:'$recordTypeId', fieldApiName: Industry_FIELD })

natioalityFieldvalue({data,error}){
if(error){
console.log('error:'+JSON.stringify(Error))
}
else if(data){

let arr=[];

this.picklistValue =data.values;
        console.log('Picklist data'+JSON.stringify(this.picklistValue))

        this.picklistValue.forEach(  Element =>{
            arr.push({ label : Element.value, value : Element.value})
                
        })
        this.optionsArray = arr;
        console.log('optionsArray'+JSON.stringify(this.optionsArray))

}

}
@wire(getPicklistValues,{ recordTypeId:'$recordTypeId', fieldApiName: State_FIELD })

natioalityFieldvalues({data,error}){
if(error){
console.log('error:'+JSON.stringify(Error))
}
else if(data){

let arr=[];

this.picklistValues =data.values;
        console.log('Picklist data'+JSON.stringify(this.picklistValues))

        this.picklistValues.forEach(  Element =>{
            arr.push({ label : Element.value, value : Element.value})
                
        })
        this.optionsArrays = arr;
        console.log('optionsArrays'+JSON.stringify(this.optionsArrays))

}

}

 a_First_Name_Ref;
 a_Email_Ref;
 a_age_Ref;
  a_phone_Ref;
 a_gender_Ref;
 a_state_Ref;



 recordId;

handle_First_Name_Change(event) {
    this.a_First_Name_Ref = event.detail.value;
}
// handleChange(event) {
//     this.account = event.detail.value;
// }

    handle_Email_Change(event) {
    this.a_Email_Ref = event.detail.value;
}
handle_age_Change(event) {
    this.a_age_Ref = event.detail.value;
}
handle_phone_Change(event) {
    this.a_phone_Ref = event.detail.value;
}

handleOptionChange(event) {
    this.a_gender_Ref = event.detail.value;
}
handleOptionChanges(event) {
    this.a_state_Ref = event.detail.value;
}

handle_Submit(event){
        
    Apex_Method_One_Ref({ 
        Name : this.a_First_Name_Ref, 
        Email : this.a_Email_Ref,
        age  : this.a_age_Ref,
        Phone : this.a_phone_Ref,
        Gender : this.a_gender_Ref,
        State : this.a_state_Ref,

        // Doctorid :this.account         
        
    })
    .then(result => {
        const event = new ShowToastEvent({
            title: 'Patient created',
            message: 'Created Succesfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
    })
    then(()=>{
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Patient__c',
                actionName: 'View'
            },
        });
    })
    .catch(error => {
        const event = new ShowToastEvent({
            title : 'Error',
            message : 'Error creating Patient. Please Contact System Admin',
            variant : 'error'
        });
        this.dispatchEvent(event);
    });
}
}