$(document).ready(function () {

    apiClient.listSpecies()
        .then(function (species) {
            var $input = jQuery("#query").typeahead({
                source: species
            });
        }).catch(function (e) {});

    jQuery("#btnSearch").click(function () {
        // var query = jQuery("#query").val();
        var query = jQuery("#query").typeahead("getActive");
        apiClient.getSpecies(query.id)
            .then(function (species) {
                jQuery("#results").html(JST.speciesdetail(species));
            }).catch(function (e) {});
        return false;
    });
});