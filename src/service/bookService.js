var connection=require("../util/connection")
var authorDao=require("../dao/AuthorDao")
var book_typeDao=require("../dao/Book_TypeDao")
var bookDao=require("../dao/BookDao")
var bookService={
	//分页查询书籍
	showBookLimit:async function(req,res){
		console.log("~~~~~~~~~~执行showBookLimit~~~~~~~~~~~")
		var conn;
		try{
			//开连接
			conn=await connection.getConn();
			// //查看全部作者
			var authorArray=await authorDao.find(conn,{});
			// //查看全部分类
			var book_typeArray=await book_typeDao.find(conn,{});
			//分页查询书籍
			var condition=new Array;//普通条件
			var countcondition=new Array;//计算数量条件
			//booktypeid 分类，bookauthorid作者，moneyStart和moneyEnd 价格区间
			console.log(req.body)
			if(req.body.condition.booktypeid!=""
			||req.body.condition.bookauthorid!=""
			||req.body.condition.moneyStart!=""){
				//拼接条件
				var cond1={$match:{}}
				if(req.body.condition.booktypeid!=""){//传入分类
					cond1.$match.booktypeid=req.body.condition.booktypeid;
				}
				if(req.body.condition.bookauthorid!=""){//传入作者
					cond1.$match.bookauthorid=req.body.condition.bookauthorid;
				}
				if(req.body.condition.moneyStart!=""){//传入加入区间
					cond1.$match.bookpirce={$gte:Number(req.body.condition.moneyStart),$lte:Number(req.body.condition.moneyEnd)};
				}
				console.log(cond1)
				//装载条件
				condition.push(cond1)
				countcondition.push(cond1)
			}
			
			//计数
			countcondition.push({$group:{"_id":"","count":{$sum:1}}});
			//分组查询
			condition.push({$skip:(Number(req.body.page)-1)*Number(req.body.pagesize)})
			condition.push({$limit:Number(req.body.pagesize)})
		
			//查询数量
			var data=await bookDao.aggregate(conn,countcondition)
			var count=0;//默认数量0
			if(data.length>0){
				//防止下标越界【数组中没有任何元素，还强行获取就会越界】
				count=data[0].count;
			}
			//查询数据
			var array=await bookDao.aggregate(conn,condition)
		
			res.status(200);//自定义200是正确
			var result={
				"authorArray":authorArray,
				"book_typeArray":book_typeArray,
				"array":array,
				"count":count
			}
			res.end(JSON.stringify(result));
		}catch(err){
			console.log(err);
			res.status(400);//自定义200是正确
		}finally{
			if(conn!=undefined){
				conn.close();
			}
		}
	}
}
module.exports=bookService;