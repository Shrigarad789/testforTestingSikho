import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/weatherAPI.getWeather';

export default class WeatherAPI extends LightningElement {
    city;
    condition;
    imageURL;


    // Handle the change event for the city input field
    handleOnChange(event) {
        this.city = event.target.value;
    }

    // Handle the button click to fetch weather data
    buttonClick() {
        getWeather({ city: this.city })
            .then((response) => {
                console.log("### Response:"+ response);
                let parsedData = JSON.parse(response);
                this.imageURL=parsedData.current.condition.icon;
                this.condition=parsedData.current.condition.text;

            })
            .catch((error) => {
                this.condition="no matching;"
                console.log("Error fetching weather data: ", JSON.stringify(error));

            });
    }
}