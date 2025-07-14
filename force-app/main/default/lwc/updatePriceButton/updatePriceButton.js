import { LightningElement, api,track } from 'lwc';
import updatePriceAsync from '@salesforce/apex/ProductPriceUpdater.updatePrice'; // Ensure you have the correct Apex method

export default class UpdatePriceButton extends LightningElement {
    @api recordId; // The product Id passed to the component
    @track isLoading = false;
    @track resultMessage = '';

    // This method is triggered by the existing button
    buttonClick() {
        this.isLoading = true;
        this.resultMessage = '';

        // Call the Apex method to update the price
        updatePriceAsync({ productId: this.recordId, productName: this.getProductName() })
            .then((response) => {
                this.isLoading = false;
                this.resultMessage = response; // Display the response from the Apex method
            })
            .catch((error) => {
                this.isLoading = false;
                this.resultMessage = 'Error: ' + error.body.message; // Display any error messages
            });
    }

    // This method is just for demonstration. Replace it with logic to fetch the product name dynamically if necessary
    getProductName() {
        return 'Some Product Name'; // Replace with actual logic to get the product name
    }
}