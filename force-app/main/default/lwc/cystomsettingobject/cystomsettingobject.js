import { LightningElement,api,wire } from 'lwc';
import getCustomSettings from '@salesforce/apex/Powerbidashbord.getCustomSettings';
export default class Cystomsettingobject extends LightningElement {
    @api url = '';
    @api height = '700';
    @api width = '100%';
     @api url1 = '';

    salesDashboard = false;
    drmsReportingTool = false;
    
    @wire(getCustomSettings)
    myCustomSettings({ error, data }) {
        if (data) {
            this.salesDashboard = data.Sales_Reporting_Tool__c;
            this.drmsReportingTool = data.DRMS_Reporting_Tool__c;
            
            this.silicaSupliManApp = data.Silica_Supplier_Management_App__c;;
        } else if (error) {

        }
    }
   }