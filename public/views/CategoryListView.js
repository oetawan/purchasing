define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace',
		'views/CategoryView'], function ($, _, Backbone, namespace, CategoryView) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.CategoryListView = Backbone.View.extend({
		className: 'span3',
		render: function(){
			this.$el.empty();
			this.renderBreadcrumb();
			this.renderCategoryPanel();
			this.renderCategories();
			return this;
		},
		renderBreadcrumb: function(){
			var html = '<ul class="breadcrumb categoryview">\
    						<li>Categories</li>\
						</ul>';
			this.$el.append(html);
		},
		renderCategoryPanel: function(){
			var html = '<div class="span3 product-list">\
						</div>';
			this.$el.append(html);
		},
		renderCategories: function(){
			var view = new CategoryView({collection: this.collection});
			$('.product-list', this.$el).append(view.render().el);
		}
	});

	return zain.purchasing.views.CategoryListView;
});