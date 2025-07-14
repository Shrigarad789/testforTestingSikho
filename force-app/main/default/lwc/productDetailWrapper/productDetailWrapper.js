import { LightningElement } from 'lwc';

export default class ProductDetailWrapper extends LightningElement {
    recordId;

    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        this.recordId = urlParams.get('recordId');
    }
}