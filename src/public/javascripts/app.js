(function ($) {
    $.fn.setWait = function () {
        this.children("i").removeClass("fa-search");
        this.children("i").addClass("fa-hourglass");
    };

    $.fn.unSetWait = function () {
        this.children("i").removeClass("fa-hourglass");
        this.children("i").addClass("fa-search");
    };
}(jQuery));

$(document).ready(function () {

});