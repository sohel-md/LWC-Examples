public with sharing class LwcDataTableController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, AnnualRevenue, 
                Phone,  Rating FROM Account LIMIT 5];
    }
}