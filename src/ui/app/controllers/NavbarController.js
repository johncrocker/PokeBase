app.controller('NavbarController',
    function NavbarController($scope, $location) {
        $scope.page = 'home';
        $scope.goHome = function () {
            $scope.page = 'home';
            $location.path('/');
            return false;
        }

        $scope.goGenerations = function () {
            $scope.page = 'gens';
            $location.path('/Generations');
            return false;
        }
    }
);