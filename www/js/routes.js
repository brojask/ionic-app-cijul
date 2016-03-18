angular.module('starter', ['ionic', 'starter.controllers', 'angular-jwt'])
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, jwtInterceptorProvider) {
    
    $ionicConfigProvider.backButton.text('');
    
    
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    /*$httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};*/

    //$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    jwtInterceptorProvider.tokenGetter = function() {
        return localStorage.getItem('token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    }).state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    }).state('registrarse', {
        url: '/registrarse',
        templateUrl: 'templates/registrarse.html',
        //controller: 'AppCtrl'
    }).state('app.investigaciones', {
        url: '/investigaciones',
        views: {
            'menuContent': {
                templateUrl: 'templates/investigaciones.html',
                controller: 'InvestigacionesCtrl'
            }
        }
    }).state('app.investigacion', {
        url: '/investigacion/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/investigacion.html',
                controller: 'InvestigacionCtrl'
            }
        }
    }).state('app.consultas', {
        url: '/consultas',
        views: {
            'menuContent': {
                templateUrl: 'templates/consultas.html',
                controller: 'ConsultasCtrl'
            }
        }
    }).state('app.ayuda', {
        url: '/ayuda',
        views: {
            'menuContent': {
                templateUrl: 'templates/ayuda.html',
                //controller: 'InvestigacionCtrl'
            }
        }
    }).state('app.faqs', {
        url: '/faqs',
        views: {
            'menuContent': {
                templateUrl: 'templates/faqs.html',
                controller: 'FaqsCtrl'
            }
        }
    }).state('app.sugerencias', {
        url: '/sugerencias',
        views: {
            'menuContent': {
                templateUrl: 'templates/sugerencias.html',
                //controller: 'FaqsCtrl'
            }
        }
    })
    .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil.html',
                controller: 'PerfilCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/');
});
