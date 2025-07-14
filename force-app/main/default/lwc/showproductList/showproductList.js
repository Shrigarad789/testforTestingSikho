import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import PRODUCT_MESSAGE_CHANNEL from '@salesforce/messageChannel/ProductMessageChannel__c';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ShowProductList extends LightningElement {
    products;
    error;
    initialProducts;

    // Columns with 'View' action button
    columns = [
        { label: 'Product Name', fieldName: 'Name', type: 'text' },
        { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
        { label: 'Product Description', fieldName: 'Description', type: 'text' },
        { label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency' },
        {
            type: 'action', // Action type
            typeAttributes: {
                rowActions: [
                    { label: 'View', name: 'view' } // Define 'View' action
                ]
            }
        }
    ];

    // Fetch products from Apex
    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.initialProducts = data;
        } else if (error) {
            this.error = error;
            this.products = undefined;
        }
    }

    // Publish productId when 'View' button is clicked
    @wire(MessageContext)
    messageContext;

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const productId = event.detail.row.Id;

        if (actionName === 'view') {
            // Publish the productId to the message channel
            const message = {
                productId: productId
            };
            publish(this.messageContext, PRODUCT_MESSAGE_CHANNEL, message);
        }
    }

    // Search function
    handleSearch(event) {
        const searchKey = event.target.value.toLowerCase();

        if (searchKey) {
            let searchRecords = [];
            for (let record of this.initialProducts) {
                let valuesArray = Object.values(record);
                for (let val of valuesArray) {
                    let strVal = String(val);
                    if (strVal && strVal.toLowerCase().includes(searchKey)) {
                        searchRecords.push(record);
                        break;
                    }
                }
            }
            this.products = searchRecords;
        } else {
            this.products = this.initialProducts;
        }
    }
}