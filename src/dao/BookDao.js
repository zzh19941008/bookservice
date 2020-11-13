var mongodb=require("mongodb")
var bookDao={
	databaseName:"book",
	collectionName:"book",
	aggregate:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(bookDao.databaseName);
			database.collection(bookDao.collectionName).aggregate(condition).toArray(function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	},
	find:function(conn,condition){
		return new Promise(function(resolve,reject){
			var database=conn.db(bookDao.databaseName);
			database.collection(bookDao.collectionName).find(condition).toArray(function(err,result){
				if(err){
					reject(err)
				}else{
					resolve(result)
				}
			})
		})
	}
	
}
module.exports=bookDao;