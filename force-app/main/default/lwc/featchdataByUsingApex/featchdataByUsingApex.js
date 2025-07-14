import { LightningElement , track} from 'lwc';
import getAccountList from '@salesforce/apex/getRecordDataController.getAccountList';
export default class FeatchdataByUsingApex extends LightningElement {
  @track columns = [
        {
            label: 'Account Name',
            fieldName: 'Name',
            type: 'text'
        }
    ];

    @track accList;  // List to store fetched accounts
    @track error;    // Variable to store error message

    // Method to handle the button click and fetch account data
    handleFetchAccounts() {
        this.fetchAccountData();
    }
fetchAccountData(){
    getAccountList()
    .then(result=>{
this.accList=result;
    })
    .catch(error=>{
      this.error=  error;
    });
}











    // // Imperative Apex call to fetch account data
    // fetchAccountData() {
    //     getAccountList()
    //         .then(result => {
    //             this.accList = result; // On success, assign data to accList
    //         })
    //         .catch(error => {
    //             this.error = error; // On error, assign error to error variable
    //         });
    // }
}