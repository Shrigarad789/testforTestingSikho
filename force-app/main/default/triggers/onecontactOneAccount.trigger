trigger onecontactOneAccount on Contact (before insert) {
//trigger OneAccountOneContactTrigger on Contact (before insert) {
    // Fetch all contacts created today with a non-null AccountId
    List<Contact> conList = [
        SELECT AccountId 
        FROM Contact 
        WHERE AccountId != null AND CreatedDate = TODAY
    ];

    // Store all unique AccountIds in a Set
    Set<Id> accountIdSet = new Set<Id>();
    for (Contact con : conList) {
        accountIdSet.add(con.AccountId);
    }

    // Prevent insert if a contact already exists for the same Account today
    for (Contact co : Trigger.new) {
        if (accountIdSet.contains(co.AccountId)) {
            co.addError('Only one Contact is allowed per Account per day.');
        }
    }
}

