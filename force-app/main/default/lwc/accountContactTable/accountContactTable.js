import { LightningElement ,wire,track,api} from 'lwc'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { refreshApex } from '@salesforce/apex';

import ContacttList from '@salesforce/apex/ContactQuery.ContacttList';

export default class AccountContactTable extends LightningElement {
    @api recordId;

    newCreate = false;

    records = ''; 

    data;

    error;

    wiredActivities;

    keyIndex = 0;

    AccountId;

    @track itemList = [

        {

            id: 0,

        }

    ];

    @wire(ContacttList,{

        AccId: '$recordId'

    })

    wiredclass(value){

        this.wiredActivities = value;

        const { data, error } = value;

    if(data){

        let dataEditing = JSON.parse(JSON.stringify(data));

        this.records = dataEditing.length;

        this.data = dataEditing;

        }else if(error){

        this.error = error;

        }

    }

    handleOpenModal(){

        this.newCreate= true;

        this.AccountId = this.recordId;

    }

    closeModal(){

        this.newCreate = false;

    }

    addRow(event) {

        let currentIndex = event.target.dataset.index;

        this.keyIndex++;

        this.itemList[currentIndex].showAddIcon = false;

        var newItem = [{ id: this.keyIndex }];

        this.itemList = this.itemList.concat(newItem);

    }

    removeRow(event) {

        if (this.itemList.length >= 2) {

            this.itemList = this.itemList.filter(function (element) {

                return parseInt(element.id) !== parseInt(event.target.accessKey);

            });

        }

    }

    @api 

    handleSubmit() {

        var isVal = true;

        this.template.querySelectorAll('lightning-input-field').forEach(element => {

            isVal = isVal && element.reportValidity();

        })

        if (isVal) {

            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {

                element.submit();

            });

            this.dispatchEvent(

                new ShowToastEvent({

                    title: 'Success',

                    message: 'successfully created',

                    variant: 'success',

                }),

            );

            this.newCreate = false;

            if(this.newCreate == false){

                this.itemList.length = 1;

            }

            return refreshApex(this.wiredActivities); 

        } else {

            this.dispatchEvent(

                new ShowToastEvent({

                    title: 'Error creating record',

                    message: 'Please enter all the required fields',

                    variant: 'error',

                }),

            );

        }
    }
    
}