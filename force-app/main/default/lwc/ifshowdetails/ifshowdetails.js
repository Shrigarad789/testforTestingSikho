import { LightningElement } from 'lwc';

export default class Ifshowdetails extends LightningElement 
{
    name
    sess
    display=true

    changeHandler(event)
    {
        this.name=event.target.value
    }

    sessionHandler(event)
    {
        this.sess=event.target.value
    }

    savebutton()
    {
        this.display=false
    }
}