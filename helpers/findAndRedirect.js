var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var mongo_url =  "mongodb://localhost:27017/test";

module.exports = function (url_id,req,res) {
	MongoClient.connect(mongo_url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	    res.send({
	    	error:"Unable to connect to the mongoDB server. Error: "+err
	    });
	    db.close();
	  } else {
	  	db.collection('url').findOne({url_id:url_id},function(error,doc){
	  		if(error){
	  			throw error;
	  			res.send({
	  				error:error
	  			});
	  			db.close();
	  		}else{
	  			if(doc){
	  				console.log(doc);
	  				res.redirect(doc.original_url);
	  				db.close();
	  			}else{
	  				res.send({
	  					error:"This url is not in the database"
	  				});
	  				db.close();
	  			}
	  		}
	  	});
	  }
	});
}