define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing');

    zain.purchasing.eventAggregator = zain.purchasing.eventAggregator || _.extend({}, Backbone.Events);

    return zain.purchasing.eventAggregator;
});