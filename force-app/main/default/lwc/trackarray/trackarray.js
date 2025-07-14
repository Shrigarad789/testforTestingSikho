import { LightningElement , track } from 'lwc';
export default class Trackarray extends LightningElement 
{
     itemlist=[];
   // @track itemlist=[];
    newItem;

    handleChange(event)
    {
    this.newItem=event.target.value;
    }

    add()
    {
    this.itemlist.push(this.newItem);
    }
}