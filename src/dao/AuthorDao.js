var mongodb=require("mongodb")
var authorDao={
	databaseName:"book",
	collectionName:"author",
	find:function(conn,databaseName,collectionName,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(authorDao.databaseName);
			database.collection(authorDao.collectionName).find(condition).toArray(function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	}
	
}
module.exports=authorDao;