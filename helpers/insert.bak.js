var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var mongo_url =  "mongodb://localhost:27017/test";

var db;

module.exports = function(url,req,res){
	MongoClient.connect(mongo_url)
		.then(function(db){
			db = db;
			console.log('1');
			return db.collection('url').findOne({original_url:url});
		})
		.then(function(doc){
			
			if(doc){
				console.log('2.1');
				res.send({
					original_url:doc.original_url,
					short_url:doc.short_url
				});
			}else{
				console.log('2.2');
				console.log(db.collection('url').count());
				res.send({loading:"loading"});
				//insertToDb(url,req,res);
			}
		})
		.catch(function(error){
			throw error;
			console.log('6');
			res.send({error:error});
			db.close();
		});
}

function insertInDb(url,req,res){
	MongoClient.connect(mongo_url)
		.then(function(db){
			console.log('10');
			return db.collection('url').findOne({original_url:url});
		})
		.then(function(db){
			console.log('11');
			return db.collection('url').count();
		})
		.then(function(count){
			console.log('12');
			return {
	    			 		original_url: url,
	    			 		short_url: req.protocol + '://' + req.get('Host')+'/'+count
	    			 	};
		})
		.then(function(data){
			console.log('13');
			res.send(data);
			db.close();
		})
		.catch(function(error){
			console.log('14');
			throw error;
			res.send({error:error});
			db.close();
		});

}