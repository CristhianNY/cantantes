
var app = angular.module('cantantes', ['ionic',
  'ngMessages',
  'ngCordova',
  'angularMoment',
  'parse-angular',
  'parse-angular.enhance',
  'cantantes.controllers.authentication',
  'cantantes.controllers.cuenta',
  'cantantes.services.authentication',
  'cantantes.controllers.menu',
  'cantantes.controllers.intro',
  'cantantes.controllers.home'
  ])

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


});
app.config(function ($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('login', {
      url: "/login",
      cache: false,
      controller: 'LoginCtrl',
      templateUrl: "templates/login.html"
    })
     .state('home', {
      url: "/home",
      cache: false,
      controller: 'ListCtrl',
      templateUrl: "templates/home.html"
    });

  $urlRouterProvider.otherwise('/login');

});