var app = angular.module('cantantes.factory.factoryFire', []);
app.factory("Artistas", function($firebaseArray,FIREBASE_URL) {
  var artistasRef = new Firebase(FIREBASE_URL+"/artistas");
 
  return $firebaseArray(artistasRef);
})