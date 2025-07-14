trigger matchDealAMount on Deal__c (before insert) {   
    set<id> setid =new set<id>();
    for(Deal__c d:trigger.new){
            setid.add(d.Opportunity__c);
        }
    map<id,opportunity> mapofopp = new  map<id,opportunity>([select id,Amount from opportunity where id in:setid]);
    for(Deal__c dc :trigger.new){
        Decimal amountofopp = mapofopp.get(dc.Opportunity__c).Amount;
            if(dc.Deal_Amount__c != amountofopp){
                dc.adderror('Not matched');
            }
    }
}