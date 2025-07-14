import { LightningElement, track } from 'lwc';


export default class IndroductionLwcComponent1 extends LightningElement {
    @track outputText;
    @track Intro_msg = 'Cick the down button';

    @track website  = 'www.shrikant.com';

    updateText(event) {
        this.outputText = this.template.querySelector('lightning-input').value;
    }
}