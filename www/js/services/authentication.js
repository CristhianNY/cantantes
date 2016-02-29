var app = angular.module('cantantes.services.authentication', []);
app.service('UserService', function(FIREBASE_URL,
                                     $q,
                                     $rootScope,
                                     $localstorage,
                                     $ionicPopup,
                                     $firebaseAuth,
                                     $firebaseObject,
                                     $firebaseArray) {


  var ref = new Firebase(FIREBASE_URL);
  var usersRef = new Firebase(FIREBASE_URL + "/users")
  var self = {
    /* This contains the currently logged in user */
    current: {}

  }
 
           // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
        var setUser = function(id,nombre,email,imagenPerfil,token) {
     
    //var auth = $firebaseAuth(ref);
   // auth.$authWithOAuthToken("facebook", token)(
  
   
  // alert(id);

window.localStorage.starter_facebook_user = JSON.stringify({id,nombre,email,imagenPerfil,token});
console.log(token);
var auth = $firebaseAuth(ref);
auth.$authWithOAuthToken("facebook",token).then(function (error, authData){

      if (error) {
   var itemsRef = new Firebase("https://cookie7.firebaseio.com/artistas");

   $rootScope.artistasR = $firebaseArray(itemsRef);
   
  } else {
    
    console.log("Authenticated successfully with payload:", authData);
  }
});
}


    var getUser = function(){
       var deferred = $q.defer();
     // alert(JSON.parse(window.localStorage.starter_facebook_user || '{}'));
    console.log("opteniendo usuario")
    //console.log(JSON.parse(window.localStorage.starter_facebook_user || '{}'));
        deferred.resolve(JSON.parse(window.localStorage.starter_facebook_user || '{}'));
    return deferred.promise;
    };

    return {
    getUser: getUser,
    setUser: setUser
   };

  
});