window.apiClient = {
    listSpecies: function () {
        return ajaxGetCall('/api/species/list');
    },
    getSpecies: function (id) {
        return ajaxGetCall('/api/species/' + encodeURIComponent(id));
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