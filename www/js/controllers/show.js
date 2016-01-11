var mod = angular.module('cantantes.controllers.show', []);
mod.controller('Show', function ($scope, $rootScope, $state,db,
	Artistas) {


	$scope.cristhian = "cristhian bonilla";

	

 $scope.verPorId = function(id) {
/*new Firebase('https://cookie7.firebaseio.com/artistas/'+id).once('value', function(snap) {
   console.log('datposs', snap.val());
   $scope.artistaById =  snap.val();
   $scope.nombre = snap.val().email;
   $state.go('app.mostrarbyid');
});*/
 	$rootScope.arti=  db.findArtista(id); 
	console.log($scope.arti);
	

	 $state.go('app.mostrarbyid');
    }
 

});