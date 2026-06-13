@isTest
public class CheckExpriredProductHandlerTest {

    @isTest
    static void testDeleteNonExpiredProduct() {

        Product2 prod = new Product2(
            Name = 'Test Product',
            Expiry_Date__c = Date.today().addDays(5)
        );
        insert prod;

        Test.startTest();

        try{
            delete prod;
            System.assert(false);
        }
        catch(DmlException e){
            System.assert(
                e.getMessage().contains(
                    'Product cannot be deleted because it has not expired yet.'
                )
            );
        }

        Test.stopTest();
    }

    @isTest
    static void testDeleteExpiredProduct() {

        Product2 prod = new Product2(
            Name = 'Expired Product',
            Expiry_Date__c = Date.today().addDays(-5)
        );
        insert prod;

        Test.startTest();
        delete prod;
        Test.stopTest();

        System.assertEquals(
            0,
            [SELECT Count() FROM Product2 WHERE Id = :prod.Id ALL ROWS]
        );
    }
}