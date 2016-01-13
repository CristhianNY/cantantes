var app = angular.module('cantantes.factory.factoryFire', []);
app.factory("Artistas", function($firebaseArray,FIREBASE_URL) {
  var artistasRef = new Firebase(FIREBASE_URL+"/artistas");
 
  return $firebaseArray(artistasRef);
});
app.factory("Comentarios", function($firebaseArray,FIREBASE_URL) {
  var artistasRef = new Firebase(FIREBASE_URL+"/comentarios");
 
  return $firebaseArray(artistasRef);
});
app.factory("Img", function($firebaseArray,FIREBASE_URL) {
  var artistasRef = new Firebase(FIREBASE_URL+"/imagenes");
 
  return $firebaseArray(artistasRef);
})