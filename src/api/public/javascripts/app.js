$(document).ready(function () {

    apiClient.listSpecies()
        .then(function (species) {
            var $input = jQuery("#query").typeahead({
                source: species
            });
        }).catch(function (e) {});

    jQuery("#btnSearch").click(function () {
        var query = jQuery("#query").val();
        apiClient.getSpecies(query)
            .then(function (species) {}).catch(function (e) {});
        return false;
    });
});