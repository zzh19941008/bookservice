var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 跨域请求
var cors=require("cors");
app.use(cors())


var bookRouter = require('./routes/book');

app.use("/book",bookRouter);
module.exports = app;
