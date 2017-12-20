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