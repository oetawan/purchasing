define(['jquery',
        'namespace',
        'eventAggregator',
        'views/NavBar',
        'views/Footer',
        'views/HeaderPO',
        'views/Panel',
        'views/SubNav',
        'views/CategoryProductView',
        'views/CategoryListView',
        'views/ProductListView',
        'models/User',
        'models/CategoryList',
        'underscore',
        'backbone',
        'bootbox'], function ($, namespace, bus, NavBar, Footer, HeaderPO, Panel, SubNav, CategoryProductView, CategoryListView, ProductListView, User, CategoryList, _, Backbone, bootbox) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.purchasingAppController = function () {
        
        var getProductsExample = function(){
            var products = new Backbone.Collection();
            products.reset([
                new Backbone.Model({
                    'name': 'iPod Touch', 
                    'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    'price': 500,
                    'imageUrl': 'img/ipodtouch_image2_20080909.jpg',
                    'ccySymbol': '$'
                }),
                new Backbone.Model({
                    'name':'iPhone 5', 
                    'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    'price': 900,
                    'imageUrl': 'img/ipodtouch_image2_20080909.jpg',
                    'ccySymbol': '$'
                }),
                new Backbone.Model({
                    'name':'Samsung Galaxy S3', 
                    'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    'price': 650,
                    'imageUrl': 'img/ipodtouch_image2_20080909.jpg',
                    'ccySymbol': '$'
                })
            ])

            return products;
        };

        var user = new User().get(),
            navBar = new NavBar({ model: new Backbone.Model({username: user.username}) }),
            headerPO = new HeaderPO(),
            subNav = new SubNav(),
            catList = new CategoryList(),
            categoryListView = new CategoryListView({collection: catList}),
            productListView = new ProductListView({collection: getProductsExample()}),
            categoryProductView = new CategoryProductView({
                categoryListView: categoryListView,
                productListView: productListView
            }),
            footer = new Footer(),
            mainPanel = new Panel({items:[headerPO, subNav, categoryProductView]}),

        loadData = function(){
            catList.fetch({
                beforeSend: function(){
                    $(".categorylistview").mask("Loading...");
                },
                complete: function(){
                    $(".categorylistview").unmask();
                }
            });
        },

	    showIndex = function () {
            $('body').empty();
            $('body').append(navBar.render().el);
            $('body').append(mainPanel.render().el);
            $('body').append(footer.render().el);

            loadData();
        };

        bus.on('category:new', function(){
            var html = "<input type='text'></input>";
            bootbox.dialog(html, {
                "label" : "Click me!",
                "class" : "primary",   // or primary, or danger, or nothing at all
                "callback": function() {
                    console.log("great success");
                }
            });
        }, this);

        return {
 	       showIndex: showIndex
       	};
	}

    return zain.purchasing.controllers.purchasingAppController;
});