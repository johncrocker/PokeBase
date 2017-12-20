app.controller('GenerationsController',
    function GenerationsController($scope, ApiClientService, $location, $routeParams, $window) {
        $scope.data = {
            generations: []
        };

        ApiClientService.listGenerations()
            .then(function (gens) {
                $scope.data.generations = gens;
            }).catch(function (e) {});


        $scope.viewGeneration = function (id) {
            $location.path('/Generation/' + encodeURIComponent(id));
            $window.scrollTo(0, 0);
        };

        $scope.viewEvolutions = function (id) {
            $location.path('/Evolutions/' + encodeURIComponent(id));
            $window.scrollTo(0, 0);
        };
    }
);