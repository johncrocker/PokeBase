app.controller('EvolutionsController',
    function EvolutionsController($scope, ApiClientService, $location, $routeParams, $window) {
        $scope.genId = ($routeParams.id ? $routeParams.id : '');
        $scope.data = {
            evolutions: []
        };

        var genNumber = $scope.genId;

        ApiClientService.listGenerationEvolutions(genNumber)
            .then(function (evolutions) {
                $scope.data.evolutions = evolutions;
            }).catch(function (e) {});

        $scope.viewPokemon = function (id) {
            $location.path('/Pokemon/' + encodeURIComponent(id));
            $window.scrollTo(0, 0);
        }
    }
);