var mod = angular.module('cantantes.controllers.menu', []);

mod.controller('MenuCtrl', function($scope,
									$ionicModal, 
									$state,
									$ionicActionSheet,
									$ionicLoading,
									UserService,
									$rootScope,
									db,
									FIREBASE_URL,
									Artistas,
									Likes,
									Img,
									$firebaseArray,
									$cordovaCamera,
									$ionicSlideBoxDelegate) {



	 $ionicModal.fromTemplateUrl('templates/contacto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/youtube.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
   $ionicModal.fromTemplateUrl('templates/comentarios.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
	 
  	$scope.show = {};
    $scope.contador = 0;
	$scope.images = [];
	$scope.artistas = Artistas;
	$scope.megustas = Likes;
	$scope.imagenes = Img;
	$scope.estado = 0;
	console.log($rootScope.Usuario1+"siii o no?");
    //$scope.artista= db.list();
  var usuarioL = UserService.getUser();
  console.log("hola"+usuarioL.userId);


	var messagesRef = new Firebase(FIREBASE_URL);

	$scope.logout = function () {
		UserService.logoutUser();
		$state.go('login');
	};
		$scope.contactar = function () {

		 $scope.modal.show();
	};
		$scope.youtube = function () {
		 $scope.modal1.show();
	};
		$scope.closeYoutube = function () {
		 $scope.modal1.hide();
	};
		$scope.closeContactar = function () {
		 $scope.modal.hide();
	};
	$scope.comentarios = function(id){
			$scope.idArtista = id;
			$scope.coments = db.getComentarios($scope.idArtista);
			 $scope.modal2.show(id);
	}
	$scope.closeComentarios = function(){

			 $scope.modal2.hide();
	}
	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData(); 
	$scope.likes = function (idArtista){

 		var result = [];

	//result= db.getLikes(idArtista);

	console.log(result.length);

	return result;

	}

	$scope.darLike = function(idArtista,like){

	$scope.consultarLikes = db.getLikes(idArtista);

	var numero = $firebaseArray($scope.consultarLikes).$loaded().then(function(num){

			

	if(num.length>0){
		$scope.consultarLikes.once("value", function(snapshot) {

			
  			snapshot.forEach(function(childSnapshot) {
  				alert("se metio");

  				 var key = childSnapshot.key();
				 var usrLike = childSnapshot.val();
  				 if((key == "idUser")&&(usrLike == $scope.user)){
     			alert("ya le diste like");
     			$scope.leDiste = false;
     				return true;
     			}

    		

 		 })

		});
		if($scope.leDiste =="undefined"){

			alert($scope.user);

     				alert("no le has dado like");
     					var agregarLike=$firebaseArray($scope.consultarLikes);

				agregarLike.$add({"idArtista":idArtista,
                            "idUser":$scope.user


        });
        var insertarLike= new Firebase('https://cookie7.firebaseio.com/artistas/'+idArtista);
	
		var dato = like+1;
		
	insertarLike.update({ 'like':dato}); 
			

     			}else{

     				alert("ya le diste");
     			}

	}else{
		alert("no hay likes asi ");
			var agregarLike=$firebaseArray($scope.consultarLikes);

				agregarLike.$add({"idArtista":idArtista,
                            "idUser":$scope.user


        }); 
				var insertarLike= new Firebase('https://cookie7.firebaseio.com/artistas/'+idArtista);
	
		var dato = like+1;
		
	insertarLike.update({ 'like':dato});


	}
		
		});
		
	

		
		
		

		
	


		//console.log(consultarLikes);

		/*consultarLikes.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {

        alert(childSnapshot.key());
        alert(childSnapshot.val());
    })
		});*/


		/*$scope.megustas.$add({

			'idUser': $scope.user,
			'idArtista':idArtista
		})*/
	    		
		
		
		
	}


	$scope.crearArtista = function(form){
		
		if(form.$valid){
		if($scope.images.length >0){
			var tamaño =  $scope.artistas.length;
			var like=0;
			var id  = tamaño +1;
			//alert($scope.user);
			/*alert($scope.formData.nombre);
			alert($scope.formData.telefono);
			alert($scope.formData.whatsapp);
			alert($scope.formData.email);
			alert($scope.formData.url);
			alert($scope.formData.video);
			alert($scope.formData.categoria);
			alert($scope.formData.descripcio);
			alert($scope.images);
			alert( $scope.estado);
			alert($scope.user);
			alert(like);*/
		var NewArtista = new Firebase("https://cookie7.firebaseio.com/artistas");
		var ids = new Firebase("https://cookie7.firebaseio.com/ids/-KBQmIt5SUBwftMnmr4t");

		var agregarArtista = $firebaseArray(NewArtista);
			ids.once("value", function(snapshot) {
  console.log(snapshot.val().id);
  var id = snapshot.val().id+1;

  agregarArtista.$add({
  		"id":id,
        "nombreArtista": $scope.formData.nombre,
        "telefono":$scope.formData.telefono,
        "whatsapp":$scope.formData.whatsapp,
        "email":$scope.formData.email,
        "url":$scope.formData.url,
        "video":$scope.formData.video,
        "categoria":$scope.formData.categoria+'medellin'+'colombia',
        "descripcion":$scope.formData.descripcion,	
        "images":$scope.images,
        "estado":$scope.estado,
        "idUser" : $rootScope.Usuario1,         
        "like": like
      }).then(function(){
	   ids.update({ 'id':id}); 
      	
		$state.go('app.mostrar');
      });
	 
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


		

	
	 }else{

	alert("por favor seleccione una foto");
		}
}else{
	alert("formulario invalido");
}
	}

	


	$scope.idYouTube = function(url){

 			var regex = new RegExp(/(?:\?v=)([^&]+)(?:\&)*/);

		    var id = regex.exec(url);
		 

		$scope.idYou="https://www.youtube.com/embed/"+id[1];
		
	}
	$scope.addImage = function (){
		$scope.contador = $scope.contador+1;

		var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };

        	$cordovaCamera.getPicture(options).then(function(imageData){
			//$scope.formData.picture = imageData;
			if($scope.images.length <=3 ){
				$scope.images.push(imageData);
			}else{
				$ionicPopup.alert({
				title:'Solo se permiten 4 fotos',
				subTitle:''
			});
			}
		},function (err){
			console.error(err);
			$ionicPopup.alert({
				title:'error al tomar la foto',
				subTitle:'estamos teniendo problemas para entender esto'
			});
		});
	}
	$scope.user = UserService.getUser().then(function (d){

		
	});
 	$scope.quitarFoto = function(img){
	var index = $scope.images.indexOf(img);
	    if (index > -1){
	    	$scope.images.splice(index, 1);
	    }

  $scope.contador = $scope.images.length;

	}
	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Esta seguro Que deseas  salir?',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Saliendo...'
				});
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('login');
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};


});