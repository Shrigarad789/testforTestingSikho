import { LightningElement, wire } from 'lwc';
import leadList from '@salesforce/apex/LeadRecodsShowInLwcCompoent.test1';

export default class ShowLead extends LightningElement {
    columns = [{ label: 'Last Name', type: 'text', fieldName: 'LastName' }];
    leadList;
    error;

    @wire(leadList)
    Leadrecord({ error, data }) {
        if (data) {
            this.leadList = data;
        } else if (error) {
            this.error = error;
        }
    }

}