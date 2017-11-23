window.apiClient = {
    listSpecies: function () {
        return ajaxGetCall('/api/species/list');
    },
    getSpecies: function (id) {
        return ajaxGetCall('/api/species/' + encodeURIComponent(id));
    },
    getAttackers: function (id, effectiveness, limit) {
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