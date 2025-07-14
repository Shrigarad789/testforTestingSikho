import { LightningElement, api,track } from 'lwc';
import createContract from '@salesforce/apex/ContractController.createContract';
import { NavigationMixin } from 'lightning/navigation';
export default class ToggleButtonOutput extends NavigationMixin(LightningElement) {

    @api recordId; // Account ID
    @track contentDocumentIds = []; // To store uploaded file IDs

    contractName = '';
    contractStartDate = null;

    handleFileUpload(event) {
        // Capture ContentDocumentId of the uploaded file
        const uploadedFiles = event.detail.files;
        uploadedFiles.forEach(file => {
            this.contentDocumentIds.push(file.documentId);
        });
    }

    handleNameChange(event) {
        this.contractName = event.target.value;
    }

    handleDateChange(event) {
        this.contractStartDate = event.target.value;
    }

    handleSave() {
        createContract({
            accountId: this.recordId,
            name: this.contractName,
            startDate: this.contractStartDate,
            contentDocumentIds: this.contentDocumentIds
        })
        .then(result => {
            console.log('Contract created successfully', result);
            // Close the window by navigating to the previous page or home
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.recordId,
                    objectApiName: 'Account',
                    actionName: 'view'
                }
            });
            // Alternatively, navigate to the home page:
            // this[NavigationMixin.Navigate]({
            //     type: 'standard__objectPage',
            //     attributes: {
            //         objectApiName: 'Account',
            //         actionName: 'home'
            //     }
            // });
        })
        .catch(error => {
            console.error('Error creating contract', error);
            // Handle errors here, possibly using a toast to display the error message
        });
    }
    

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg'];
    }
}