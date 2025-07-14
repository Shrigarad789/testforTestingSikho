import { LightningElement, api } from 'lwc';

export default class MyCartView extends LightningElement {
    @api cartItems = [];

    get normalizedCartItems() {
        return this.cartItems.map(item => ({
            Product_Name__c: item['Product_Name__c'] || item['Product Name'],
            Quantity__c: item['Quantity__c'] || item['Quantity'],
            Id: item.Id // Ensure a key exists
        }));
    }
}