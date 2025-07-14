import { LightningElement ,api, track} from 'lwc';
import updatePriceAsync from '@salesforce/apex/ProductPriceUpdater.updatePriceFromlwc';
export default class UpdatePriceOnclick extends LightningElement {
    @api recordId; // product Id will be passed to the component
    @track isLoading = false;
    @track errorMessage;

    handleUpdatePrice() {
        this.isLoading = true;
        this.errorMessage = null;

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