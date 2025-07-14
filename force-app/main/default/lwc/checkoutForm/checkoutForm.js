import { LightningElement, api } from 'lwc';
import createCheckoutRecord from '@salesforce/apex/CheckoutController.createCheckoutRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CheckoutForm extends LightningElement {
    @api cartId;
    @api totalAmount;

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
        createCheckoutRecord({
            name: 'Checkout - ' + Date.now(),
            customerName: this.customerName,
            phone: this.phone,
            email: this.email,
            cartId: this.cartId,
            billingAddress: this.billingAddress,
            shippingAddress: this.shippingAddress
        })
        .then(() => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Order Placed',
                message: 'Your order has been placed successfully!',
                variant: 'success'
            }));
            this.dispatchEvent(new CustomEvent('orderplaced'));
        })
        .catch(error => {
            console.error(error);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Something went wrong!',
                variant: 'error'
            }));
        });
    }
}