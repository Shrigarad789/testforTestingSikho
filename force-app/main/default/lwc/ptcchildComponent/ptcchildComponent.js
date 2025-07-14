import {api, LightningElement,track } from 'lwc';

export default class PtcchildComponent extends LightningElement {

    @track Message;
    @api
    changeMessage(strString){
        this.Message=strString.toUpperCase();
    }

}