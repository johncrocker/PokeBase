app.controller('HomeController',
    function HomeController($scope, ApiClientService, $location, $window) {
        $scope.data = {
            wait: true,
            species: [],
            query: '',
            dexid: ''
        };

        $scope.selected = undefined;

        ApiClientService.listSpecies()
            .then(function (species) {
                $scope.data.species = species;
                $scope.data.wait = false;
            }).catch(function (e) {});

        $scope.performSearch = function () {
            var dexid = $scope.data.dexid;
            if ($scope.selected && $scope.selected.id) {
                dexid = $scope.selected.id;
            }

            if (dexid != '') {
                $location.path('/Pokemon/' + encodeURIComponent(dexid));
                $window.scrollTo(0, 0);
            }
        }

        $scope.performClear = function () {
            $scope.data.query = '';
            $scope.data.dexid = '';
            $scope.selected = undefined;
        }
    }
);