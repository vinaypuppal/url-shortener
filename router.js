var path = require('path');
var insert = require('./helpers/insert');
var findAndRedirect = require('./helpers/findAndRedirect');

module.exports = function(app){
	app.get('/',function(req,res) {
		res.sendFile(path.join(__dirname,'/client/index.html'));
	});
	app.get('/new/',function(req,res){
		//console.log(req);
		res.send({
			error:"Please provide URL"
		});
	});
	app.get('/:url_id',function(req,res){
		console.log(req.params.url_id);
		findAndRedirect(parseInt(req.params.url_id),req,res);
	});
	app.get('/new/:url(*)',function(req,res){
		console.log(req.protocol + '://' + req.get('Host'));
		var url = req.params.url;
		var regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
		var error = {
			error: "Wrong url format, make sure you have a valid protocol and real site."			
		};
		if(regex.test(url)){
			//correct url
			if(!~url.indexOf('http')){
				//protocol not present
				res.send(error);
			}else{
				if(url[url.length-1]!=='/'){
					url	= url+'/';
				}
				insert(url,req,res);
			}
		}else{
			res.send(error);
		}
	});
}