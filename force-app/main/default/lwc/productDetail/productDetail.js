import { LightningElement, api, track } from 'lwc';
import updatePriceAsync from '@salesforce/apex/ProductPriceUpdater.updatePriceFromlwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createDataConnector } from 'lightning/analyticsWaveApi';
import addItemToCart from '@salesforce/apex/CartController.addItemToCart';
export default class ProductDetail extends LightningElement {
    @api product;
    @track isLoading = false;

    handleBack() {
        this.dispatchEvent(new CustomEvent('back'));
    }

    handleUpdatePrice() {
        this.isLoading = true;

        updatePriceAsync({ productId: this.product.Id })
            .then(() => {
                this.showToast('Success', 'Price updated successfully', 'success');

                // Optionally tell parent to refresh product record
                this.dispatchEvent(new CustomEvent('refresh'));
            })
            .catch(error => {
                const message = error?.body?.message || 'An unknown error occurred';
                this.showToast('Error', message, 'error');
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
// for add to card 
handleAddToCart() {
    console.log('🛒 Add to Cart clicked:', this.product);

    if (!this.product || !this.product.Id) {
        this.showToast('Error', 'Product is missing or invalid', 'error');
        return;
    }

    addItemToCart({ productId: this.product.Id })
        .then(() => {
            console.log('✅ Successfully added to cart');
            this.showToast('Success', `${this.product.Name} added to cart`, 'success');
            this.dispatchEvent(new CustomEvent('addedtocart', { detail: this.product }));
        })
        .catch(error => {
            const message = error?.body?.message || 'An unknown error occurred';
            console.error('❌ Add to cart error:', message);
            this.showToast('Error', message, 'error');
        });
}


handleBuyNow() {
    console.log('Buy Now button clicked for:', this.product.Name);

    alert('Proceeding to Buy Now for: ' + this.product.Name);
}

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}