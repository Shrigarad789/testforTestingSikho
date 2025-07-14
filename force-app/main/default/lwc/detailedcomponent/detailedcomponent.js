import { LightningElement,wire } from 'lwc';
import fetchpatient from '@salesforce/apex/Patientclass2.fetchpatient';
import { NavigationMixin } from 'lightning/navigation';
const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class Detailedcomponent extends  NavigationMixin ( LightningElement ){
    availablePatients;
    error;
    columns = columns;
    searchString;
    initialRecords;
 
    @wire( fetchpatient)  
    wiredAccount( { error, data } ) {
 
        if ( data ) {
 
            this.availablePatients = data;
            this.initialRecords = data;
            this.error = undefined;
 
        } else if ( error ) {
 
            this.error = error;
            this.availablePatients = undefined;
 
        }
 
    }
 
    handleRowAction( event ) {
 
const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
recordId: row.Id,
                        objectApiName: 'Patient__c ',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }
 
    }
}