import { LightningElement,track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import submitOptRecord from '@salesforce/apex/accLineItemCtrl.submitOptRecord';
import { NavigationMixin } from 'lightning/navigation';

export default class AccLineItemLwc extends LightningElement {

@track recordId;
@track optFormData = {};
@api currentVal;

@api conFormData = {};

toastEventFire(title, msg, variant, mode) {
    const e = new ShowToastEvent({
        title: title,
        message: msg,
        variant: variant,
        mode: mode
    });
    this.dispatchEvent(e);
}

alertElem;

connectedCallback() {
    this.alertElem = this.template.querySelector('[data-elem="alert-span"]');
    // console.log(this.alertElem);
}

setFormError(errorTxt) {
    if (!this.alertElem) {
        this.alertElem = this.template.querySelector('[data-elem="alert-span"]');
    }
    this.alertElem.innerText = errorTxt;
}

async saveButtonAction(event) {
  
    let flag = true;

    for (const elem of [...this.template.querySelectorAll('form[data-name="opptForm"] [data-type="input-field"]')]) {
        this.optFormData[elem.name] = elem.value;
        console.log('aaaaa' , elem.value);
    }

    

    console.log('optFormData## ', this.optFormData);
    console.log('optFormDataStringyFy',JSON.stringify(this.optFormData));

    

    const data = {
        optDataFyObj: this.optFormData,
        contactLine: this.salesAccLineData,           
    };

    console.log('optDataFyObj##__SS ',JSON.stringify(data));

    if(flag){
        const result = await submitOptRecord({                
            jsonDataStr: JSON.stringify(data)
            
        });
       

        const toastEvent = new ShowToastEvent({
            title:'SUCCESS',
            message:'Record created successfully',
            variant:'SUCCESS'
           });
           this.dispatchEvent(toastEvent);
           
         
        
    }

}

navigateToRecordPage(recordId) {
    this[NavigationMixin.GenerateUrl]({
        type: 'standard__recordPage',
        attributes: {
            recordId: recordId,
            actionName: 'view',
        },
    }).then(url => {
        window.location.href = url;
    });
}



salesAccLineData = {
    line1: {},
    line2: {},
    line3: {},
    line4: {},
    line5: {},
    line6: {}
};

handleChildData(event) {
    //this.currentVal=event.detail;
   
    let dataset = event.target.dataset;
     console.log('dataset##  ' , dataset);
    if (!dataset) return;

    this.salesAccLineData[dataset.name] = event.detail;
    console.log('EEEEE ' , this.salesAccLineData);
   
}
}