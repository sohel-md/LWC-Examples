public with sharing class SearchContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [ SELECT Id, Name, Title, Phone, Email
            FROM Contact WHERE Name LIKE :key LIMIT 5 ];
    }
}

