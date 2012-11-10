define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace',
		'views/CategoryView',
		'eventAggregator'], function ($, _, Backbone, namespace, CategoryView, bus) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.CategoryListView = Backbone.View.extend({
		className: 'span3 categorylistview',
		events: {
			'click .new-category': function(e) {
				e.preventDefault();
				bus.trigger('category:new');
			}
		},
		render: function(){
			this.$el.empty();
			this.renderBreadcrumb();
			this.renderCategoryPanel();
			this.renderCategories();
			return this;
		},
		renderBreadcrumb: function(){
			var html = '<ul class="breadcrumb categoryview">\
    						<li>Categories <a href="#" class="new-category"><i class="icon-plus plus-button"></i></a></li>\
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