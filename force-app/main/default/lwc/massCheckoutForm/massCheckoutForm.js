import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MassCheckoutForm extends LightningElement {
    customerName = '';
    phone = '';
    email = '';
    billingAddress = '';
    shippingAddress = '';

    handleChange(event) {
        const field = event.target.name;
        this[field] = event.target.value;
    }

    handlePlaceOrder() {
        // Simulate successful form submission
        this.dispatchEvent(new ShowToastEvent({
            title: 'Order Placed',
            message: 'Your order has been placed (Visual only).',
            variant: 'success'
        }));

        // Optionally dispatch custom event to notify parent
        this.dispatchEvent(new CustomEvent('orderplaced'));
    }
}