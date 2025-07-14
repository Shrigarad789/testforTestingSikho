import { LightningElement, track } from 'lwc';
import getAccountsForCombobox from '@salesforce/apex/comboboxWithDatatableLWCClass.getAccountsForCombobox';
import getContacts from '@salesforce/apex/comboboxWithDatatableLWCClass.getContacts'; 
export default class ComboboxWithDatatableLWC extends LightningElement {
    @track value = '';  // Track the selected value
    @track optionsArray = [];  // Store options for the combobox
    @track cardVisible = false;  // Used for show/hide card functionality
    @track data = [];  // Used for storing contact details in the data table

    // Define columns for lightning-datatable inside the class
    columns = [
        { label: 'Contact Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' }
    ];

    // Getter to return the options array
    get options() {
        return this.optionsArray;
    }

    // Fetch Accounts from Apex when the component is initialized
    connectedCallback() {
        getAccountsForCombobox()
            .then(result => {
                let arr = [];  // Array to store accounts in label-value pair
                for (let i = 0; i < result.length; i++) {  
                    // Push account Name as label and Id as value into arr[]
                    arr.push({ label: result[i].Name, value: result[i].Id });
                }
                this.optionsArray = arr;  // Assign the array to optionsArray
            })
            .catch(error => {
                console.error("Error fetching accounts:", error);
            });
    }

    // Get selected Account recordId
    handleChangedValue(event) {
        // Whenever an account is selected in combobox, then "cardVisible" will become true and the contact data table will show
        this.cardVisible = true;
        this.value = event.detail.value;
        // window.alert(this.value);  // Use the value directly
        //call apex method to get contacts
        getContacts({ selectedAccountId: this.value })
        .then(result => {
            this.data = result;
        })
        .catch(error => {
             window.alert("Error fetching contacts:", error);
        });
    }
}