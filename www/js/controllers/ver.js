var mod = angular.module('cantantes.controllers.ver', []);
mod.controller('Ver', function ($scope, $rootScope, $state,db,Comentarios,$stateParams, $ionicLoading,$firebaseArray
	) {


	$scope.cristhian = "cristhian bonilla";

	$scope.data = {
		comentarios: [],
		comentario: '',
		loading: true,
		showInfo: false
	};


    var categoria = $stateParams.categoria;
    

   



var pais = $rootScope.pais;
var ciudad = $rootScope.ciudad;
var genero = categoria;


        $ionicLoading.show({
          template: 'buscando'
        });

 db.list(pais,ciudad,genero).then(function(data){

  var grupos =[];
  var codigos =[];
  var datosParaVer ={};
  $ionicLoading.hide();
 


  data.forEach(function(childSnapshot) {
      
      
         var refw = new Firebase("https://cookie7.firebaseio.com/artistas/"+childSnapshot);

         dato = $firebaseArray(refw);

         //(console.log(dato);
          codigos.push(childSnapshot);
         grupos.push(dato);

       
        $rootScope.codigos = codigos;
         $rootScope.artistasR =grupos;

         console.log("cristhian esto es "+$rootScope.artistasR+ $rootScope.codigos+"este es el grupo");

     });
          console.log(grupos);


  //$rootScope.artistasR = data;
   //console.log(data);
   $state.go('app.mostrar');
},function(error){

  
   $ionicLoading.hide();
});
     






 

});