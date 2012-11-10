define(['jquery',
        'namespace',
        'eventAggregator',
        'underscore',
        'backbone',
        'bootbox',
        'models/Category',
        'views/NewCategoryView'], function ($, namespace, bus, _, Backbone, bootbox, Category, NewCategoryView) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.newCategoryController = function () {
        
        var newCatView;
        var newCategory;
        
        var parseErrorMessage = function(responseText){
            var err = JSON.parse(responseText);
            var result = [];
            if(err.name === 'ValidationError'){
                for(var e in err.errors) {
                    if(err.errors.hasOwnProperty(e)){
                        result.push(e + ': ' + err.errors[e]['type']);
                    }
                }
            } else if(err.name === 'MongoError'){
                result.push(err.err);
            } else {
                result.push(responseText);
            }
            
            return result;
        };
        
        var createNewCategory = function(callback){
            newCatView.clearError();
    		newCategory.save({}, {
                async: false,
                success: function(category){
                    bus.trigger('category:added', category);
                    callback(true);
    			},
    			error: function(model, response){
                    newCatView.showError(parseErrorMessage(response.responseText));
                    callback(false);
    			}
    		});
    	};

    	var show = function(){
            newCategory = new Category();
            newCatView = new NewCategoryView({model: newCategory}).render();

    		bootbox.dialog(newCatView.el, 
            	[
            		{
	                	"label" : "Create Category",
	                	"callback": function(e) {
                            var result;
                            createNewCategory(function(success){
                                result = success;
                            });
                            return result;
	                	}
	                },
	                {
	                	"label" : "Cancel",
	                	"class" : "primary"
	                }
	            ],
	            {
	            	header: 'Create new category',
	            	keyboard: true
	            });
    	};
        
        bus.on('category:new', function(){
       		show();
        }, this);

        return {
       	};
	}

    return zain.purchasing.controllers.newCategoryController;
});