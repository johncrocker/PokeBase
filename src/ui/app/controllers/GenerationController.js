app.controller('GenerationController',
    function GenerationController($scope, ApiClientService, $location, $routeParams, $window) {
        $scope.genId = ($routeParams.id ? $routeParams.id : '');
        $scope.data = {
            generation: {}
        };

        var genNumber = $scope.genId;

        ApiClientService.listGenerationSpecies(genNumber)
            .then(function (generation) {
                $scope.data.generation = generation;
            }).catch(function (e) {
            });


        $scope.viewPokemon = function (id) {
            $location.path('/Pokemon/' + encodeURIComponent(id));
            $window.scrollTo(0, 0);
        }
    }
);