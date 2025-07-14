import { LightningElement, api,track } from 'lwc';
import updatePriceAsync from '@salesforce/apex/ProductPriceUpdater.updatePriceFromlwc';
export default class CustomActionButton extends LightningElement {
    @api recordId;
    @track isLoading = false;
    @track errorMessage;

    handleClick() {
        this.isLoading = true;
        this.errorMessage = null;
        console.log('Custom button clicked for record:', this.recordId);
        updatePriceAsync({ productId: this.recordId})
        .then(() => {
            this.isLoading = false;
            // Optionally, show a success message or refresh the page
            this.dispatchEvent(
                new CustomEvent('success', {
                    detail: 'Price updated successfully'
                })
            );
        })
        .catch(error => {
            this.isLoading = false;
            this.errorMessage = 'Error: ' + error.body.message;
        });
}
    }