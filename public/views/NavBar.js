define(['jquery', 'underscore', 'backbone', 'namespace'], function ($, _, Backbone, namespace) {

    namespace.define('zain.purchasing.views');

    zain.purchasing.views.NavBar = Backbone.View.extend({
        tagName: 'div',
        className: 'navbar navbar-fixed-top navbar-shipopr',
        initialize: function () {
            this.model.on('change', this.displayUser, this);
        },
        render: function () {
            this.$el.empty();
            this.renderNavBarInner();
            this.renderContainerFluid();
            this.renderNavCollapse();
            this.displayUser();

            return this;
        },
        renderNavBarInner: function () {
            this.$el.append('<div class="navbar-inner"></div>');
        },
        renderContainerFluid: function () {
            var containerFluid = $('<div class="container-fluid"></div>');
            containerFluid.append('<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\
                                     <span class="icon-bar"></span>\
                                     <span class="icon-bar"></span>\
                                     <span class="icon-bar"></span>\
                                   </a>');
            containerFluid.append('<a class="brand" href="#">Zain P.O</a>');
            $('div.navbar-inner', this.$el).append(containerFluid);
        },
        renderNavCollapse: function () {
            var navCollapse = $('<div class="nav-collapse collapse"></div>');
            navCollapse.append('<ul class="nav pull-right">\
                                  <li class="dropdown">\
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">\
                                        <img alt="Gravatar" src="https://secure.gravatar.com/avatar/603313ab758e70108edfb7a5f3a15383.png?d=mm&r=R&s=18"/>\
                                        &nbsp;\
                                        <span class="userid"></span>\
                                        &nbsp;\
                                        <b class="caret"></b>\
                                    </a>\
                                    <ul class="dropdown-menu dropdown-menu-shipopr">\
                                        <li>\
                                            <a href="/logout">\
                                                <i class="icon-off"></i>\
                                                &nbsp;\
                                                Log out\
                                                &nbsp;\
                                            </a>\
                                        </li>\
                                    </ul>\
                                  </li>\
                                </ul>');
            $('div.container-fluid', this.$el).append(navCollapse);
        },
        displayUser: function () {
            $('span.userid', this.$el).html(this.model.get('username'));
        }
    });

    return zain;
});