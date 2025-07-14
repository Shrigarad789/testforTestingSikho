import { LightningElement, api, wire, track } from 'lwc';
import getCampaignMembersForAccount from '@salesforce/apex/MulSelCampaignMembersControllerAcc.getCampaignMembersForAccount';
import updateCampaignMemberStatus from '@salesforce/apex/MulSelCampaignMembersControllerAcc.updateCampaignMemberStatus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getRecordNotifyChange } from "lightning/uiRecordApi";

export default class MultiSelectCampaignMembersOnAccount extends LightningElement {

    @api recordId;
    @track items = [];
    @track memberList = [];
    @track memberSet = new Set();
    @track error;
    @track checkboxArray = [];
    @track selectedCheckboxCount = 0
    @track _wiredResult;
    @track isLoading = false;
    @api isChecked;
    @track options = [
        { label: 'Qualified', value: 'Qualified' },
        { label: 'Disqualified', value: 'Disqualified' }
    ];


    connectedCallback() {
        this.isChecked = false;
    }

    @wire(getCampaignMembersForAccount, { accountId: '$recordId' })
    wiredCampaignMembers(result) {
        this._wiredResult = result;
        this.isLoading = true;
        if (result.data) {
            this.items = result.data.map(item => ({ ...item, isSelected: false }));
            this.selectedCheckboxCount = 0;
            this.checkboxArray = [];
            this.error = undefined;
            this.isLoading = false;
            
            refreshApex(this._wiredResult);
        } else if (result.error) {
            console.error('Error fetching data:', error);
            this.error = error;
            this.items = undefined;
            this.isLoading = false;
        }else{
            console.error('Error fetching data: No data');
            this.items = undefined;
            this.isLoading = false;
        }
    }

    handleAllSelected(event) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].isSelected = event.target.checked;
            if (this.items[i].isSelected == true) {
                if (!this.checkboxArray.includes(this.items[i].Id)) {
                    this.checkboxArray.push(this.items[i].Id);
                }
                this.selectedCheckboxCount = this.checkboxArray.length;
            } else {
                this.checkboxArray.pop(this.items[i].Id);
                this.selectedCheckboxCount = this.checkboxArray.length;
            }
        }
    }

    handleCheckboxSelect(event) {

        this.items[event.target.accessKey].isSelected = event.target.checked;
        if (this.items[event.target.accessKey].isSelected == true) {
            this.checkboxArray.push(this.items[event.target.accessKey].Id);

            this.selectedCheckboxCount = this.checkboxArray.length;
            if (this.items.length == this.checkboxArray.length) {
                this.selectedCheckboxCount = this.checkboxArray.length
                this.isChecked = true;
                let selectedRow = this.template.querySelector('lightning-input[data-key="allCheckbox"]');
                if (this.isChecked) {
                    selectedRow.checked = true;
                } else {
                    selectedRow.checked = false;
                }
            }
        } else {
            this.isChecked = false;
            let selectedRow = this.template.querySelector('lightning-input[data-key="allCheckbox"]');
            if (this.isChecked) {
                selectedRow.checked = true;
            } else {
                selectedRow.checked = false;
            }

            this.checkboxArray.pop(this.items[event.target.accessKey].Id);
            this.selectedCheckboxCount = this.checkboxArray.length;
            if (this.checkboxArray.length == 0) {
                this.selectedCheckboxCount = this.checkboxArray.length;
            }
        }
    }

    handlePicklistChange(event) {
        this.items[event.target.accessKey].Status = event.detail.value;
    }
    handleTextChange(event) {
        this.items[event.target.accessKey].Notes = event.detail.value;
    }
    
    handleSave(event) {
        this.memberList=[];
        this.memberSet = new Set();
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].isSelected == true) {
                const element = this.template.querySelector(`lightning-combobox[accesskey="${this.items[i].CampaignIndex}"]`);
                if (element.value == 'New' || element.value == 'Working') {
                    element.setCustomValidity("Status is required");
                    element.reportValidity();
                    return null;
                }
                if (!this.memberSet.has(this.items[i].Id)) {
                    this.memberList.push({
                        Id: this.items[i].Id,
                        Status: this.items[i].Status,
                        Notes__c: this.items[i].Notes
                    })
                    this.memberSet.add(this.items[i].Id);
                }
            }
        }
        if (this.memberList.length == 0) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: "Please select atleast one Campaign Member",
                variant: 'error'
            }));
            return null;
        }
        this.isLoading = true;

        updateCampaignMemberStatus({ CampaginMemberList: this.memberList })
            .then(() => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Campaign Members updated successfully.',
                    variant: 'success'
                }));

                this.dispatchEvent(new CloseActionScreenEvent());
                const recordIds = this.memberList.map(record => record.Id);
                recordIds.forEach(recordId => {
                    getRecordNotifyChange([{ recordId }]);
                });

                return refreshApex(this._wiredResult);
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error updating Campaign Members',
                    message: error.body.message,
                    variant: 'error'
                }));
            })
            .finally(() => {
                this.isLoading = false;
            });
    }


}