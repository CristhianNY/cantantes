var mod = angular.module('cantantes.controllers.home', []);
mod.controller('ListCtrl', function ($scope, $state) {
 $scope.images = [];

 $scope.agrupaciones =  {

 	"grupos":[{
 	"nombre": "mariachi palenque",
 	"img": "http://www.cantantesmedellin.com/mariachipalenque/mp4.jpg"
 	},
 	{
 	"nombre": "mariachi palenque",
 	"img": "http://www.cantantesmedellin.com/mariachipalenque/mp4.jpg"
 	},
 	{
 	"nombre": "mariachi palenque",
 	"img": "http://www.cantantesmedellin.com/mariachipalenque/mp4.jpg"
 	},
 	{
 	"nombre": "mariachi palenque",
 	"img": "http://www.cantantesmedellin.com/mariachipalenque/mp4.jpg"
 	}
 	]
 	
 	
 }
    

 $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "http://www.cantantesmedellin.com/mariachipalenque/mp4.jpg"});
          
        }
    }
 

});