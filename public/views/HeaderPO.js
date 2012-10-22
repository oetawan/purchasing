define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.HeaderPO = Backbone.View.extend({
		className: 'row header-po',
		render: function(){
			this.$el.empty();
			this.renderLogo();
			this.renderCart();
			return this;
		},
		renderLogo: function(){
			this.$el.append("<div class='span4'><h1>Purchase Order</h1></div>");
		},
		renderCart: function(){
			this.$el.append("<div class='span8'>\
							    <div class='span5'> </div>\
							    <div class='span2 pull-right cart'>\
									<a href='#'><h4>Order</h4></a>\
									<a href='#'>3 Item(s) - $40</a>\
								</div>\
								<div class='span1 pull-right'>\
									<h4>Currency</h4>\
									<a href='#'>IDR</a> | \
									<a href='#'>USD</a>\
								</div>\
							 </div>");
		}
	});

	return zain.purchasing.views.HeaderPO;
});