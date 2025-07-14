import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import SHEETJS from '@salesforce/resourceUrl/sheetjs';
import saveCartAndCartItems from '@salesforce/apex/MassUploadController.saveCartAndCartItems';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UploadMass extends LightningElement {
    file;
    sheetJsInitialized = false;
    @track parsedItems = [];
    isAddDisabled = true;

    renderedCallback() {
        if (this.sheetJsInitialized) return;
        this.sheetJsInitialized = true;

        loadScript(this, SHEETJS)
            .then(() => console.log('✅ SheetJS loaded'))
            .catch(error => console.error('❌ Error loading SheetJS:', error));
    }

    handleFileChange(event) {
        this.file = event.target.files[0];
        if (this.file && this.file.name.endsWith('.xlsx')) {
            this.isAddDisabled = false;
            this.showToast('Success', 'File selected. Click "Add to Cart" to parse.', 'info');
        } else {
            this.file = null;
            this.isAddDisabled = true;
            this.showToast('Error', 'Please upload a valid .xlsx file', 'error');
        }
    }

    // handleAddToCart() {
    //     if (!this.file) {
    //         this.showToast('Error', 'Please select an Excel file first.', 'error');
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onload = async (e) => {
    //         try {
    //             const data = new Uint8Array(e.target.result);
    //             const workbook = XLSX.read(data, { type: 'array' });
    //             const sheet = workbook.Sheets[workbook.SheetNames[0]];
    //             const jsonData = XLSX.utils.sheet_to_json(sheet);

    //             if (jsonData.length === 0) {
    //                 this.showToast('Warning', 'Excel file is empty.', 'warning');
    //                 return;
    //             }

    //             // Map the Excel columns to Salesforce API fields
    //             this.parsedItems = jsonData.map(row => ({
    //                 'Product Name': row['Product Name'],
    //                 'Quantity': row['Quantity']
    //             }));
                
                

    //             this.dispatchEvent(new CustomEvent('cartupdated', {
    //                 detail: { items: this.parsedItems }
    //             }));

    //             this.showToast('Success', 'Products loaded into cart (not saved yet).', 'success');
    //         } catch (error) {
    //             this.showToast('Error', 'Failed to parse Excel file.', 'error');
    //             console.error(error);
    //         }
    //     };
    //     reader.readAsArrayBuffer(this.file);
    // }
    handleAddToCart() {
        if (!this.file) {
            this.showToast('Error', 'Please select an Excel file first.', 'error');
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
    
                if (jsonData.length === 0) {
                    this.showToast('Warning', 'Excel file is empty.', 'warning');
                    return;
                }
    
                // 👇 Don't rename keys here — keep them as Excel headers
                this.parsedItems = jsonData;
    
                // ✅ Log to verify
                console.log('✅ Parsed Items:', JSON.stringify(this.parsedItems));
    
                this.dispatchEvent(new CustomEvent('cartupdated', {
                    detail: { items: this.parsedItems }
                }));
    
                this.showToast('Success', 'Products loaded into cart (not saved yet).', 'success');
            } catch (error) {
                this.showToast('Error', 'Failed to parse Excel file.', 'error');
                console.error(error);
            }
        };
        reader.readAsArrayBuffer(this.file);
    }
    

    async processExcel() {
        if (this.parsedItems.length === 0) {
            this.showToast('Error', 'No items to process. Use "Add to Cart" first.', 'error');
            return;
        }

        try {
            await saveCartAndCartItems({ items: JSON.stringify(this.parsedItems) });
            this.showToast('Success', 'Products saved to server.', 'success');
        } catch (error) {
            this.showToast('Error', 'Error saving to server.', 'error');
            console.error(error);
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}