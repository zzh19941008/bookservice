var mongodb=require("mongodb")
var book_typeDao={
	databaseName:"book",
	collectionName:"boot_type",
	find:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(book_typeDao.databaseName);
			database.collection(book_typeDao.collectionName).find(condition).toArray(function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	}
	
}
module.exports=book_typeDao;