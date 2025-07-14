trigger phoneAndEmailTakeFromParent on Opportunity (before insert, before update) {

    Set<String> setidPhone = new Set<String>();
    Set<String> setidEmail = new Set<String>();

    for (Opportunity opp : Trigger.new) {
        if (opp.Phone__c != null) {
            setidPhone.add(opp.Phone__c);
        }
        if (opp.Email__c != null) {
            setidEmail.add(opp.Email__c);
        }
    }

    Map<String, Id> mapofAccountPhone = new Map<String, Id>();
    Map<String, Id> mapofAccountEmail = new Map<String, Id>();

    List<Opportunity> opplist;

    if (Trigger.isInsert) {
        opplist = [
            SELECT Id, Phone__c, Email__c
            FROM Opportunity
            WHERE Phone__c IN :setidPhone OR Email__c IN :setidEmail
        ];
    } else {
        opplist = [
            SELECT Id, Phone__c, Email__c
            FROM Opportunity
            WHERE (Phone__c IN :setidPhone OR Email__c IN :setidEmail)
            AND Id NOT IN :Trigger.newMap.keySet()
        ];
    }

    for (Opportunity opp : opplist) {
        if (opp.Phone__c != null) {
            mapofAccountPhone.put(opp.Phone__c, opp.Id);
        }
        if (opp.Email__c != null) {
            mapofAccountEmail.put(opp.Email__c, opp.Id);
        }
    }

    for (Opportunity opp : Trigger.new) {
        if (opp.Phone__c != null && mapofAccountPhone.containsKey(opp.Phone__c)) {
            opp.Phone__c.addError('Duplicate phone number found.');
        }
        if (opp.Email__c != null && mapofAccountEmail.containsKey(opp.Email__c)) {
            opp.Email__c.addError('Duplicate email address found.');
        }
    }
}


    /*set<id> setid =new set<id>();
for(Opportunity opp:trigger.new){
setid.add(opp.AccountId);
}

try{
map<id,Account> mapofAccount =new map<id,Account>([select id,Phone,Email__c from Account where id in :setid]);
for(Opportunity opp:trigger.new){
opp.Phone__c=mapofAccount.get(opp.AccountId).Phone;
opp.Email__c=mapofAccount.get(opp.AccountId).Email__c;
}  
}catch(exception e){
system.debug('error message'+e.getMessage());
}
}*/