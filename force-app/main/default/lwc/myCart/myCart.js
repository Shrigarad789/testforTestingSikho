import { LightningElement, api } from 'lwc';

export default class MyCart extends LightningElement {
    @api items = [];

    get totalAmount() {
        return this.items.reduce((sum, item) => sum + (item.Price_c__c || 0), 0);
    }

    handleRemove(event) {
        const itemId = event.target.dataset.id;
        this.dispatchEvent(new CustomEvent('removeitem', {
            detail: { id: itemId },
            bubbles: true,
            composed: true
        }));
    }
    handleCheckout() {
        // Dispatch event to parent to show CheckoutForm
        this.dispatchEvent(new CustomEvent('checkoutstart', {
            detail: {
                cartId: this.items[0]?.Cart_E__c, // assuming all items belong to same cart
                totalAmount: this.totalAmount
            }
        }));
    }
}