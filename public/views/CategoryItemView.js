define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.CategoryItemView = Backbone.View.extend({
		tagName: 'li',
		render: function(){
			var html = _.template('<a><%= name %></a>', this.model.toJSON());
			this.$el.html(html);
			this.$el.attr('id', this.model.get('code'));
			this.renderSubCategories();
			return this;
		},
		renderSubCategories: function(){
			if(this.model.get('categories') && this.model.get('categories').length>0) {
				var catList = new Backbone.Collection();
				catList.reset(this.model.get('categories'));
				var ulEl = $("<ul></ul>");
				catList.forEach(function(cat){
					ulEl.append(new zain.purchasing.views.CategoryItemView({model: cat}).render().el);
				}, this);
				this.$el.append(ulEl);
			}
		}
	});

	return zain.purchasing.views.CategoryItemView;
});