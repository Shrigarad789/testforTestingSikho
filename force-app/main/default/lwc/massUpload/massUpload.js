import { LightningElement } from 'lwc';
import uploadCSVData from '@salesforce/apex/MassUploadController.uploadCSVData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MassUpload extends LightningElement {
    isLoading = false;

    // Triggered when file is selected
    handleFileChange(event) {
        const file = event.target.files[0];

        if (file && file.name.toLowerCase().endsWith('.csv')) {
            this.readFile(file);
        } else {
            this.showToast('Error', 'Please upload a valid CSV file.', 'error');
        }
    }

    // Reads the file as base64
    readFile(file) {
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            this.uploadToServer(file.name, base64);
        };

        reader.onerror = () => {
            this.showToast('Error', 'Error reading file.', 'error');
        };

        reader.readAsDataURL(file);
    }

    // Upload file data to Apex
    uploadToServer(fileName, base64Data) {
        this.isLoading = true;

        uploadCSVData({ fileName, base64Data })
            .then(() => {
                this.showToast('Success', 'Products uploaded and added to cart successfully.', 'success');
            })
            .catch(error => {
                console.error('Upload failed:', error);
                this.showToast('Error', error.body?.message || 'Upload failed.', 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    // Reusable toast utility
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}