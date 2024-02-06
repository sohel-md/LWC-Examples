public with sharing class AccountContactsController {

   @AuraEnabled(cacheable=true)
   public static List<Account> displayAccounts(){
       return [select Id,Name,Site from Account];
   }
   @AuraEnabled
   public static List<Account> updateRecord(String accId){
       Account acc=[select Id,Name,Site from Account where Id=:accId];
       acc.site='Approved';
       try{
           update acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayAccounts();
   }

   @AuraEnabled
   public static List<Contact> displayContacts(String accId){
       List<Contact> listCon = [SELECT Id, AccountId, LastName FROM Contact 
                                WHERE AccountId=:accId];
       
       return listCon;
   }
}