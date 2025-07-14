import { LightningElement } from 'lwc';

export default class CustomEventsChilsComp extends LightningElement {

    HnadleOnClick(){
        this.dispatchEvent(new CustomEvent('increasecount'));
    }
}