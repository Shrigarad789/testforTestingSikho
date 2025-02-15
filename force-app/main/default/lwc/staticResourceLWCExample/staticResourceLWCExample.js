import { LightningElement } from 'lwc';
import w3webResource  from '@salesforce/resourceUrl/CarHub_Image';
export default class StaticResourceLWCExample extends LightningElement {
   
    w3webSlider1 = w3webResource + '/ford_ecosport.png';
    w3webSlider2 = w3webResource + '/w3webSlider2.png';
    w3webSlider3 = w3webResource + '/w3webSlider3.png';
    w3webSlider4 = w3webResource + '/w3webSlider4.png';
}