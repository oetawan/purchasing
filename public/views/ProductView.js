define(['jquery', 
		'underscore', 
		'backbone', 
		'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.ProductView = Backbone.View.extend({
		className: 'row productview',
		render: function(){
			this.$el.empty();
			this.renderImage();
			this.renderDescription();
			this.renderPrice();
			this.renderAction();

			return this;
		},
		renderImage: function(){
			var html = _.template(
				'<div class="span1">\
				 	<a href="#"">\
				 		<div class="image-content"><img alt="<%= name %>" src="<%= imageUrl %>"></img></div>\
				 	</a>\
				 </div>', this.model.toJSON());
			this.$el.append(html);
		},
		renderDescription: function(){
			var html = _.template(
				'<div class="span6">\
	   				<a href="#"><h5><%= name %></h5></a>\
              		<p><%= description %></p>\
	  			</div>', this.model.toJSON());
			this.$el.append(html);
		},
		renderPrice: function(){
			var html = _.template(
				'<div class="span1">\
	   			 	<p><%= ccySymbol %><%= price %></p>\
	  			 </div>', this.model.toJSON());	
			this.$el.append(html);
		},
		renderAction: function()
		{
			var html = _.template(
				'<div class="span2">\
		   			<p><a class="btn btn-primary" href="#">Add to order</a></p>\
		  		</div>', this.model.toJSON());
			this.$el.append(html);
		}
	});

	return zain.purchasing.views.ProductView;
});