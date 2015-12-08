
var app = angular.module('cantantes', ['ionic',
  'ngMessages',
  'ngCordova',
  'angularMoment',
  'parse-angular',
  'parse-angular.enhance',
  'cantantes.controllers'
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
     .state('app', {
      url: "/app",
      cache: true,
      controller: 'MenuCtrl',
      templateUrl: "templates/menu.html"
    })
      .state('app.search', {
        url: "/search",
        views: {
          'menuContent': {
            templateUrl: "templates/search.html",
            controller: 'SearchCtrl'
          }
        }
      })
      .state('app.show', {
        url: "/show",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "templates/home.html",
            controller: 'ListCtrl'
          }
        }
      });

  $urlRouterProvider.otherwise('/');

});