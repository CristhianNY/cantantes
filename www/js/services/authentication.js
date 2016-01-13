var app = angular.module('cantantes.services.authentication', []);
app.service('UserService', function(FIREBASE_URL,
                                     $q,
                                     $rootScope,
                                     $localstorage,
                                     $ionicPopup,
                                     $firebaseAuth,
                                     $firebaseObject) {


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
window.localStorage.starter_facebook_user = JSON.stringify(id);

var auth = $firebaseAuth(ref);
auth.$authWithOAuthToken("facebook",token).then(function (error, authData){

usersRef.child(id)
                          .transaction(function (currentUserData) {
                            if (currentUserData === null) {
                           
                              return {
                                'name': nombre,
                                'email':email,
                                'profilePic': imagenPerfil,
                                'userId':id
                              };
                            }
                             $localstorage.set('cantantes-user', id);
                          },function (error, committed) {
                     
                            $localstorage.set('cantantes-user', id);
                            self.current = $firebaseObject(usersRef.child(id));
                          
                          })
});
}

    var getUser = function(){

     // alert(JSON.parse(window.localStorage.starter_facebook_user || '{}'));

    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
    getUser: getUser,
    setUser: setUser
   };

  
});