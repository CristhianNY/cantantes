var mod = angular.module('cantantes.controllers.home', []);
mod.controller('Inicio', function ($scope,
									$ionicModal, 
									$state,
									$ionicActionSheet,
									$ionicLoading,
									UserService,
									db,
									FIREBASE_URL,
									Artistas,
									Likes,
									Img,
									$firebaseArray,
									$cordovaCamera,
									$ionicSlideBoxDelegate) {
 
    

	$scope.artista= db.list();

 

});