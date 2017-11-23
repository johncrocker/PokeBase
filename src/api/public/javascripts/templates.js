this["JST"] = this["JST"] || {};

this["JST"]["speciesdetail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr>\r\n            <td class=\"col-md-2\">\r\n                <p>\r\n                    <strong>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\r\n                </p>\r\n                <p>\r\n                    <img src=\"/api/pokemon/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/image?size=64\" width=\"64\" height=\"64\" />\r\n                </p>\r\n            </td>\r\n            <td>\r\n                <div class=\"container-fluid\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>ID:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Types:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.types : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Weight:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Height:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Base XP:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.base_xp || (depth0 != null ? depth0.base_xp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"base_xp","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.last),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    return ",";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <img src=\"/api/pokemon/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/image?size=32\" alt=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.effectiveness || (depth0 != null ? depth0.effectiveness : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"effectiveness","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.effectiveness || (depth0 != null ? depth0.effectiveness : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"effectiveness","hash":{},"data":data}) : helper)))
    + "\" width=\"32\" height=\"32\" /> \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>ID:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.id : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Name:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.name : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Generation:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.generationNumber : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Region:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.region : stack1), depth0))
    + "</div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"container\">\r\n    <table class=\"table table-bordered\">\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.pokemon : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </table>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.attackers : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});