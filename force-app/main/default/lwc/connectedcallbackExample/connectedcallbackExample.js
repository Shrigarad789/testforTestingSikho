import { LightningElement , track} from 'lwc';
import getLatestAccounts from '@salesforce/apex/ConnectedcallbackExample.getAccountList';
export default class ConnectedcallbackExample extends LightningElement {
  //Track property reactive nature ki rahti hai jaise new value dali to new value show hongi
    @track value ='';
    //array created
   @track accOption=[];

    get options(){
        return this.accOption;
    }
    //component home pe jaise hi drop hota dom inserted
   connectedCallback(){
        getLatestAccounts()
        //promise  return karta hai imperative ,response ayenga
        .then(result => {
            //array created
            let arr =[];
            //result property me sare ka sara data store ho jayenga
            for(var i=0;i<result.length;i++){
                arr.push({ label:result[i].Name, value:result[i].Id,value:result[i].Phone})
            }
            this.accOption =arr;
        })
    }
    handleChanged(event){
this.value = event.detail.value;
    }
}