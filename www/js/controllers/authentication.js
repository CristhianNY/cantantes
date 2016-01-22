var app = angular.module('cantantes.controllers.authentication', []);

app.controller('LoginCtrl', function ($scope, $state,UserService) {

$scope.loggingIn = false;

	$scope.login = function () {
		if (!$scope.loggingIn) {
			$scope.loggingIn = true;
			UserService.loginUser().then(function () {
					$scope.loggingIn = false
			    $state.go('app.mostrar');
		   });
		}
	}
	
	
});

