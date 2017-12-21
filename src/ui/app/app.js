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
    })
    .run(function () {

    });

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});
app.service('ApiClientService', function ($resource, $http) {
    return {
        listSpecies: function () {
            return ajaxQueryCall('/api/species/list');
        },
        getSpecies: function (id) {
            return ajaxGetCall('/api/species/' + encodeURIComponent(id));
        },
        getPokemon: function (id) {
            return ajaxGetCall('/api/pokemon/' + encodeURIComponent(id));
        },
        listPokemonAttackerTypes: function (id) {
            return ajaxQueryCall('/api/pokemon/' + encodeURIComponent(id) + '/attacks');
        },
        listPokemonMoves: function (id) {
            return ajaxQueryCall('/api/pokemon/' + encodeURIComponent(id) + '/moves');
        },
        listPokemonAttackers: function (id, effectiveness, limit) {
            var url = '/api/pokemon/' + encodeURIComponent(id) + '/attackers';

            if (effectiveness && effectiveness > 0) {
                url += ((url.indexOf('?') < 0) ? '?' : '&');
                url += 'effectiveness=' + encodeURIComponent(effectiveness);
            }

            if (limit && limit > 0) {
                url += ((url.indexOf('?') < 0) ? '?' : '&');
                url += 'limit=' + encodeURIComponent(limit);
            }

            return ajaxQueryCall(url);
        },
        listPokemonEvolutions: function (id) {
            return ajaxQueryCall('/api/pokemon/' + encodeURIComponent(id) + '/evolutions');
        },
        listGenerations: function () {
            return ajaxQueryCall('/api/generations');
        },
        getGeneration: function (id) {
            return ajaxGetCall('/api/generation/' + encodeURIComponent(id));
        },
        listGenerationEvolutions: function (id) {
            return ajaxQueryCall('/api/generation/' + encodeURIComponent(id) + '/evolutions');
        },
        listGenerationInsideEvolutions: function (id) {
            return ajaxQueryCall('/api/generation/' + encodeURIComponent(id) + '/evolutions/inside');
        },
        listGenerationOutsideEvolutions: function (id) {
            return ajaxQueryCall('/api/generation/' + encodeURIComponent(id) + '/evolutions/outside');
        },
        listGenerationSpecies: function (id) {
            return ajaxGetCall('/api/generation/' + encodeURIComponent(id) + '/species');
        },
        listRegions: function () {
            return ajaxQueryCall('/api/regions');
        },
        getRegion: function (id) {
            return ajaxQueryCall('/api/region/' + encodeURIComponent(id));
        }
    };

    function ajaxGetCall(url) {
        var resource = $resource(url, {});
        return resource.get().$promise;
    }

    function ajaxQueryCall(url) {
        var resource = $resource(url, {});
        return resource.query().$promise;
    }
});
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
app.controller('PokemonController',
    function PokemonController($scope, ApiClientService, $location, $routeParams, $q, $window) {
        var handleNetErr = function (e) {
            return e;
        };

        $scope.pokemonId = ($routeParams.id ? $routeParams.id : '');
        var pogoId = $scope.pokemonId;
        var d = $q.defer();

        $q.all([
            ApiClientService.getSpecies(pogoId).then(function (res) {
                return {
                    "type": "species",
                    "data": res
                }
            }),
            ApiClientService.listPokemonEvolutions(pogoId).catch(handleNetErr).then(function (res) {
                return {
                    "type": "evolutions",
                    "data": res
                }
            }),
            ApiClientService.listPokemonAttackerTypes(pogoId).catch(handleNetErr).then(function (res) {
                return {
                    "type": "attacks",
                    "data": res
                }
            })
        ]).then(function (data) {
            var result = {
                species: null,
                pokemon: null,
                evolutions: null,
                attacks: null
            };

            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                if (row.data.status == null) {
                    switch (row.type) {
                        case "species":
                            result.species = row.data.species;
                            if (row.data.pokemon && row.data.pokemon.length > 0)
                                result.pokemon = row.data.pokemon[0];
                            break;
                        case "evolutions":
                            result.evolutions = row.data;
                            break;
                        case "attacks":
                            result.attacks = formatAttacks(row.data);
                            break;
                    }
                }
            }

            $scope.data = result;
        });

        function formatAttacks(attacks) {
            var result = {
                cols: null,
                rows: [],
                data: []
            };

            _.each(_.groupBy(attacks, "attackType"), function (row) {
                if (result.cols == null) {
                    result.cols = [];
                    _.each(row, function (cell) {
                        result.cols.push(cell.defenseType);
                    });
                }

                result.data.push(new Array(result.cols.length));
                result.rows.push(row[0].attackType);
            });

            result.cols = result.cols.sort();
            result.rows = result.rows.sort();

            _.each(_.groupBy(attacks, "attackType"), function (row) {
                var rowIndex = result.rows.indexOf(row[0].attackType);
                _.each(row, function (cell) {
                    var colIndex = result.cols.indexOf(cell.defenseType);
                    var bgcolor = "#ffffff";
                    var fgcolor = "#000000";
                    switch (cell.effectiveness) {
                        case "2":
                            bgcolor = "#00ff00";
                            break;
                        case "1":
                            bgcolor = "#0000ff";
                            fgcolor = "#ffffff";
                            break;
                        case "0.5":
                            bgcolor = "#ff0000";
                            break;
                    }
                    result.data[rowIndex][colIndex] = {
                        bgcolor: bgcolor,
                        fgcolor: fgcolor,
                        effectiveness: parseFloat(cell.effectiveness) * 100
                    };


                });
                result.rows[rowIndex] = [result.rows[rowIndex]].concat(result.data[rowIndex]);
            });

            result.data = null;
            return result;
        }

        $scope.viewPokemon = function (id) {
            $location.path('/Pokemon/' + encodeURIComponent(id));
            $window.scrollTo(0, 0);
        }
    }
);