define(['jquery',
        'namespace',
        'eventAggregator',
        'underscore',
        'backbone',
        'bootbox'], function ($, namespace, bus, _, Backbone, bootbox) {

	namespace.define('zain.purchasing.views');
	
	zain.purchasing.views.NewCategoryView = Backbone.View.extend({
        initialize: function(){

        },
		render: function(){
			var html = "<div class='alert create-new-category-error hide'></div>\
                        <label>\
                            Category code\
                            <input type='text' class='new-category-field category-code'></input>\
                        </label>\
                        <label>\
                            Category Name\
                            <input type='text' class='new-category-field category-name'></input>\
                        </label>";
            this.$el.html(html);
            this.$el.css('padding-left','30px');
            this.$el.css('padding-right','30px');

            return this;
		},
        events: {
            'change .category-code': 'setCode',
            'change .category-name': 'setName',
            'blur .category-code': 'validateCode',
            'blur .category-name': 'validateName' 
        },
        setCode: function(e){
            this.model.set('code', $(e.target).val());
        },
        setName: function(e){
            this.model.set('name', $(e.target).val());
        },
        validateCode: function(e)
        {
            console.log(e);
            var val = $(e.target).val();
            if($.trim(val) === ""){
                e.preventDefault();
                $('input.category-code', this.$el).focus();
            }
        },
        validateName: function(e)
        {

        },
		clearError: function() {
			$('div.alert.create-new-category-error').empty();
            $('div.alert.create-new-category-error').hide();
		},
		showError: function(errors) {
            _.each(errors, function(error){
                $('div.alert.create-new-category-error').append('<strong>' + error + '</strong><br/>');
            }, this);
			$('div.alert.create-new-category-error').show();
		}
	});

	return zain.purchasing.views.NewCategoryView;
});