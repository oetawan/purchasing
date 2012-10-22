(function () {

    var root = this;
    define3rdPartyModules();
    loadPluginsAndBoot();

    function define3rdPartyModules() {
        define('jquery', [], function () { return root.jQuery; });
        define('underscore', [], function () { return root._; });
        define('backbone', [], function () { return root.Backbone; });
    }

    function loadPluginsAndBoot() {
        requirejs(['/lib/jstree/jquery.jstree.js',
                   '/lib/jstree/_lib/jquery.cookie.js',
                   '/lib/jstree/_lib/jquery.hotkeys.js'], boot);
    }

    function boot() {

        requirejs.config({
            baseUrl: '/'
        });

        require(['jquery', 'underscore', 'backbone', 'controllers/purchasingAppRouter'], function ($, _, Backbone) {
            $(function () {
                var appRouter = new zain.purchasing.controllers.purchasingAppRouter();
                Backbone.history.start();
            });
        });
    }

})();