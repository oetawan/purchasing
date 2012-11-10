define(['underscore', 'backbone', 'namespace'], function (_, Backbone, namespace) {

    namespace.define('zain.purchasing.models');

    zain.purchasing.models.Category = Backbone.Model.extend({
        urlRoot: '/categories',
        defaults: {
            code: '',
            name: ''
        }
    });
    
    return zain.purchasing.models.Category;
});