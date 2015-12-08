var mod = angular.module('cantantes.controllers.menu', []);

mod.controller('MenuCtrl', function($scope, $state) {

	
	$scope.logout = function () {
		UserService.logoutUser();
		$state.go('intro');
	};

});