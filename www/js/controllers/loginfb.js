var app = angular.module('cantantes.controllers.loginfb', []);

app.controller('loginfb', function($scope,$rootScope, $state, $q, UserService, $ionicLoading,db) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
   
    if (!response.authResponse){

   console.log(response.authResponse+"resoinse.authResponse");
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {

    $rootScope.Usuario1 = profileInfo.id;
     window.localStorage['identificador'] = profileInfo.id;
             var identificador=  window.localStorage['identificador'] || 'you';
             
 
    $rootScope.imagendeperfil = profileInfo.id;


     console.log($scope.Usuario1 +"usuario");
      // For the purpose of this example I will store user data on local storage
     var imagenPerfil= "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      UserService.setUser(profileInfo.id,
        profileInfo.name,
        profileInfo.email,
        imagenPerfil,
        authResponse.accessToken);
       $rootScope.imagendeperfil =imagenPerfil;
      $ionicLoading.hide();
     console.log("ir a mostrar");
   $state.go('pais.paises');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log("errror login");
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    console.log("opteniendo informaciondel perfiel")

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log("response1");
				console.log(response);
        info.resolve(response);
      },
      function (response) {
           console.log("response2");
				console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){ 

     console.log("conectado");
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire


    		// Check if we have our user saved
    		var user = UserService.getUser('facebook');
        console.log(user+"este que pitos toca");

     

    		if(!user.userId){

      

          console.log("userId");

      
					getFacebookProfileInfo(success.authResponse)
					.then(function(profileInfo) {
         
						// For the purpose of this example I will store user data on local storage
              // $localstorage.set('cantantes-user', profileInfo.id);

              var referenciaUser = db.getUser(profileInfo.id);

               referenciaUser.set({"userId":profileInfo.id,
                            "name":profileInfo.name,
                            "email":profileInfo.email,
                            "picture": "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"


        });
              console.log( success.authResponse.userID+"jajaj");
						UserService.setUser({
							authResponse: success.authResponse,
							userID: profileInfo.id,
							name: profileInfo.name,
							email: profileInfo.email,
							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
						});
            console.log("apunto de ir a app.mostrar aqui");

					 $state.go('pais.paises');
					}, function(fail){

        
						// Fail get profile info
						console.log('profile info fail', fail);
					});
				}else{
            console.log("userId");

      
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
         
            // For the purpose of this example I will store user data on local storage
              // $localstorage.set('cantantes-user', profileInfo.id);

              var referenciaUser = db.getUser(profileInfo.id);

               referenciaUser.set({"userId":profileInfo.id,
                            "name":profileInfo.name,
                            "email":profileInfo.email,
                            "picture": "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"


        });
              console.log( success.authResponse.userID+"jajaj");
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });
            console.log("apunto de ir a app.mostrar aqui");

           $state.go('pais.paises');
          }, function(fail){

        
            // Fail get profile info
            console.log('profile info fail', fail);
          });

          console.log("ir a mostrar despues de else");
    
					 $state.go('pais.paises');
				}
      } else {

        // If (success.status === 'not_authorized') the user is logged in to Facebook,
				// but has not authenticated your app
        // Else the person is not logged into Facebook,
				// so we're not sure if they are logged into this app or not.
        success.status

        console.log("ver estatus");
				console.log('getLoginStatus', success.status);

       

				$ionicLoading.show({
          template: 'Entrando'
        });

				// Ask the permissions you need. You can learn more about
				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4

        console.log("facebookConnectPlugin");
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
});
app.controller('HomeCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){
 console.log("HomeCtrl");
	$scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Estas seguro que Quieres salir.',
			cancelText: 'Cancelar',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
				  template: 'Saliendo...'
				});

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('welcome');
        },
        function(fail){
          $ionicLoading.hide();
        });
			}
		});
	};
})