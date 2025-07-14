import { LightningElement, track } from 'lwc';
import showopplist from '@salesforce/apex/ShowOpportunityInLWC.showopp';

export default class ShowOpportunityName extends LightningElement {
columns = [
    {
        label: 'Opportunity Name',
        fieldName: 'Name',
        type: 'text'
    }
];

@track opplist;
@track  error;
//By using imperative
handleclick(){
    this.fetchdata();
}

fetchdata(){
    showopplist()
    .then(result=>{
this.opplist=result;
    })
    .catch(error=>{
this.error=error;
    })
}


// @wire(showopplist)
// wiredOpportunity({ data, error }) {
//     if (data) {
//         this.opplist = data;
//     } else if (error) {
//         this.error = error;
//     }
// }
}