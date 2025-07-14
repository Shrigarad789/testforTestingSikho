import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    sendName() {
        const myEvent = new CustomEvent('namedispatch', {
            detail: { name: 'No Bubble No Compose wow' },
            // bubbles: true,
            // composed: true
        });
        this.dispatchEvent(myEvent);
    }
}