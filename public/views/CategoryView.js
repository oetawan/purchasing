define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace',
		'views/CategoryItemView'], function ($, _, Backbone, namespace, CategoryItemView) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.CategoryView = Backbone.View.extend({
		render: function(){
			this.addAllCategories();
			return this;
		},
		addAllCategories: function(){
			this.$el.html("<ul class='nav'></ul>");
			this.collection.forEach(function(cat){
				this.addOneCategory(cat);
			}, this);
			this.renderTree();
		},
		addOneCategory: function(cat){
			var view = new CategoryItemView({model: cat});
			view.render();
			$('ul.nav', this.$el).append(view.el);
		},
		renderTree: function(){
			this.$el
				.jstree({
					"themes" : {
            			"theme" : "default",
            			"dots" : false,
            			"icons" : false
        			},
					"plugins" : ["themes","html_data","ui","crrm","hotkeys"]
				})
				.bind("loaded.jstree", function (event, data) {	
				})
				.bind("select_node.jstree", function (event, data) { 
					// `data.rslt.obj` is the jquery extended node that was clicked
					//alert(data.rslt.obj.attr("id"));
					console.log(data.rslt.obj);
				});
		}
	});

	return zain.purchasing.views.CategoryView;
});