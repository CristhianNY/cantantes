var mod = angular.module('cantantes.controllers.show', []);
mod.controller('Show', function ($scope, $rootScope, $state,db,Comentarios
	) {


	$scope.cristhian = "cristhian bonilla";

	$scope.data = {
		comentarios: [],
		comentario: '',
		loading: true,
		showInfo: false
	};

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
     $scope.inputDown = function(id) {
     	alert("inputDown");
    }
    $scope.inputUp= function(id) {
     	alert("inputUp");
    }

    $rootScope.sendComentario=function(id,comentario){
    
    	  $rootScope.profileImage = db.getFotoDePerfil(id);
 		 $rootScope.profileImage.forEach(function(user) {
 		 	alert("a");

			});

    	  console.log("que esta pasado ");
    	console.log($rootScope.profileImage["1"]);

    	  $scope.coments.$add({"comentario":comentario,





    	  });





    }


 

});