public with sharing class DisplayUpdateDeleteAccounts {
    
    @AuraEnabled(cacheable=true)
   public static List<Account> displayAccounts(){
       return [select Id,Name,Rating from Account LIMIT 5];
   }

   @AuraEnabled
   public static List<Account> updateRecord(String accId){
       Account acc=[select Id,Name,Rating from Account where Id=:accId];
       acc.Rating='Warm';
       try{
           update acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayAccounts();
   }

   @AuraEnabled
   public static List<Account> deleteRecord(String accId){
       Account acc=[select Id from Account where Id=:accId];
       try{
           delete acc;
       }
	   catch (Exception e) {
           System.debug('unable to update the record due to'+e.getMessage());
       }
       return displayAccounts();
   }
}