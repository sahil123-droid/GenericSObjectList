public class GenericSbjectList {
    @AuraEnabled
    public static List<sObject> getRelatedRecords(String sobjectName, String relation,String fields,String filter,String recordId){
        try{
            if(filter==null){
                filter='';
            }
            recordId='\''+recordId+'\'';
            System.debug(recordId);
            System.debug(filter);
            String query='Select '+fields+' from '+sobjectName+' where '+relation+' = '+recordId;
            if(filter!=''){
                query+=' And ('+filter+')';
            }
            System.debug(query);
            List<SObject> result = Database.query(query);
            System.debug(result);
            return result;
        }
        catch(Exception e){
            System.debug(e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }
}