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
                apiClient.getAttackers(query.id, 1, 10)
                    .then(function (attackers) {
                        jQuery("#results").html(JST.speciesdetail({
                            detail: species,
                            attackers: attackers
                        }));
                    }).catch(function (e) {});
            }).catch(function (e) {});
        return false;
    });
});