public with sharing class DisplayContactsUsingImperative {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [ SELECT Id, Name, Phone, Account.Name FROM Contact LIMIT 5 ];
    }
}