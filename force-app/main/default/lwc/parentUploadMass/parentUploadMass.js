import { LightningElement, track } from 'lwc';

export default class ParentUploadMass extends LightningElement {
    @track cartItems = [];
    @track cartCount = 0;
    @track showCart = false;

    handleExcelParsed(event) {
        // Handle parsed items from child but do not add to cart yet
        this.parsedItems = event.detail.items;
    }

    handleCartUpdated(event) {
        this.cartItems = event.detail.items;
        this.cartCount = this.cartItems.length;
    }

    toggleCartView() {
        this.showCart = !this.showCart;
    }
}