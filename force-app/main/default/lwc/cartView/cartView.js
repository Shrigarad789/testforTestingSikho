import { LightningElement, track, wire } from 'lwc';
import getCurrentCart from '@salesforce/apex/CartController.getCurrentCart';

export default class CartView extends LightningElement {
    @track cartItems = [];
    @track totalAmount = 0;

    @wire(getCurrentCart)
    wiredCart({ error, data }) {
        if (data) {
            this.cartItems = data || [];

            this.totalAmount = this.cartItems.reduce(
                (sum, item) => sum + (item.Total__c || 0),
                0
            );
        } else if (error) {
            console.error('Error fetching cart:', error);
        }
    }
}