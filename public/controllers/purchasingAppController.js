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
        'underscore',
        'backbone'], function ($, namespace, bus, NavBar, Footer, HeaderPO, Panel, SubNav, CategoryProductView, CategoryListView, ProductListView, User, _, Backbone) {

	namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.purchasingAppController = function () {
        var getCategoriesExample = function() {
            var cats = new Backbone.Collection();
            cats.add(new Backbone.Model({
                code: 'DESC',
                name: 'Desktop',
                categories: [
                    new Backbone.Model({
                        code: 'PC',
                        name: 'Pc',
                        categories: [
                            new Backbone.Model({
                                code: 'LEN',
                                name: 'Lenovo'
                            })        
                        ]
                    }),
                    new Backbone.Model({
                        code: 'MAC',
                        name: 'Mac'
                    })
                ]
            }));
            cats.add(new Backbone.Model({
                code: 'LNB',
                name: 'Laptop & Notebook'
            }));
            cats.add(new Backbone.Model({
                code: 'ACS',
                name: 'Acessories'
            }));
            cats.add(new Backbone.Model({
                code: 'SP',
                name: 'Smart Phone'
            }));

            return cats;
        };

        var getProductsExample = function(){
            var products = new Backbone.Collection();
            products.reset([
                new Backbone.Model({
                    name:'iPod Touch', 
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    price: 500,
                    imageUrl: 'img/ipodtouch_image2_20080909.jpg',
                    ccySymbol: '$'
                }),
                new Backbone.Model({
                    name:'iPhone 5', 
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    price: 900,
                    imageUrl: 'img/ipodtouch_image2_20080909.jpg',
                    ccySymbol: '$'
                }),
                new Backbone.Model({
                    name:'Samsung Galaxy S3', 
                    description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
                    price: 650,
                    imageUrl: 'img/ipodtouch_image2_20080909.jpg',
                    ccySymbol: '$'
                })
            ])

            return products;
        };

        var user = new User().get(),
            navBar = new NavBar({ model: new Backbone.Model({username: user.username}) }),
            headerPO = new HeaderPO(),
            subNav = new SubNav(),
            categoryListView = new CategoryListView({collection: getCategoriesExample()}),
            productListView = new ProductListView({collection: getProductsExample()}),
            categoryProductView = new CategoryProductView({
                categoryListView: categoryListView,
                productListView: productListView
            }),
            footer = new Footer(),
            mainPanel = new Panel({items:[headerPO, subNav, categoryProductView]}),

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

    return zain.purchasing.controllers.purchasingAppController;
});