public class updateAccountPhoneBtachClass implements Database.Batchable<SObject>{
    
    public Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('SELECT Id, Name, Phone FROM Account WHERE Phone != null');
    }

    public void execute(Database.BatchableContext BC, List<Account> acclist) {
        for (Account ac : acclist) {
            ac.Phone = '7639338938';                        
        }
        //update acclist;
        System.debug('acclist: ' + acclist);
    }

    public void finish(Database.BatchableContext BC) {
        // ⚠️ Removed auto-rescheduling to stop infinite loop and email spam
        // updateAccountPhoneBtachClass uabc = new updateAccountPhoneBtachClass();
        // Database.executeBatch(uabc, 200);
    }

  
    
}