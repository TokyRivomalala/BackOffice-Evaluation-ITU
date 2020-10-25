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

    .when('/article', {
      templateUrl : 'vue/article.html',
      controller : 'ArticleCtrl'
    })

    .when('/achat', {
      templateUrl : 'vue/achat.html',
      controller : 'AchatCtrl'
    })

    .when('/promotion', {
      templateUrl : 'vue/promotion.html',
      controller : 'PromotionCtrl'
    })

    .otherwise({ redirectTo: '/' });
  });