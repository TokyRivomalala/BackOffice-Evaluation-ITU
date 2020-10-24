var pageApp = angular.module('pageApp', ['ngRoute','ngCookies','ng-pagination']);

pageApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'vue/login.html',
      controller : 'LoginCtrl'
    })
    .when('/accueil', {
      templateUrl : 'vue/accueil.html',
      controller : 'AccueilCtrl'
    })

    .when('/utilisateur', {
      templateUrl : 'vue/utilisateur.html',
      controller : 'UtilisateurCtrl'
    })
    .otherwise({ redirectTo: '/' });
  });