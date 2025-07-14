import { LightningElement, track } from 'lwc';
import getCartItems from '@salesforce/apex/CartController.getCartItems';
// You may also have import of uploadCsvApexMethod if needed

export default class ExcelUpload extends LightningElement {
    @track items = [];
    recordId; // Optional if needed

    handleUploadFinished(event) {
        // Assume you already process file and create CartItem__c records through Apex
        // After upload is successful, call refresh cart

        this.refreshCartItems();
    }

    refreshCartItems() {
        getCartItems()
            .then(result => {
                this.items = result;
                console.log('Cart Items refreshed:', this.items);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }
}
