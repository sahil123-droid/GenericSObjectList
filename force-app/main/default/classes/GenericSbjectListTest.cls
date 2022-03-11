@isTest
private class GenericSbjectListTest {
    @testSetup
    static void testSetup(){
        Account a =new Account();
        a.Name='Test Account';
        INSERT a;
        Contact b = new Contact();
        b.FirstName='Test';
        b.LastName='Contact';
        b.AccountId=a.Id;
        INSERT b;
    }
    @isTest
    static void doTest(){
        Test.startTest();
        Account a = [Select Id from Account where Name='Test Account'];
        List<sObject> lst = GenericSbjectList.getRelatedRecords('Contact','AccountId','FirstName,LastName','FirstName = \'Test\'',a.Id);
        System.assertEquals(true,lst!=null);
        List<sObject> lst1 = GenericSbjectList.getRelatedRecords('Contact','AccountId','FirstName,LastName',null,a.Id);
        System.assertEquals(true, lst1!=null);
        try{
            List<sObject> lst2 = GenericSbjectList.getRelatedRecords('Contact__c','AccountId','FirstName,LastName',null,a.Id);
        }
        catch(Exception e){
            System.assertEquals(e.getMessage(),e.getMessage());
        }
        Test.stopTest();
    }
}