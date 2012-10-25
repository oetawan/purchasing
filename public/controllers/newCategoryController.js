define(['jquery',
        'namespace',
        'eventAggregator',
        'underscore',
        'backbone',
        'bootbox',
        'models/Category'], function ($, namespace, bus, _, Backbone, bootbox, Category) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.newCategoryController = function () {

    	var creatNewCategory = function(categoryName){
    		var cat = new Category({code: categoryName, name: categoryName});
    		cat.save({}, {
    			success: function(data){
    				console.log(data);
    			},
    			error: function(){
    				console.log(arguments);
    			}
    		});
    	}

    	var show = function(){
    		var html = "<input type='text' class='new-category-field'></input>";
            bootbox.dialog(html, 
            	[
            		{
	                	"label" : "Create Category",
	                	"callback": function(e) {
	                		creatNewCategory($('input.new-category-field').val());
	                		return false;
	                	}
	                },
	                {
	                	"label" : "Cancel",
	                	"class" : "primary",   // or primary, or danger, or nothing at all
	                	"callback": function() {
	                    	console.log("Cancel");
	                	}	
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