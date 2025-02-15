import { LightningElement ,wire} from 'lwc';
import fetchOpportunityList from '@salesforce/apex/OpportunityController.fetchOpportunityList'
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    { label: 'StageName', fieldName: 'StageName' },
   
];
export default class DatatableOfOpportunity extends LightningElement {
    OpportunityList;
    columns = columns;
    @wire(fetchOpportunityList)

    opportunities

    
    @wire(fetchOpportunityList)

    OpportunityHandler({data,error}){//method name
        if(data){
          // alert('data present');
            this.OpportunityList =data;
            this.err =undefined;
        }
        else{
           // alert('Error present');
            this.OpportunityList =undefined;
            this.err=error;
        }
    }
}