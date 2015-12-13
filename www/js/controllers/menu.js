var mod = angular.module('cantantes.controllers.menu', []);

mod.controller('MenuCtrl', function($scope,$ionicModal, $state,$ionicLoading,UserService) {

	 $ionicModal.fromTemplateUrl('templates/contacto.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

	$scope.logout = function () {
		UserService.logoutUser();
		$state.go('login');
	};
		$scope.contactar = function () {
		 $scope.modal.show();
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
	
			console.log("MenuCtrl");
			$ionicLoading.show();
	
			Creador.crear($scope.formData).then(function(){
				$scope.resetFormData();
				$ionicLoading.hide();
				form.$setPristine(true);
				$state.go("app.home");
			});
		
	}



});