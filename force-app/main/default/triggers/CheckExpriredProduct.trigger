trigger CheckExpriredProduct on Product2 (before delete) {
    /*for(Product2 prod : Trigger.old) {
        if(prod.Expiry_Date__c != null &&prod.Expiry_Date__c >= Date.today()) {
            prod.addError( 'Product cannot be deleted because it has not expired yet.');
        }
    }*/
}