angular.module('starter', ['ionic', 'starter.controllers', 'angular-jwt', 'angular-storage'])
.run(function($ionicPlatform, $rootScope, $state, $ionicHistory, jwtHelper, store, $location) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})