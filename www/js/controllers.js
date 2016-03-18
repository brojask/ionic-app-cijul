(function() {
    angular.module('starter.controllers', ['starter.services'])
    .controller('AppCtrl', function($scope, $state, $timeout, LoginService, store, jwtHelper, $location, $ionicPopup) {
        $scope.logout = function() {
            LoginService.logout('usuario');
            $state.go('login');
        };
        $scope.$on('$stateChangeStart', function(event, next) {
            console.log('hola');
            var token = store.get("token") || null;
            console.log(token, '-hola');
            if (!token) {
                console.log('no hay token');
                $location.path("/");
                return;
            }
            var bool = jwtHelper.isTokenExpired(token);
            if (bool === true) {
                $ionicPopup.alert({
                    title: 'Expiró su sesión',
                    template: 'Favor ingrese de nuevo con su usuario y su contraseña.'
                });
                store.remove('token');
                $location.path("/");
            }
        });
        //globa use
        var token = store.get("token");
        var tokenPayload = jwtHelper.decodeToken(token);
        $scope.usuario = tokenPayload;
    })
    .controller('LoginCtrl', function($scope, $location, $stateParams, $ionicHistory, $ionicPopup, $state, $rootScope, LoginService) {
        $scope.loginData = {};
        $scope.doLogin = function() {
            var onSuccess = function() {
                $state.go('app.investigaciones');
                $scope.loginData = {};
            };
            var onError = function() {
                $ionicPopup.alert({
                    title: 'Falló Autenticación',
                    template: 'Favor revise su usuario y su contraseña.'
                });
            };
            LoginService.auth($scope.loginData).then(onSuccess, onError);
        };
        $scope.logout = function() {
            LoginService.logout('usuario');
            $state.go('app.login');
        };
    })
    .controller('InvestigacionesCtrl', function($scope, $http, $ionicLoading, Session) {
        var baseUrl = 'http://cijulenlinea.ucr.ac.cr/api/investigaciones/pag/';
        /*//obtenemos el token en localStorage
        var token = store.get("token");
        //decodificamos para obtener los datos del user
        var tokenPayload = jwtHelper.decodeToken(token);
        //los mandamos a la vista como user
        $scope.usuario = tokenPayload;*/
        $scope.investigaciones = [];
        $scope.page = 0;
        $scope.loadMore = function() {
            $ionicLoading.show({
                template: 'Cargando...'
            });
            $http({
                method: 'GET',
                skipAuthorization: false, //es necesario enviar el token
                url: baseUrl + $scope.page,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function(data) {
                angular.forEach(data.response, function(invest) {
                    $scope.investigaciones.push(invest);
                });
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
            $scope.page += 1;
        };
        $scope.doRefresh = function() {
            console.log('refresh :)');
            $scope.investigaciones = [];
            $scope.page = 0;
            $scope.loadMore();
        };
    })
    .controller('InvestigacionCtrl', function($scope, $stateParams, InvestigacionesService) {
        var id = $stateParams.id;
        $scope.investigacion = [];
        InvestigacionesService.get({
            id: id
        }, function(data) {
            $scope.investigacion = data.response;
        });
    })
    .controller('ConsultasCtrl', function($scope, $http, $ionicLoading, store, jwtHelper) {
        var token = store.get("token");
        var userData = jwtHelper.decodeToken(token);
        var baseUrl = 'http://cijulenlinea.ucr.ac.cr/api/consultas/pag/';
        $scope.consultas = [];
        $scope.page = 0;
        $scope.loadMore = function() {
            $ionicLoading.show({
                template: 'Cargando...'
            });
            $http({
                method: 'GET',
                skipAuthorization: false, //es necesario enviar el token
                url: baseUrl + $scope.page,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: {usuario: userData.usuario}
            }).success(function(data) {
                angular.forEach(data.response, function(invest) {
                    $scope.consultas.push(invest);
                });
            }).finally(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            });
            $scope.page += 1;
        };
        $scope.doRefresh = function() {
            console.log('refresh :)');
            $scope.consultas = [];
            $scope.page = 0;
            $scope.loadMore();
        };
    })
    .controller('FaqsCtrl', function($scope) {
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
    })
    .controller('PerfilCtrl', function($scope, $http, store, jwtHelper) {
        var token = store.get("token");
        var userData = jwtHelper.decodeToken(token);        
        $scope.updateProfile = function(profile) {            
            $http({
                method: 'PUT',
                skipAuthorization: false,
                url: 'http://cijulenlinea.ucr.ac.cr/api/profile/' + userData.cedula,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                data: profile
            }).success(function(response) {
                // alert("Joke Updated Successfully");
            }).error(function() {
                console.log("error");
            });
        }
    });
})();