import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import CUSTOMER_ORDER_OBJECT from '@salesforce/schema/Customer_Order__c';
import COUNTRY_FIELD from '@salesforce/schema/Customer_Order__c.Country__c';
import FULL_NAME_FIELD from '@salesforce/schema/Customer_Order__c.Full_Name__c';
import PHONE_FIELD from '@salesforce/schema/Customer_Order__c.Phone_Number__c';
import ADDRESS_FIELD from '@salesforce/schema/Customer_Order__c.Address__c';

import { createRecord } from 'lightning/uiRecordApi';

export default class CreateCustomerOrder extends LightningElement {
    @track fullName = '';
    @track phoneNumber = '';
    @track address = '';
    @track country = '';
    @track countryOptions = [];
    @track recordId;
    @track error;

    // // Get object metadata
    // @wire(getObjectInfo, { objectApiName: CUSTOMER_ORDER_OBJECT })
    // objectInfo;
    @wire(getObjectInfo, { objectApiName: CUSTOMER_ORDER_OBJECT })
    wiredObjectInfo({ error, data }) {
        if (data) {
            console.log('Object Info:', data);
            this.recordTypeId = data.defaultRecordTypeId;
            console.log('Default Record Type Id:', this.recordTypeId);
        } else if (error) {
            console.error('Error getting object info:', error);
        }
    }
    // Get picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: COUNTRY_FIELD
    })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.countryOptions = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        } else if (error) {
            console.error('Error loading picklist values: ', error);
        }
    }

    handleFullNameChange(event) {
        this.fullName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phoneNumber = event.target.value;
    }

    handleAddressChange(event) {
        this.address = event.target.value;
    }

    handleCountryChange(event) {
        this.country = event.target.value;
    }

    createOrder() {
        const fields = {};
        fields[FULL_NAME_FIELD.fieldApiName] = this.fullName;
        fields[PHONE_FIELD.fieldApiName] = this.phoneNumber;
        fields[ADDRESS_FIELD.fieldApiName] = this.address;
        fields[COUNTRY_FIELD.fieldApiName] = this.country;

        const recordInput = { apiName: CUSTOMER_ORDER_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(record => {
                this.recordId = record.id;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error.body.message;
                this.recordId = undefined;
            });
    }
}