angular.module('starter.services', ['ngResource', 'angular-storage'])
.factory('InvestigacionesService', function($resource) {
    var baseUrl = 'http://cijulenlinea.ucr.ac.cr/api/investigaciones/';
    return $resource(baseUrl + ':id', {
        id: "@_id"
    }, {
        update: {
            method: 'PUT',
            params: {
                id: "@_id"
            }
        }
    });
})
.factory('PagService', function($resource) {
    var baseUrl = 'http://cijulenlinea.ucr.ac.cr/app/api/pag/';
    return $resource(baseUrl + ':pag', {
        pag: "@pag"
    });
})
.factory('TemplateService', function($resource) {
    var baseUrl = 'http://cijulenlinea.ucr.ac.cr/app/api/pag/';
    return $resource(baseUrl + ':pag', {
        pag: "@pag"
    });
})
.factory("InvestService", ["$http", "$q", "CONFIG", function($http, $q, CONFIG)
{
    return{
        get: function()
        {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                skipAuthorization: false, //es necesario enviar el token
                url: CONFIG.APIURL+'/movies',
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            .then(function(res)
            {
                deferred.resolve(res);
            })
            .then(function(error)
            {
                deferred.reject(error);
            })
            return deferred.promise;
        }
    }
}])
.factory('LoginService', function($http, $q, $resource, Session, store) {    
    return {
        auth: function(data) {
            var request = {
                method: 'POST',
                url: 'http://cijulenlinea.ucr.ac.cr/api/auth/login/',
                skipAuthorization: true, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'                    
                },
                data: 'usuario=' + data.usuario + '&password=' + data.password
            };
            return $http(request).then(function(response) {
                var deferred = $q.defer();                
                if (response.data.code == 0) {                    
                    //localStorage.setItem('user', response.data.response.token);
                    store.set('token', response.data.response.token);
                    deferred.resolve();                    
                } else {                    
                    deferred.reject();
                }
                return deferred.promise;
            });
        },
        logout: function() {
            Session.destroy('usuario');
            //Session.destroy('cedula');
            //Session.destroy('nombre');
        }
    }
})
.factory('Session', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        destroy: function() {
            localStorage.clear();
        }
    }
}])

;
/*!
Inyectar al Ctrl, 
var promesa = ServicePost.getPosts();
promesa.then(function(data){
    $scope.posts = data.posts;
},function(error){
    alert(error);
});
/**************************************************/
/*
.service('ServicePosts', function ($resource) {
    
    this.getPosts = function () {
        var defer = $q.defer();
        $http.get('posts/get')
        .succes(function(data){
            defer.resolve(data);
        })
        .error(function(err){
            defer.reject(data);
        })
        return defer.promise(); 
    }
});*/