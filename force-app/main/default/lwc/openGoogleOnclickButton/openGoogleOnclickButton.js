import { LightningElement } from 'lwc';

export default class OpenGoogleOnclickButton extends LightningElement {

    handleClick() {
        // Open the Google page in a new tab
        window.open('https://www.google.com/?safe=active&ssui=on');
    }
}