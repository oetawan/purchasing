define(['jquery',
        'namespace',
        'eventAggregator',
        'views/NavBar',
        'views/Footer',
        'models/User'], function ($, namespace) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.purchasingAppController = function () {
	    var showIndex = function () {
    	    $('body').empty();
	        var user = new zain.purchasing.models.User();
            user.get();
            $('body').append(new zain.purchasing.views.NavBar({ model: new Backbone.Model({username: user.username}) }).render().el);
            $('body').append(new zain.purchasing.views.Footer().render().el);            
        }

        return {
 	       showIndex: showIndex
       	};
	}

    return zain;
});