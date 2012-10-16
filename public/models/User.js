define(['underscore', 'backbone', 'namespace'], function (_, Backbone, namespace) {

    namespace.define('zain.purchasing.models');

    zain.purchasing.models.User = function(){};
    zain.purchasing.models.User.prototype = function(){
        
        var fetchingData;
        
        getUser = function(){
            var self = this;      
            if(fetchingData)
                fetchingData.abort();
            
            fetchingData = $.ajax('/user', {
                type: 'GET',
                cache: false,
                dataType: 'json',
                async: false,
                complete: function(){
                    fetchingData = null;
                },
                success: function(data, status, xhr){
                    self.username = data.username;
                }
            });
        }

        return {
            get: getUser
        }
    }();

    return zain;
});