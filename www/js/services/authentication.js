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
   alert(id);
     alert(nombre);
   alert(email);
   alert(imagenPerfil);
   
   


var auth = $firebaseAuth(ref);
auth.$authWithOAuthToken("facebook",token).then(function (error, authData){

usersRef.child(id)
                          .transaction(function (currentUserData) {
                            if (currentUserData === null) {
                              //
                              // If the transaction is a success and the current user data is
                              // null then this is the first time firebase has seen this user id
                              // so this user is NEW.
                              //
                              // Any object we return from here will be used as the user data
                              // in firebase
                              //
                              return {
                                'name': nombre,
                                'email':email,
                                'profilePic': imagenPerfil,
                                'userId':id
                              };
                            }
                          },function (error, committed) {
                            //
                            // This second function in the transaction clause is always called
                            // whether the user was created or is being retrieved.
                            //
                            // We want to store the userid in localstorage as well as load the user
                            // and store it in the self.current property.
                            //
                            $localstorage.set('cantantes-user', id);
                            self.current = $firebaseObject(usersRef.child(id));
                          
                          })
});
}

    var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
    getUser: getUser,
    setUser: setUser
   };

  
});