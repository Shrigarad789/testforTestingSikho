import { LightningElement, api } from 'lwc';
import handleFileUpload from '@salesforce/apex/MassUploadController.handleFileUpload';

export default class MassUploadComponent extends LightningElement {
    @api recordId;

    handleUploadFinished(event) {
        const fileId = event.detail.files[0].documentId;

        // Call Apex to process the file and insert products
        handleFileUpload({ fileId })
            .then(result => {
                console.log('File processed successfully');
                this.dispatchEvent(new CustomEvent('datauploaded', {
                    detail: { uploadedData: result }
                }));
            })
            .catch(error => {
                console.error('Error uploading file', error);
            });
    }
}