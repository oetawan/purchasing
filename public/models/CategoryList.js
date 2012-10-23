define(['underscore', 'backbone', 'namespace', 'models/Category'], function (_, Backbone, namespace, Category) {

    namespace.define('zain.purchasing.models');

    zain.purchasing.models.CategoryList = Backbone.Collection.extend({
        url: '/categories',
        model: Category
    });
    
    return zain.purchasing.models.CategoryList;
});