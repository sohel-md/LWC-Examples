public with sharing class LwcCreateAccount {

    @AuraEnabled
    public static Account insertAcc(Account accRec){
        try {
            
            insert accRec;
            return accRec;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

       
    }
}