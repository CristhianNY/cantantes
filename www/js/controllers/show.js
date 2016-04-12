var mod = angular.module('cantantes.controllers.show', []);
mod.controller('Show', function ($scope, $rootScope, $state,db,Comentarios,$stateParams
	) {


	$scope.cristhian = "cristhian bonilla";

	$scope.data = {
		comentarios: [],
		comentario: '',
		loading: true,
		showInfo: false
	};


    var categoria = $stateParams.categoria;
    console.log(categoria);

     //getting fooVal
    

 $scope.readMore= function(){

   $scope.mostrar == true;

  }


 $scope.verPorId = function(id) {
/*new Firebase('https://cookie7.firebaseio.com/artistas/'+id).once('value', function(snap) {
   console.log('datposs', snap.val());
   $scope.artistaById =  snap.val();
   $scope.nombre = snap.val().email;
   $state.go('app.mostrarbyid');
});*/
 	$rootScope.arti=  db.findArtista(id); 
	 console.log($scope.arti);
   $scope.sprocketInfo = 
            $http.get("app/mostrarbyid" + $stateParams.id)
                .then(function(res){ return res.data; });


                console.log($scope.sprocketInfo);
	

	 $state.go('app.mostrarbyid');
    }
     $scope.inputDown = function(id) {
     	alert("inputDown");
    }
    $scope.inputUp= function(id) {
     	alert("inputUp");
    }

    $rootScope.sendComentario=function(comentario,idArtista){

    console.log("probando"+ $rootScope.Usuario1);
    
    console.log(idArtista+"esto es el id artista");
    console.log(comentario+"comentario");
    console.log("cristhian bonilla es id"+window.localStorage['identificador'] || 'you');
  
   var id_User = window.localStorage['identificador'] || 'you';

        $scope.email="";
        $scope.name="";
        $scope.imgPerfil="";
        $scope.userId="";
    	  $rootScope.profileImage = db.getFotoDePerfil(id_User);
 		 $rootScope.profileImage.once("value", function(snapshot) {

     
  // The callback function will get called twice, once for "fred" and once for "barney"
  snapshot.forEach(function(childSnapshot) {
  console.log("entramos por aca para ver que pasa ");
    // key will be "fred" the first time and "barney" the second time
  
    var key = childSnapshot.key();
    console.log(key);
    // childData will be the actual contents of the childData
    if(key == "email"){
     $scope.email = childSnapshot.val();

    }
      if(key == "name"){

       $scope.name = childSnapshot.val();
    }
     if(key == "picture"){
        $scope.imgPerfil = childSnapshot.val();

        console.log(key);
    
     }
       if(key == "userId"){

       $scope.userId = childSnapshot.val();
    }

    console.log($scope.email);
    console.log($scope.name);
    console.log($scope.imgPerfil);
    console.log($scope.userId);

   if(($scope.email!="")&&( $scope.name!="")&&( $scope.imgPerfil!="")&&($scope.userId!="")){

    console.log("por aca si entro al if de comentario");
     
    console.log(comentario);
    console.log($scope.imgPerfil);
    console.log($scope.name);
    console.log($scope.userId);
    console.log(idArtista);

      $scope.coments.$add({"comentario":comentario,
                            "imgPerfil":$scope.imgPerfil,
                            "name":$scope.name,
                            "userId":$scope.userId,
                            "idArtista":idArtista


        });
    }else{
      console.log("a ese if no entro ");
    }
 
  });
});







    }


 

});