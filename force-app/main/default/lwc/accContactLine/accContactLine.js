import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { LightningElement,track, api } from 'lwc';
export default class AccContactLine extends LightningElement {
    @api recordId;

data = {};


constructor() {
    //console.log('Component AccountLine');
    super();
    (async () => {

        //console.log('calling AccountArrFromApex');
        
       
    })();
}


handleConChange(event) {

    if(event.target.name == 'FirstName'){           
       this.data.FirstName = event.target.value;
       console.log('fname## ' , this.data.FirstName );
    }
    if(event.target.name == 'LastName'){           
        this.data.LastName = event.target.value;
        console.log('lName ', this.data.LastName);
     }
     if(event.target.name == 'Phone'){           
        this.data.Phone = event.target.value;
        console.log('Phone ', this.data.Phone);
     }
     if(event.target.name == 'Email'){           
        this.data.Email = event.target.value;
        console.log('Email ', this.data.Email);
     }
    
    window.console.log('data ##' + this.data);
    this.sendDataToParent();
   
}


handleFirstNameChange(event){
    this.data.FirstName = event.target.value;
    console.log('FirstName## ', FirstName);
}

sendDataToParent() {

    console.log('sendDataToParent');
    const customEventObj = new CustomEvent('linedata', {
       
        detail: this.data
    });
    this.dispatchEvent(customEventObj);
}
}