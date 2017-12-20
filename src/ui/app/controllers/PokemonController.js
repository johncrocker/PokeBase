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