define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.Footer = Backbone.View.extend({
		className: 'navbar navbar-fixed-bottom navbar-inverse',
		render: function(){
			var html = '<div class="navbar-inner">\
							<div class="container">\
								<p>&copy; 2012 Zain All Right Reserved</p>\
							</div>\
					    </div>';
			this.$el.html(html);

			return this;
		}
	});

	return zain;
});