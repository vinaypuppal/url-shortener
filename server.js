var http = require('http');
var express = require('express');
var morgan = require('morgan');
var router = require('./router');
var path = require('path');

var app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'/client')));
router(app);

var server = http.createServer(app);

var port = process.env.PORT || 3000;

server.listen(port,function(error){
	if(error) throw error;
	console.log("Server running at port "+port);
});