define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.CategoryProductView = Backbone.View.extend({
		className: 'row category-product',
		render: function(){
			this.$el.empty();
			this.$el.append(this.options.categoryListView.render().el);
			this.$el.append(this.options.productListView.render().el);
			return this;
		}
	});

	return zain.purchasing.views.CategoryProductView;
});