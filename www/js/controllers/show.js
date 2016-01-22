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

    $rootScope.sendComentario=function(id,comentario,idArtista){


        $scope.email="";
        $scope.name="";
        $scope.imgPerfil="";
        $scope.userId="";
    	  $rootScope.profileImage = db.getFotoDePerfil(id);
 		 $rootScope.profileImage.once("value", function(snapshot) {
  // The callback function will get called twice, once for "fred" and once for "barney"
  snapshot.forEach(function(childSnapshot) {
    // key will be "fred" the first time and "barney" the second time
  
    var key = childSnapshot.key();
    console.log(key);
    // childData will be the actual contents of the child
    if(key == "email"){
     $scope.email = childSnapshot.val();

    }
      if(key == "name"){

       $scope.name = childSnapshot.val();
    }
     if(key == "profilePic"){
        $scope.imgPerfil = childSnapshot.val();
    
     }
       if(key == "userId"){

       $scope.userId = childSnapshot.val();
    }

    if(($scope.email!="")&&( $scope.name!="")&&( $scope.imgPerfil!="")&&($scope.userId!="")){
    
      $scope.coments.$add({"comentario":comentario,
                            "imgPerfil":$scope.imgPerfil,
                            "name":$scope.name,
                            "userId":$scope.userId,
                            "idArtista":idArtista


        });
    }
 
  });
});







    }


 

});