define(['underscore', 'backbone', 'namespace'], function (_, Backbone, namespace) {

    namespace.define('zain.purchasing.models');

    zain.purchasing.models.Category = Backbone.Model.extend({
        urlRoot: '/categories',
        defaults: {
            code: 'NONE',
            name: 'NONE'
        }
    });
    
    return zain.purchasing.models.Category;
});