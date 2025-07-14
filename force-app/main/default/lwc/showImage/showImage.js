import { LightningElement } from 'lwc';

import Tshirt from '@salesforce/resourceUrl/Tshirt';

export default class ShowImage extends LightningElement {
    
    carouselImage1 = `${Tshirt}/T-shirt.jpg`;
    carouselImage2 = `${Tshirt}/T-shirt.jpg`;
    carouselImage3 = `${Tshirt}/T-shirt.jpg`;

}