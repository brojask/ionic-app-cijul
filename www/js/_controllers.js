(function() {
    angular.module('starter.controllers', ['starter.services'])

            .controller('AppCtrl', function($scope, $state, $ionicModal, $ionicPopup, $timeout, LoginService) {
                
                $scope.loginData = {};
                /*// Create the login modal that we will use later
                $ionicModal.fromTemplateUrl('templates/login.html', {
                    scope: $scope
                }).then(function(modal) {
                    $scope.modal = modal;
                });

                // Triggered in the login modal to close it
                $scope.closeLogin = function() {
                    $scope.modal.hide();
                };

                // Open the login modal
                $scope.login = function() {
                    $scope.modal.show();
                };
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                /*$timeout(function() { 
                 $scope.closeLogin();                       
                 }, 1000);*/
                
                $scope.doLogin = function() {
                    var onSuccess = function () {                        
                        $state.go('app.investigaciones');  
                        $scope.loginData = {};
                        //console.log('Autenticado'); 
                    };
                    var onError = function () {
                        $ionicPopup.alert({
                             title: 'Falló Autenticación',
                             template: 'Favor revise su usuario y su contraseña. <br> Inténtelo nuevamente.'
                           });
                    };
                    LoginService.auth($scope.loginData).then(onSuccess, onError);
                };
                 $scope.logout = function() {                    
                    LoginService.logout('usuario');
                    $state.go('app.login');  
                };
            })

            .controller('PlaylistsCtrl', function($scope) {
                $scope.playlists = [
                    {title: 'Reggae', id: 1},
                    {title: 'Chill', id: 2},
                    {title: 'Dubstep', id: 3},
                    {title: 'Indie', id: 4},
                    {title: 'Rap', id: 5},
                    {title: 'Cowbell', id: 6}
                ];
            })

            .controller('PlaylistCtrl', function($scope, $stateParams) {
                $scope.myid = $stateParams.id;
                console.log($stateParams.playlistId);
            })

            /*.controller('InvestigacionesCtrl', function($scope, $http, InvestigacionesService) {
             $scope.investigaciones = [];
             InvestigacionesService.get(function(data) {
             $scope.investigaciones = data.response;        
             });
             })*/

            .controller('InvestigacionesCtrl', function($scope, $http, $ionicLoading, Session) {
                var baseUrl = 'http://cijulenlinea.ucr.ac.cr/app/api/pag/';
                $scope.usuario = Session.get('usuario');
                $scope.investigaciones = [];
                $scope.page = 0;
                $scope.loadMore = function() {
                    $ionicLoading.show({template: 'Cargando...'});
                    $http.get(baseUrl + $scope.page)
                            .success(function(data) {
                                angular.forEach(data.response, function(invest) {
                                    $scope.investigaciones.push(invest);
                                });
                            })
                            .finally(function() {
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

                /*$scope.$on('$stateChangeSuccess', function() {
                 $scope.loadMore();
                 });*/

            })

            .controller('InvestigacionCtrl', function($scope, $stateParams, InvestigacionesService) {
                var id = $stateParams.id;
                //console.log($stateParams.id);
                $scope.investigacion = [];
                InvestigacionesService.get({id: id}, function(data) {
                    $scope.investigacion = data.response;
                });
            });

})();