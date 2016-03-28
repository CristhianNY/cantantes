var mod = angular.module('cantantes.controllers.controlInicial', []);
mod.controller('controlInicial', function ($scope,$rootScope,
				 $state,db,FIREBASE_URL,$firebaseArray,$filter,$ionicLoading) {


 $scope.paises = [
    {id: 1, name: "Colombia", selected: true},
    {id: 2, name: "Ecuador", selected: false},
    {id: 3, name: "Peru", selected: false},
    {id: 4, name: "Bolivia", selected: false}
  ];
  $scope.groups = [
    {Id: 1, Name: "Medellín", Selected: false},
    {Id: 2, Name: "Bogotá", Selected: false},
    {Id: 3, Name: "Cali", Selected: false},
    {Id: 4, Name: "Ibagué", Selected: false}
  ];


  

  $scope.cargarGrupos= function(form){
  $ionicLoading.show({
          template: 'Buscando'
        });
  var pais = document.getElementById("pais").value;

  var ciudad = document.getElementById("ciudad").value;
  var genero = document.getElementById("genero").value;


$rootScope.pais = pais;
$rootScope.ciudad=  ciudad;


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

     });
          console.log(grupos);


  //$rootScope.artistasR = data;
   //console.log(data);
   $state.go('app.mostrar');
},function(error){

  
   $ionicLoading.hide();
});


  }
    $scope.getOptionsSelected = function(options, valueProperty, selectedProperty){
    var optionsSelected = $filter('filter')(options, function(option) {return option[selectedProperty] == true; });
    $scope.pais = optionsSelected.map(function(group){ return group[valueProperty]; }).join(", ");
    return optionsSelected.map(function(group){ return group[valueProperty]; }).join(", ");
  };

}).directive('ionMultipleSelect', ['$ionicModal', '$ionicGesture', function ($ionicModal, $ionicGesture) {
return {
    restrict: 'E',
    scope: {
      options : "="
    },
    controller: function ($scope, $element, $attrs) {
      $scope.multipleSelect = {
        title:            $attrs.title || "Select Options",
        tempOptions:      [],
        keyProperty:      $attrs.keyProperty || "id",
        valueProperty:    $attrs.valueProperty || "value",
        selectedProperty: $attrs.selectedProperty || "selected",
        templateUrl:      $attrs.templateUrl || 'templates/multipleSelect.html',
        renderCheckbox:   $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
        animation:        $attrs.animation || 'slide-in-up'
      };

      $scope.OpenModalFromTemplate = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: $scope.multipleSelect.animation
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      
      $ionicGesture.on('tap', function (e) {
       $scope.multipleSelect.tempOptions = $scope.options.map(function(option){
         var tempOption = { };
         tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
         tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
         tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];
         
         return tempOption;
       });
        $scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
      }, $element);
      
      $scope.saveOptions = function(){
        for(var i = 0; i < $scope.multipleSelect.tempOptions.length; i++){
          var tempOption = $scope.multipleSelect.tempOptions[i];
          for(var j = 0; j < $scope.options.length; j++){
            var option = $scope.options[j];
            if(tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]){
              option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
              break;
            }
          }
        }
        $scope.closeModal();
      };
      
      $scope.closeModal = function () {
        $scope.modal.remove();
      };
      $scope.$on('$destroy', function () {
          if ($scope.modal){
              $scope.modal.remove();
          }
      });
    }
  };
}]);