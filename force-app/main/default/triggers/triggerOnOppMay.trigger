trigger triggerOnOppMay on Opportunity (after insert,after update,after delete) {
    //Sum of related opp AMount Currency_AMount__c & Number_Of_Opp__c populate on Account
    set<id> setId = new set<id>();
    if(trigger.Isinsert ||Trigger.isupdate){
        for(Opportunity opp:trigger.new){
            if(opp.Accountid !=null){
                setId.add(opp.Accountid);  
            }
        }
    }  
    if(trigger.IsDelete){
        for(Opportunity opp:trigger.old){
            if(opp.Accountid !=null){
                setId.add(opp.Accountid);  
            }
        }  
    }
    //logic for count
    map<Id,Integer> mapstoreNumberOpp =new  map<id,Integer>();
    list<AggregateResult> arlist=[select Accountid,count(id) contOpp from Opportunity where Accountid in:setId GROUP BY Accountid ];
    for(AggregateResult ar:arlist){
        mapstoreNumberOpp.put((Id)ar.get('Accountid'),(Integer)ar.get('contOpp'));
    }
    //logic for highest Amount
    map<Id,string> mapstorehighestAmount =new  map<id,string>();
    List<Opportunity> opplist=[select Accountid,Name,Amount from Opportunity where Accountid in:setId AND Amount != null Order By AMount DESC];
    for(Opportunity op:opplist){
        if(!mapstorehighestAmount.containskey(op.Accountid)){
           mapstorehighestAmount.put(op.Accountid,op.Name); 
        }
    }
    List<Account> acclist=new List<Account>();
    for(Id accid:setId){
        Account ac=new Account();
        ac.id=accid;
        ac.Number_Of_Opp__c=mapstoreNumberOpp.get(accid);
        ac.Name_of_Opp_High_Amount__c=mapstorehighestAmount.get(accid);
        acclist.add(ac);
    }
    update acclist;
    system.debug('acclist'+acclist);
}