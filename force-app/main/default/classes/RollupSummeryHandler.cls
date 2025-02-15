public class RollupSummeryHandler {
    Public static void testTotalContacts(List<contact> newcontact,List<contact> oldcontact){
        set<id> accids=new set<id>();
        try{
            if(newcontact!=null){
                for(contact c:newcontact){
                    accids.add(c.accountid);
                }
            }
            if(oldcontact!=null){
                for(contact c:oldcontact){
                    accids.add(c.accountid);
                }
            }
            List<account> acclist=[select id,Total_Contacts__c,(select id from contacts) from account where id=:accids];
            if(acclist!=null){
                for(account accValue :acclist){
                    
                    accValue.Total_Contacts__c=accValue.contacts.size();
                }
            }
            if(!acclist.isempty()){
                update acclist;
            }
            
        }
        catch(exception e){
            
        }
        
    }
}
        
        
        
        
        
        
        
        
        
        
        
        
        
       /* 
        try{
            if(Trigger.Isinsert || trigger.isundelete||trigger.isupdate){
            For(contact con:trigger.new){
                setid.add(con.AccountId);
            }
        }
        if(trigger.isdelete||trigger.isupdate){
            For(contact con1:trigger.old){
                setid.add(con1.AccountId);
                system.debug('SHrikant++'+con1);
            }
        }
        List<account> acclist=[select id,NumberOfcontacts__c,(select id from contacts) from account where id=:setid];
        for(Account acc:acclist){
            acc.NumberOfcontacts__c=acc.contacts.size();
        }
        update acclist;
    }
}
            
        }
        

}*/