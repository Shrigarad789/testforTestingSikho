import { LightningElement, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getAllProducts';

export default class ProductList extends LightningElement {
    @track products = [];
    @track filteredProducts = [];
    @track paginatedProducts = [];
    @track page = 1;
    @track pageSize = 10;
    @track searchKey = '';
    @track sortDirection = 'asc';
    @track sortedBy = 'Name';

    pageSizeOptions = [
        { label: '5', value: 5 },
        { label: '7', value: 7 },
        { label: '10', value: 10 }
    ];

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.filteredProducts = [...data];
            this.updatePaginatedList();
        } else if (error) {
            console.error('Error fetching products', error);
        }
    }

    get totalPages() {
        return Math.ceil(this.filteredProducts.length / this.pageSize);
    }

    get isFirstPage() {
        return this.page <= 1;
    }

    get isLastPage() {
        return this.page >= this.totalPages;
    }

    get isSortedBy() {
        return {
            Name: this.sortedBy === 'Name',
            // ProductCode: this.sortedBy === 'ProductCode',
            Price_c__c: this.sortedBy === 'Price_c__c',
            Product_Type__c: this.sortedBy === 'Product_Type__c',
            CreatedDate: this.sortedBy === 'CreatedDate'
        };
    }

    get sortDirectionSymbol() {
        return this.sortDirection === 'asc' ? '↑' : '↓';
    }

    handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.page = 1;
        this.filterProducts();
    }

    handlePageSizeChange(event) {
        this.pageSize = parseInt(event.detail.value, 10);
        this.page = 1;
        this.updatePaginatedList();
    }

    handleNext() {
        if (this.page < this.totalPages) {
            this.page++;
            this.updatePaginatedList();
        }
    }

    handlePrevious() {
        if (this.page > 1) {
            this.page--;
            this.updatePaginatedList();
        }
    }

    sortBy(field) {
        const isAsc = this.sortedBy === field && this.sortDirection === 'asc';
        this.sortDirection = isAsc ? 'desc' : 'asc';
        this.sortedBy = field;

        this.filteredProducts.sort((a, b) => {
            const aVal = a[field] || '';
            const bVal = b[field] || '';
            if (aVal === bVal) return 0;
            return (this.sortDirection === 'asc' ? 1 : -1) * (aVal > bVal ? 1 : -1);
        });

        this.page = 1;
        this.updatePaginatedList();
    }
//commented the product code from sorting
    sortByName = () => this.sortBy('Name');
    // sortByCode = () => this.sortBy('ProductCode');
    sortByPrice = () => this.sortBy('Price_c__c');
    sortByType = () => this.sortBy('Product_Type__c');
    sortByCreatedDate = () => this.sortBy('CreatedDate');

    filterProducts() {
        if (!this.searchKey) {
            this.filteredProducts = [...this.products];
        } else {
            const search = this.searchKey;
            this.filteredProducts = this.products.filter(product =>
                (product.Name && product.Name.toLowerCase().includes(search)) ||
                (product.ProductCode && product.ProductCode.toLowerCase().includes(search)) ||
                (product.Price_c__c && product.Price_c__c.toString().includes(search)) ||
                (product.Product_Type__c && product.Product_Type__c.toLowerCase().includes(search)) ||
                (product.CreatedDate && product.CreatedDate.toString().includes(search))
            );
        }
        console.log('Filtered Products:', this.filteredProducts)
        this.updatePaginatedList();
    }

    updatePaginatedList() {
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedProducts = this.filteredProducts.slice(start, end);
    }

    handleViewProduct(event) {
        const productId = event.target.dataset.id;
        const selectedProduct = this.products.find(product => product.Id === productId);
        this.dispatchEvent(new CustomEvent('productselected', { detail: selectedProduct }));
    }
    
}