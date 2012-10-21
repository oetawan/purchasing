define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.SubNav = Backbone.View.extend({
		className: 'row-fluid subnav',
		render: function(){
			this.$el.empty();
			this.renderContainer();
			this.renderSearchBar();
			return this;
		},
		renderContainer: function(){
			this.$el.append("<div class='span12'>\
							 	<div class='navbar'>\
								 	<div class='navbar-inner'>\
								 		<div class='container' style='width: auto'>\
								 			<a class='btn btn-navbar' data-toggle='collapse' data-target='.nav-collapse'>\
							  					<span class='icon-bar'></span>\
							  					<span class='icon-bar'></span>\
							  					<span class='icon-bar'></span>\
											</a>\
											<div class='nav-collapse'></div>\
								 		</div>\
								 	</div>\
								</div>\
							 </div>");
		},
		renderSearchBar: function(){
			var html = '<ul class="nav pull-right">\
							<li class="divider-vertical"></li>\
							<form class="navbar-search" action="">\
								<input type="text" class="search-query search-form span2" placeholder="Search">\
								<button class="btn btn-info btn-small search_btn" type="submit">Go</button>\
							</form>\
						 </ul>';
			$('.nav-collapse', this.$el).append(html);
		}
	});

	return zain.purchasing.views.SubNav;
});