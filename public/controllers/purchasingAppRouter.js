define(['underscore', 'backbone', 'namespace', 'controllers/purchasingAppController'], function (_, Backbone, namespace) {

    namespace.define('zain.purchasing.controllers');

    zain.purchasing.controllers.purchasingAppRouter = Backbone.Router.extend({
        initialize: function () {
            this.appCtrl = zain.purchasing.controllers.purchasingAppController();
        },
        routes: {
            '': 'index'
        },
        index: function () {
            this.appCtrl.showIndex();
        }
    });

    return zain;
});