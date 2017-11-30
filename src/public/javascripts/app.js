(function ($) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };

    $.fn.setWait = function () {
        this.children("i").removeClass("fa-search");
        this.children("i").addClass("fa-hourglass");
    };

    $.fn.unSetWait = function () {
        this.children("i").removeClass("fa-hourglass");
        this.children("i").addClass("fa-search");
    };

    $.parseParams = function (query) {
        var params = {},
            e;

        if (query == null) {
            query = document.location.search;
        }

        if (query) {
            if (query.substr(0, 1) == '?') {
                query = query.substr(1);
            }

            while (e = re.exec(query)) {
                var k = decode(e[1]);
                var v = decode(e[2]);
                if (params[k] !== undefined) {
                    if (!$.isArray(params[k])) {
                        params[k] = [params[k]];
                    }
                    params[k].push(v);
                } else {
                    params[k] = v;
                }
            }
        }

        return params;
    };
}(jQuery));

$(document).ready(function () {

});