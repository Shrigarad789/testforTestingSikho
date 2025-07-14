import { LightningElement, api } from 'lwc';

export default class MyCartLogo extends LightningElement {
    @api count = 0;

    handleClick() {
        this.dispatchEvent(new CustomEvent('togglecart')); // Notify parent to toggle cart view
    }
}