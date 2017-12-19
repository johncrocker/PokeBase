window.apiClient = {
    listSpecies: function () {
        return ajaxGetCall('/api/species/list');
    },
    getSpecies: function (id) {
        return ajaxGetCall('/api/species/' + encodeURIComponent(id));
    },
    getPokemon: function (id) {
        return ajaxGetCall('/api/pokemon/' + encodeURIComponent(id));
    },
    listPokemonAttackerTypes: function (id) {
        return ajaxGetCall('/api/pokemon/' + encodeURIComponent(id) + '/attacks');
    },
    listPokemonMoves: function (id) {
        return ajaxGetCall('/api/pokemon/' + encodeURIComponent(id) + '/moves');
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

        return ajaxGetCall(url);
    },
    listPokemonEvolutions: function (id) {
        return ajaxGetCall('/api/pokemon/' + encodeURIComponent(id) + '/evolutions');
    },
    listGenerations: function () {
        return ajaxGetCall('/api/generations');
    },
    getGeneration: function (id) {
        return ajaxGetCall('/api/generation/' + encodeURIComponent(id));
    },
    listGenerationEvolutions: function (id) {
        return ajaxGetCall('/api/generation/' + encodeURIComponent(id) + '/evolutions');
    },
    listGenerationInsideEvolutions: function (id) {
        return ajaxGetCall('/api/generation/' + encodeURIComponent(id) + '/evolutions/inside');
    },
    listGenerationOutsideEvolutions: function (id) {
        return ajaxGetCall('/api/generation/' + encodeURIComponent(id) + '/evolutions/outside');
    },
    listGenerationSpecies: function (id) {
        return ajaxGetCall('/api/generation/' + encodeURIComponent(id) + '/species');
    },
    listRegions: function () {
        return ajaxGetCall('/api/regions');
    },
    getRegion: function (id) {
        return ajaxGetCall('/api/region/' + encodeURIComponent(id));
    }
};

function ajaxGetCall(url) {
    return new Promise(function (resolve, reject) {
        jQuery.ajax(url, {
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: jqXHR.status,
                    textStatus: textStatus,
                    errorThrown: errorThrown
                });
            }
        });
    });
}