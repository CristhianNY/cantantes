var mod = angular.module('cantantes.controllers.home', []);
mod.controller('ListCtrl', function ($scope, $state) {
 $scope.images = [];

 $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
          
        }
    }
 

});