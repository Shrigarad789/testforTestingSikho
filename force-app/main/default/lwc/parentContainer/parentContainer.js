import { LightningElement, track } from 'lwc';

export default class ParentContainer extends LightningElement {
    @track showDetail = false;
    @track showCart = false;
    @track showCheckoutForm = false;
    @track cartItems = [];
    @track cartIdForCheckout;
    @track checkoutTotal;

    selectedProduct;

    // ✅ Getter for cart count to avoid length errors
    get cartCount() {
        return Array.isArray(this.cartItems) ? this.cartItems.length : 0;
    }

    // ✅ Toggle Cart Visibility
    toggleCart() {
        this.showCart = !this.showCart;
        this.showCheckoutForm = false;
    }

    // ✅ Handle Product Selection
    handleProductSelect(event) {
        this.selectedProduct = event.detail;
        this.showDetail = true;
        this.showCart = false;
    }

    // ✅ Handle Back Action
    handleBack() {
        this.showDetail = false;
    }

    // ✅ Handle Add to Cart
    handleAddToCart(event) {
        const selectedProduct = event.detail;
        const exists = this.cartItems.find(item => item.Id === selectedProduct.Id);
        if (!exists) {
            this.cartItems = [...this.cartItems, selectedProduct];
        }
    }

    // ✅ Handle Item Removal
    handleRemoveItem(event) {
        const itemId = event.detail.id;
        this.cartItems = this.cartItems.filter(item => item.Id !== itemId);
    }

    // ✅ Start Checkout Process
    handleCheckoutStart(event) {
        this.cartIdForCheckout = event.detail.cartId;
        this.checkoutTotal = event.detail.totalAmount;
        this.showCheckoutForm = true;
        this.showCart = false;
    }

    // ✅ Handle Order Placement
    handleOrderPlaced() {
        this.cartItems = [];
        this.showCheckoutForm = false;
        this.showCart = false;
    }
}