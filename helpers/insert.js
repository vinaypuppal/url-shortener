var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var mongo_url =  process.env.MONGOLAB_URI || "mongodb://localhost:27017/test";

module.exports = function (url,req,res) {
	MongoClient.connect(mongo_url, function (err, db) {
	  if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	    res.send({
	    	error:"Unable to connect to the mongoDB server. Error: "+err
	    });
	    db.close();
	  } else {
	    console.log('Connection established to', url);

	    // do some work here with the database.
	       
	    db.collection('url').findOne({original_url:url},function(error,doc){
	    	if(error){
				console.log("Error: ",error);
				throw error;
				res.send({
					error:error
				});
				db.close();
	    	}
	    	else{
	    		console.log("Doc: ",doc);
	    		if(doc){
	    			res.send({
	    				original_url:doc.original_url,
	    				short_url:doc.short_url
	    			});
	    		}else{
	    			db.collection('url').count().then(function(data){
	    			 	console.log("Count: ",data);
	    			 	var obj = {
	    			 		original_url: url,
	    			 		short_url: req.protocol + '://' + req.get('Host')+'/'+data,
	    			 		url_id:data,
	    			 		createdAt: new Date
	    			 	};
	    			 	db.collection('url').insert(obj).then(function(data){
	    			 		if(data.ops) res.send({
	    			 			original_url:obj.original_url,
	    			 			short_url:obj.short_url
	    			 		});
	    			 	db.close();
	    			 	}).catch(function(error){
	    			 		throw error;
	    			 		res.send({
	    			 			error:error
	    			 		});
	    			 		db.close();
	    			 	});
	    			}).catch(function(error){
	    			 	throw error;
	    			 	res.send({
	    			 		error:error
	    			 	});
	    			 	db.close();
	    			});
	    		}
	    	}
	    });
	    //Close connection
	  }
	});
}