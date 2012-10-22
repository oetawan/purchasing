define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace',
		'views/ProductView'], function ($, _, Backbone, namespace, ProductView) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.ProductListView = Backbone.View.extend({
		className: 'span9',
		render: function(){
			this.$el.empty();
			this.renderBreadcrumb();
			this.collection.forEach(function(product){
				this.addOneProduct(product);
			}, this);
			return this;
		},
		renderBreadcrumb: function(){
			var html = '<ul class="breadcrumb productview">\
    						<li>Home</li>\
    						<li class="divider"></li>\
    						<li>Desktop</li>\
						</ul>';
			this.$el.append(html);
		},
		addOneProduct: function(product){
			this.$el.append(new ProductView({model: product}).render().el);
			this.$el.append('<hr>');
		}
	});

	return zain.purchasing.views.ProductListView;
});