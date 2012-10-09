define(['underscore', 'backbone', 'namespace', 'controllers/purchasingAppController'], function (_, Backbone, namespace) {

    namespace.define('oac.purchasing.controllers');

    oac.purchasing.controllers.purchasingAppRouter = Backbone.Router.extend({
        initialize: function () {
            this.appCtrl = oac.purchasing.controllers.purchasingAppController();
        },
        routes: {
            '': 'index'
        },
        index: function () {
            this.appCtrl.showIndex();
        }
    });

    return oac;
});