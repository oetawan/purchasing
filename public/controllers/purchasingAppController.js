define(['jquery',
        'namespace',
        'eventAggregator',
        'views/NavBar',
        'views/Footer',
        'views/HeaderPO',
        'views/Panel',
        'views/SubNav',
        'models/User'], function ($, namespace, bus, NavBar, Footer, HeaderPO, Panel, SubNav, User) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.purchasingAppController = function () {
        var user = new User().get(),
            navBar = new NavBar({ model: new Backbone.Model({username: user.username}) }),
            headerPO = new HeaderPO(),
            subNav = new SubNav();
            footer = new Footer(),
            mainPanel = new Panel({items:[headerPO, subNav]});

	    showIndex = function () {
            $('body').empty();
            $('body').append(navBar.render().el);
            $('body').append(mainPanel.render().el);
            $('body').append(footer.render().el);
        };

        return {
 	       showIndex: showIndex
       	};
	}

    return zain;
});