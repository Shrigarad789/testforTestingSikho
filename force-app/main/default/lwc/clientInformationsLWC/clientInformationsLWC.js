import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'; // UI API createRecord
import CLIENT_INFORMATION_OBJECT from '@salesforce/schema/Client_Information__c'; // Custom Object Schema

export default class ClientInformationsLWC extends LightningElement {
    name = '';
    phone = '';
    email = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleSubmit() {
        // Directly passing field API names as strings
        const fields = {
            Name: this.name,        // 'Name' is the API name of the field
            Phone__c: this.phone,   // 'Phone__c' is the API name of the field
            Email__c: this.email    // 'Email__c' is the API name of the field
        };

        const recordInput = { 
            apiName: CLIENT_INFORMATION_OBJECT.objectApiName,  // Using objectApiName for object API name
            fields 
        };

        createRecord(recordInput)
            .then(result => {
                console.log('Record Created: ', result);
                // Handle successful record creation
            })
            .catch(error => {
                console.error('Error creating record: ', error);
                // Handle error
            });
    }
}