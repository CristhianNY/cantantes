var mod = angular.module('cantantes.controllers.menu', []);

mod.controller('MenuCtrl', function($scope,
									$ionicModal, 
									$state,
									$ionicActionSheet,
									$ionicLoading,
									UserService,
									db,
									FIREBASE_URL,
									Artistas,
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
	$scope.artista= db.list(); 
  	$scope.show = {};
    $scope.contador = 0;
	$scope.images = [];
	$scope.artistas = Artistas;
	$scope.estado = 0;
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
	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'category': '',
			'calories': 29,
			'picture': null
		};
	};
	$scope.resetFormData();
	$scope.crearArtista = function(form){
	
			//console.log("MenuCtrl");
			//$ionicLoading.show();
	
			/*Creador.crear($scope.formData).then(function(){
				$scope.resetFormData();
				$ionicLoading.hide();
				form.$setPristine(true);
				$state.go("app.home");
			});**/

if(form.$valid){
if($scope.images.length >0){
	 $scope.artistas.$add({
        "nombreArtista": $scope.formData.nombre,
        "telefono":$scope.formData.telefono,
        "whatsapp":$scope.formData.whatsapp,
        "email":$scope.formData.email,
        "url":$scope.formData.url,
        "video":$scope.formData.video,
        "categoria":$scope.formData.categoria,
        "descripcion":$scope.formData.descripcion,	
        "images":$scope.images,
        "estado": $scope.estado,
        "idUser" : $scope.user



      });
	 $state.go('app.mostrar');
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


	$scope.user = UserService.getUser();
	

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
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Logging out...'
				});

        // Facebook logout
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