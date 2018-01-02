var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/templates.min/Home.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/Pokemon/:id', {
            templateUrl: '/app/templates.min/Pokemon.html',
            controller: 'PokemonController'
        });

        $routeProvider.when('/Generation/:id', {
            templateUrl: '/app/templates.min/Generation.html',
            controller: 'GenerationController'
        });

        $routeProvider.when('/Generations', {
            templateUrl: '/app/templates.min/Generations.html',
            controller: 'GenerationsController'
        });

        $routeProvider.when('/Evolutions/:id', {
            templateUrl: '/app/templates.min/Evolutions.html',
            controller: 'EvolutionsController'
        });

        $routeProvider.when('/PrivacyPolicy', {
            templateUrl: '/app/templates.min/PrivacyPolicy.html',
            controller: 'PrivacyPolicyController'
        });

        $routeProvider.when('/TermsOfService', {
            templateUrl: '/app/templates.min/TermsOfService.html',
            controller: 'TermsOfServiceController'
        });
    })
    .run(function () {

    });

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});