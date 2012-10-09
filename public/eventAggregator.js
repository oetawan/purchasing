define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('oac.purchasing');

    oac.purchasing.eventAggregator = oac.purchasing.eventAggregator || _.extend({}, Backbone.Events);

});