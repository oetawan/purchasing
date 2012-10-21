define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.Panel = Backbone.View.extend({
		className: 'container-fluid',
		render: function(){
			this.$el.empty();
			this.options.items.forEach(function(item){
				this.$el.append(item.render().el);
			}, this);
			
			return this;
		},
	});

	return zain.purchasing.views.Panel;
});