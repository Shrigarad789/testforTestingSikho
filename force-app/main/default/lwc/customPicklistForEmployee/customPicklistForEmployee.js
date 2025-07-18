import { LightningElement,track,wire } from 'lwc';
import getEmployeeData from "@salesforce/apex/EmployeeTriggerHandler.getEmployeeList";
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

import ACCOUNT_OBJECT from '@salesforce/schema/Employee__c';
import TYPE_FIELD from '@salesforce/schema/Employee__c.State__c';
 import Country_FIELD from '@salesforce/schema/Employee__c.Country__c';
import {  getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues} from 'lightning/uiObjectInfoApi';

const columns = [
{
    label: 'Name',
    fieldName: 'Empo_Name__c',
    type: 'text',
}, {
    label: 'Phone',
    fieldName: 'Phone__c',
    type: 'phone',
    editable: true,
}, {
    label: 'Email',
    fieldName: 'Email__c',
    type: 'email',
    editable: true,
}, {
    label: 'Adhar Number',
    fieldName: 'E_Adhar_Number__c',
    type: 'text',
    editable: true
}
, {
    label: 'State', fieldName: 'State__c', type: 'picklistColumn', editable: true, typeAttributes: {
        placeholder: 'Choose Type', options: { fieldName: 'pickListOptions' }, 
        value: { fieldName: 'Type' }, // default value for picklist,
        context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
    }
},{
    label: 'State', fieldName: 'Country__c', type: 'picklistColumn1', editable: true, typeAttributes: {
        placeholder: 'Choose Type', options: { fieldName: 'pickListOptions1' }, 
        value: { fieldName: 'Type' }, // default value for picklist,
        context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
    }
}

];

export default class CustomPicklistForEmployee extends LightningElement {
columns = columns;
showSpinner = false;
@track data = [];
@track accountData;
    @track draftValues = [];
lastSavedData = [];
@track pickListOptions;
@track pickListOptions1;


@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
objectInfo;

//fetch picklist options for state
@wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: TYPE_FIELD
})



wirePickList({ error, data }) {
    if (data) {
        this.pickListOptions = data.values;
    } else if (error) {
        console.log(error);
    }
}

//here I pass picklist option so that this wire method call after above method
@wire(getEmployeeData, { pickList: '$pickListOptions' })
accountData(result) {
    this.accountData = result;
    if (result.data) {
        this.data = JSON.parse(JSON.stringify(result.data));

        this.data.forEach(ele => {
            ele.pickListOptions = this.pickListOptions;
        })

        this.lastSavedData = JSON.parse(JSON.stringify(this.data));

    } else if (result.error) {
        this.data = undefined;
    }
};


//fetch picklist options for Country
@wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: Country_FIELD
})



wirePickList({ error, data }) {
    if (data) {
        this.pickListOptions1 = data.values;
    } else if (error) {
        console.log(error);
    }
}

//here I pass picklist option so that this wire method call after above method
@wire(getEmployeeData, { pickList: '$pickListOptions1' })
accountData(result) {
    this.accountData = result;
    if (result.data) {
        this.data = JSON.parse(JSON.stringify(result.data));

        this.data.forEach(ele => {
            ele.pickListOptions1 = this.pickListOptions1;
        })

        this.lastSavedData = JSON.parse(JSON.stringify(this.data));

    } else if (result.error) {
        this.data = undefined;
    }
};


updateDataValues(updateItem) {
    let copyData = JSON.parse(JSON.stringify(this.data));

    copyData.forEach(item => {
        if (item.Id === updateItem.Id) {
            for (let field in updateItem) {
                item[field] = updateItem[field];
            }
        }
    });

    //write changes back to original data
    this.data = [...copyData];
}

updateDraftValues(updateItem) {
    let draftValueChanged = false;
    let copyDraftValues = [...this.draftValues];
    //store changed value to do operations
    //on save. This will enable inline editing &
    //show standard cancel & save button
    copyDraftValues.forEach(item => {
        if (item.Id === updateItem.Id) {
            for (let field in updateItem) {
                item[field] = updateItem[field];
            }
            draftValueChanged = true;
        }
    });

    if (draftValueChanged) {
        this.draftValues = [...copyDraftValues];
    } else {
        this.draftValues = [...copyDraftValues, updateItem];
    }
}

//handler to handle cell changes & update values in draft values
handleCellChange(event) {
    //this.updateDraftValues(event.detail.draftValues[0]);
    let draftValues = event.detail.draftValues;
    draftValues.forEach(ele=>{
        this.updateDraftValues(ele);
    })
}

handleSave(event) {
    this.showSpinner = true;
    this.saveDraftValues = this.draftValues;

    const recordInputs = this.saveDraftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });

    // Updateing the records using the UiRecordAPi
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    Promise.all(promises).then(res => {
        this.showToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
        this.draftValues = [];
        return this.refresh();
    }).catch(error => {
        console.log(error);
        this.showToast('Error', 'An Error Occured!!', 'error', 'dismissable');
    }).finally(() => {
        this.draftValues = [];
        this.showSpinner = false;
    });
}

handleCancel(event) {
    //remove draftValues & revert data changes
    this.data = JSON.parse(JSON.stringify(this.lastSavedData));
    this.draftValues = [];
}

showToast(title, message, variant, mode) {
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(evt);
}

// This function is used to refresh the table once data updated
async refresh() {
    await refreshApex(this.accountData);
}
}