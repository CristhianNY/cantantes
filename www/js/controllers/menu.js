var mod = angular.module('cantantes.controllers.menu', []);

mod.controller('MenuCtrl', function($scope,$ionicModal, $state,$ionicActionSheet,$ionicLoading,UserService) {

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

	$scope.user = UserService.getUser();

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