public class ContactCreationControllerLwc {
@AuraEnabled( cacheable = true )
  public static void addParentAccount(String ParentId , List<String> lstOfContactIds){
    list<Contact> lstContacts = new list<Contact>();
    for(string sContactId : lstOfContactIds){
        Contact oContact = new contact();
        oContact.Id = sContactId;
        oContact.AccountId = ParentId;
        lstContacts.add(oContact);
   }
   insert lstContacts;
 }
}