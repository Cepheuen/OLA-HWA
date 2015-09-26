var express = require('express')
var ejs = require('ejs')
var http = require('http')
var bodyparser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var routes = require('./routes/routes.js')

app.set('view engine','html')
app.engine('html',ejs.renderFile)

app.use('/img',   express.static(__dirname + '/public/img'));
app.set('views',__dirname+'/public')
app.use('/',routes)

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb://localhost:27017/ola_db", function(error){
  if(error)
    console.error(error)
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Started OLA Server')
});
