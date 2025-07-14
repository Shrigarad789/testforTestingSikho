import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    receivedName = '';

    handleName(event) {
        this.receivedName = event.detail.name;
    }
}