var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/templates/Home.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/Pokemon/:id', {
            templateUrl: '/app/templates/Pokemon.html',
            controller: 'PokemonController'
        });

        $routeProvider.when('/Generation/:id', {
            templateUrl: '/app/templates/Generation.html',
            controller: 'GenerationController'
        });

        $routeProvider.when('/Generations', {
            templateUrl: '/app/templates/Generations.html',
            controller: 'GenerationsController'
        });

        $routeProvider.when('/Evolutions/:id', {
            templateUrl: '/app/templates/Evolutions.html',
            controller: 'EvolutionsController'
        });
    })
    .run(function () {

    });

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});