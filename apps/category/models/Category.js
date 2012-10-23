module.exports = function(){
	var mongoose = require('mongoose'),
		db = mongoose.createConnection('mongodb://oetawan:fakhri18022010@ds029787.mongolab.com:29787/zain_product'),
	
		CategorySchema = new mongoose.Schema({
			type: {type: String, required: true},
			code: {type: String, required: true},
			name: {type: String, required: true},
			categories: []
		}),

		Category = db.model('Category', CategorySchema),
	
		findAll = function(username, callback){
			Category.find({type:'Category'}, {code:1, name:1, categories: 1}, { safe: true , collection: 'test'}, function(err,cats){
				if(cats.length === 0){
					var newCategory = new Category({type: 'Category', code: 'NEW', name: 'New category', categories: []});
					newCategory.save(function(err, cat){
						console.log(err);
						console.log(cat);
						callback(err, [cat]);
					});
				}
				else {
					console.log(err);
					console.log(cats);
					callback(err,cats);
				}
			});
		};

	return {
		findAll: findAll
	};
}