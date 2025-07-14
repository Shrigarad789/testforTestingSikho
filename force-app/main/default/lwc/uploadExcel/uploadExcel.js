import { LightningElement, api } from 'lwc';
import processExcelFile from '@salesforce/apex/CartController.processExcelFile';

export default class UploadExcel extends LightningElement {
    @api cartId;

    handleUploadFinished(event) {
        const uploadedFile = event.detail.files[0];
        processExcelFile({ contentVersionId: uploadedFile.documentId })
            .then(() => {
                // Notify parent to refresh CartIcon and MyCart
                const cartUpdateEvent = new CustomEvent('cartupdated');
                this.dispatchEvent(cartUpdateEvent);

                // Hide this component (optional)
                this.template.host.style.display = 'none';
            })
            .catch(error => {
                console.error('Error processing Excel:', error);
            });
    }
}