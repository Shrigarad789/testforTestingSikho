import { api,LightningElement } from 'lwc';

export default class PTCParenrComponent extends LightningElement {
    @api var;
    HnadleChangeEvent(event){
this.template.querySelector('c-ptcchild-component').changeMessage(event.target.value);
       // this.var=event.target.value;
    }


}