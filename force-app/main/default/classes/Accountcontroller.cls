public class Accountcontroller {
    @auraEnabled
    public static list<account> getaccounts(){
        list<account> acclist=new list<account>();
        acclist=[select id,name from account limit 10];
        return acclist;
    }
}