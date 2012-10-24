module.exports = function(){
	var mongoose = require('mongoose'),
		db = mongoose.createConnection('mongodb://oetawan:fakhri18022010@ds029787.mongolab.com:29787/zain_product'),
	
		CategorySchema = new mongoose.Schema({
			owner: {type: String, required: true},
			code: {type: String, required: true},
			name: {type: String, required: true},
			categories: []
		}),

		Category = db.model('Category', CategorySchema),
	
		findAll = function(username, callback){
			Category.find({owner: username}, {owner: 1, code:1, name:1, categories: 1}, { safe: true }, function(err,cats){
				if(cats.length === 0){
					var newCategory = new Category({owner: username, code: 'NEW', name: 'New category', categories: []});
					newCategory.save(function(err, cat){
						callback(err, [cat]);
					});
				}
				else {
					callback(err,cats);
				}
			});
		};

	return {
		findAll: findAll
	};
}