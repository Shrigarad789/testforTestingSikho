public class CheckExpriredProductHandler {

    public static void checkProductExpiry(List<Product2> products) {

        for(Product2 prod : products) {

            if(prod.Expiry_Date__c != null &&
               prod.Expiry_Date__c >= Date.today()) {

                prod.addError(
                    'Product cannot be deleted because it has not expired yet.'
                );
            }
        }
    }
}