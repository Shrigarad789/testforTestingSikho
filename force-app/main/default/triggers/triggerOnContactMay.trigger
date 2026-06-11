trigger triggerOnContactMay on Contact (before insert,before update) {
}
/*trigger triggerOnContactMay on Contact (before insert,before update) {
    //Scenario-1-----Validation for phone & email
    set<string> setEmail=new set<string>();
     set<string> setPhone=new set<string>();
    for(Contact co:trigger.new){
        if(trigger.Isinsert){
            if(co.Email !=null){
            setEmail.add(co.Email);
            }
             if(co.Phone !=null){
            setPhone.add(co.Phone);
            }
        }
        if(trigger.isUpdate){
            contact OldCon=trigger.oldMap.get(co.id);
             if(co.Email !=null && co.Email !=OldCon.Email){
                 setEmail.add(co.Email);
             }
            if(co.Phone !=null && co.Phone !=OldCon.Phone){
                 setPhone.add(co.Phone);
             }
        }
    }
    map<string,id> mapOfEmail=new map<string,id>();
    map<string,id> mapOfPhone=new map<string,id>();
    List<contact> conlist=[select id,email,Phone from contact where email in:setEmail OR Phone in:setPhone];
    for(contact c:conlist){
        mapOfEmail.put(c.Email,c.id);
        mapOfPhone.put(c.Phone,c.id);
    }
    for(contact co:trigger.new){
        if(co.Email !=null && mapOfEmail.containskey(co.email) && mapOfEmail.get(co.email) != co.id){
            //3rd condition check 'Map me jo Id hai wo current record ke Id se different hai kya?'
            co.Email.addError('Duplicate Email 12 may');
        }
        if(co.Phone !=null && mapOfPhone.containskey(co.Phone) && mapOfPhone.get(co.Phone) != co.id){
            //3rd condition check 'Map me jo Id hai wo current record ke Id se different hai kya?'
            co.Phone.addError('Duplicate Phonekkkkk 12 may');
        }
    }
}*/