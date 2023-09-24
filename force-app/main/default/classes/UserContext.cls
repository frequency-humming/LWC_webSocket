public class UserContext {
    
    @AuraEnabled(cacheable=true)
    public static User getUserContext(ID userID){
        User user = [SELECT ID,NAME,EMAIL,USERNAME,MANAGERID,MANAGER.NAME,PROFILEID,PROFILE.NAME,USERROLEID,USERROLE.NAME FROM USER WHERE ID = :userID LIMIT 1];
        return user;
    }

}