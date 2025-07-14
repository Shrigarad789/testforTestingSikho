import { LightningElement, track, wire } from 'lwc';
import getAvailableProducts from '@salesforce/apex/CartController2.getAvailableProducts';
import addCartItemsBulk from '@salesforce/apex/CartController2.addCartItemsBulk';

export default class MassUploadCart extends LightningElement {
    @track cartItems = [];
    @track products = [];
    @track filteredProducts = [];
    @track paginatedProducts = [];
    @track currentPage = 1;
    @track pageSize = 5;
    @track showCheckout = false;
    @track showCheckoutForm = false;

    pageSizeOptions = [
        { label: '5', value: 5 },
        { label: '10', value: 10 },
        { label: '15', value: 15 }
    ];

    @wire(getAvailableProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.filteredProducts = data;
            this.updatePaginatedProducts();
        } else if (error) {
            console.error('Error:', error);
        }
    }

    get hasItemsInCart() {
        return this.cartItems.length > 0;
    }

    get totalPages() {
        return Math.ceil(this.filteredProducts.length / this.pageSize);
    }

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    get totalQuantity() {
        return this.cartItems.reduce((sum, item) => sum + item.Quantity__c, 0);
    }

    handleAddProduct(event) {
        const name = event.target.dataset.name;
        const existing = this.cartItems.find(item => item.Product_Name__c === name);
        if (!existing) {
            this.cartItems = [...this.cartItems, { Product_Name__c: name, Quantity__c: 1 }];
        }
    }

    handleRemoveItem(event) {
        const name = event.target.dataset.name;
        this.cartItems = this.cartItems.filter(item => item.Product_Name__c !== name);
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (!file || !file.name.endsWith('.csv')) {
            alert('Please upload a valid CSV file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            let csv = e.target.result;
            if (csv.charCodeAt(0) === 0xFEFF) csv = csv.slice(1);
            const lines = csv.split(/\r\n|\n/).filter(line => line.trim() !== '');
            const parsedItems = [];

            lines.forEach((line, index) => {
                if (index === 0 && line.toLowerCase().includes('product')) return;
                const [productName, quantityStr] = line.split(',').map(s => s.trim());
                const quantity = parseInt(quantityStr, 10);
                if (productName && Number.isInteger(quantity)) {
                    parsedItems.push({ Product_Name__c: productName, Quantity__c: quantity });
                }
            });

            this.cartItems = [...this.cartItems, ...parsedItems];
        };
        reader.readAsText(file);
    }

    handleAddToCart() {
        if (!this.cartItems.length) {
            alert('Cart is empty.');
            return;
        }

        addCartItemsBulk({ items: this.cartItems })
            .then(() => {
                this.showCheckout = true;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error adding items: ' + (error.body?.message || error.message));
            });
    }

    callCheckoutForm() {
        this.showCheckoutForm = true;
    }

    handleOrderPlaced() {
        this.cartItems = [];
        this.showCheckout = false;
        this.showCheckoutForm = false;
    }

    handleBackToCart() {
        this.showCheckout = false;
    }

    handleSearchChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredProducts = this.products.filter(prod =>
            prod.Name?.toLowerCase().includes(searchKey)
        );
        this.currentPage = 1;
        this.updatePaginatedProducts();
    }

    handlePageSizeChange(event) {
        this.pageSize = parseInt(event.detail.value, 10);
        this.currentPage = 1;
        this.updatePaginatedProducts();
    }

    handlePreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedProducts();
        }
    }

    handleNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePaginatedProducts();
        }
    }

    updatePaginatedProducts() {
        const startIdx = (this.currentPage - 1) * this.pageSize;
        const endIdx = startIdx + this.pageSize;
        this.paginatedProducts = this.filteredProducts.slice(startIdx, endIdx);
    }
}
