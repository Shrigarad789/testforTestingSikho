trigger onecontactOneAccount on Contact (before insert) {
    List<Contact> conList = [
        SELECT AccountId 
        FROM Contact 
        WHERE AccountId != null AND CreatedDate = TODAY
    ];
    Set<Id> accountIdSet = new Set<Id>();
    for (Contact con : conList) {
        accountIdSet.add(con.AccountId);
    }
    for (Contact co : Trigger.new) {
        if (accountIdSet.contains(co.AccountId)) {
            co.addError('Only one Contact is allowed per Account per day.');
        }
    }
}

