
var app = angular.module('cantantes', ['ionic',
  'ngMessages',
  'ngCordova',
  'angularMoment',
  'firebase',  
  'cantantes.controllers',
  'cantantes.services',
  'cantantes.filters',
  
  ])
    app.constant("FIREBASE_URL", 'https://cookie7.firebaseio.com/');
   // app.constant("FACEBOOK_APP_ID", '1511772949116522');


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

//Parse.initialize("CcBEaR6AvI8hJYvLkBZKSUXiMbIDCBIa1CB99qbm", "RDoPZsnPUvSMGpP98fHw4DObRoZW4upDEuHQzuHb");
});

app.config(function ($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('login', {
      url: "/login",
      cache: false,
      controller: 'loginfb',
      templateUrl: "templates/login.html"
    })
     .state('pais', {
      url: "/pa",
      cache: false,
      controller: 'loginfb',
      templateUrl: "templates/paiseshead.html"
    })
     .state('app', {
      url: "/app",
      cache: false,
      controller: 'MenuCtrl',
      templateUrl: "templates/menu.html",

    })
      .state('app.home', {
                url: '/home',
                cache:false,
                views: {
                    'home': {
                        templateUrl: 'templates/home.html',
                        controller : 'MenuCtrl'
                    }
                }
            }).state('pais.paises', {
                url: '/paises',
                cache:false,
                views: {
                    'head': {
                        templateUrl: 'templates/paises.html',
                        controller : 'controlInicial'
                    }
                }
            })
       .state('app.chat', {
                url: '/chat',
                cache:false,
                views: {
                    'home': {
                        templateUrl: 'templates/tabs/tab-todo.html',
                        controller : 'MenuCtrl'
                    }
                }
            })
         .state('app.nuevo', {
           cache: true,
                url: '/nuevo',
                views: {
                    'home': {
                        templateUrl: 'templates/tabs/tab-nuevo.html',
                        controller : 'MenuCtrl'
                    }
                }
            })
          .state('app.mostrarbyid', {
           cache: false,
                url: '/:categoria',
                views: {
                    'home': {
                        templateUrl: 'templates/mostrarbyid.html',
                        controller : 'Ver'
                    }
                }
            })
         .state('app.mostrar', {
           cache: false,
                url: '/mostrar',
                views: {
                    'home': {
                        templateUrl: 'templates/mostrar.html',
                        controller : 'Show'
                    }
                }
            });
           

  $urlRouterProvider.otherwise('/login');

});