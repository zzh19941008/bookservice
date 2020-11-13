var express=require("express");
var router=express.Router();

var bookService=require("../src/service/bookService")
router.use("/showLimit",function(req,res){
	console.log("~~~~~~~~~~执行~~~~~~~~~~~")
	bookService.showBookLimit(req,res);
})

module.exports=router;