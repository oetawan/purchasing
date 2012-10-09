define(['jquery',
        'namespace',
        'eventAggregator',
        'views/NavBar'], function ($, namespace) {

	namespace.define('oac.purchasing.controllers');

    oac.purchasing.controllers.purchasingAppController = function () {
	    var showIndex = function () {
    	    $('body').empty();
	        //var account = shipopr.models.account();
            $('body').append(new oac.purchasing.views.NavBar({ model: new Backbone.Model({username: 'oetawan'}) }).render().el);
        }

        return {
 	       showIndex: showIndex
       	};
	}

    return oac;
});