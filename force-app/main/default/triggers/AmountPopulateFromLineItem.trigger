trigger AmountPopulateFromLineItem on Opportunity_Line_Item__c (after insert, after update, after delete, after undelete) {
    Set<Id> oppIds = new Set<Id>();
    if (Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete) {
        for (Opportunity_Line_Item__c oli : Trigger.new) {
            oppIds.add(oli.Opportunity__c);
        }
    }
    if (Trigger.isDelete) {
        for (Opportunity_Line_Item__c oli : Trigger.old) {
            oppIds.add(oli.Opportunity__c);
        }
    }
    List<opportunity> opplist=new List<opportunity>();
    for(AggregateResult ar:[select Opportunity__c opoid ,sum(Amount__c) sumofamount from
                            Opportunity_Line_Item__c where Opportunity__c in:oppIds GROUP BY Opportunity__c ]){
        opportunity op =new opportunity();
        op.id=(id)ar.get('opoid');
         op.Total_Amount_for_OLI__c=(decimal)ar.get('sumofamount');
        opplist.add(op);
    }
    update opplist;
}