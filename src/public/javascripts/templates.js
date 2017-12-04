this["JST"] = this["JST"] || {};

this["JST"]["generationdetail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <tr>\r\n        <td>\r\n            <button class=\"btn btn-primary btnView\" data-number=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                View\r\n            </button>\r\n        </td>\r\n        <td>\r\n            <strong>"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</strong>\r\n        </td>\r\n        <td>\r\n            <a href=\"pogodetail.html?number="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                <div class=\"pogo dex-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n            </a>\r\n        </td>\r\n        <td>\r\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n        </td>\r\n    </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<strong>Generation "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.generation : depth0)) != null ? stack1.number : stack1), depth0))
    + "</strong> ("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.generation : depth0)) != null ? stack1.region : stack1), depth0))
    + " region)\r\n\r\n<table class=\"table table-bordered\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.pokemon : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>";
},"useData":true});

this["JST"]["generationlist"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <tr>\r\n        <td>\r\n            <button class=\"btn btn-primary btnView\" data-number=\""
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + "\">\r\n                View\r\n            </button>\r\n        </td>\r\n        <td>\r\n            <strong>"
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + "</strong>\r\n        </td>\r\n        <td>\r\n            "
    + alias4(((helper = (helper = helpers.region || (depth0 != null ? depth0.region : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"region","hash":{},"data":data}) : helper)))
    + "\r\n        </td>\r\n    </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-bordered\">\r\n    <tr>\r\n        <th>&nbsp;</th>\r\n        <th>Number</th>\r\n        <th>Regions</th>\r\n    </tr>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.detail : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>";
},"useData":true});

this["JST"]["pogodetail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.last),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    return ",";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <td>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</td>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <tr>\r\n            "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        </tr>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.bgcolor : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n            <td style=\"background-color:"
    + alias4(((helper = (helper = helpers.bgcolor || (depth0 != null ? depth0.bgcolor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bgcolor","hash":{},"data":data}) : helper)))
    + ";color:"
    + alias4(((helper = (helper = helpers.fgcolor || (depth0 != null ? depth0.fgcolor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fgcolor","hash":{},"data":data}) : helper)))
    + ";text-align:center;\">"
    + alias4(((helper = (helper = helpers.effectiveness || (depth0 != null ? depth0.effectiveness : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"effectiveness","hash":{},"data":data}) : helper)))
    + "%</td>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "            <td>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</td>\r\n            ";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"row\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <hr/> ";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"col-xs-4\">\r\n            <a href=\"pogodetail.html?number="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                <div title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"pogo dex-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n            </a>\r\n        </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <a href=\"pogodetail.html?number="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\r\n                <div class=\"pogo dex-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"></div>\r\n            </a>\r\n        </div>\r\n        <div class=\"col-xs-8\">\r\n            <h3> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Types</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">\r\n            "
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.types : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Generation</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">\r\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.species : depth0)) != null ? stack1.generationNumber : stack1), depth0))
    + "\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Region</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">\r\n            "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.species : depth0)) != null ? stack1.region : stack1), depth0))
    + "\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Attack:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.statAtk : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Defense:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.statDef : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Status:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.statSta : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Candies to Evolve:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.candyToEvolve : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Buddy Distance:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.buddyDistance : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Capture Rate:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.captureRate : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Flee Rate:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.fleeRate : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-4\">\r\n            <strong>Legendary:</strong>\r\n        </div>\r\n        <div class=\"col-xs-8\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pokemon : depth0)) != null ? stack1.isLegendary : stack1), depth0))
    + "</div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"panel\">\r\n    <p class=\"title\">Attacks</p>\r\n    <table class=\"table-bordered table-condensed\">\r\n        <tr>\r\n            <td>Defense</td>\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.attacks : depth0)) != null ? stack1.cols : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </tr>\r\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = (depth0 != null ? depth0.attacks : depth0)) != null ? stack1.rows : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </table>\r\n</div>\r\n\r\n<div class=\"panel\">\r\n    <p class=\"title\">Evolutions</p>\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.evolutions : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n</div>";
},"useData":true});

this["JST"]["speciesdetail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr>\r\n            <td class=\"col-md-2\">\r\n                <p>\r\n                    <strong>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\r\n                </p>\r\n                <p>\r\n                    <a href=\"pogodetail.html?number="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n                        <div title=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"pogo dex-"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" onclick=\"window.location.href='pogodetail.html?number="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "';\"> </div>\r\n                    </a>\r\n                </p>\r\n            </td>\r\n            <td>\r\n                <div class=\"container-fluid\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>ID:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Types:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.types : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Attack:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.statAtk || (depth0 != null ? depth0.statAtk : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statAtk","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Defense:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.statDef || (depth0 != null ? depth0.statDef : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statDef","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Status:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.statSta || (depth0 != null ? depth0.statSta : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statSta","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Candies to Evolve:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.candyToEvolve || (depth0 != null ? depth0.candyToEvolve : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"candyToEvolve","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Buddy Distance:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.buddyDistance || (depth0 != null ? depth0.buddyDistance : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"buddyDistance","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Capture Rate:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.captureRate || (depth0 != null ? depth0.captureRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"captureRate","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Flee Rate:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.fleeRate || (depth0 != null ? depth0.fleeRate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fleeRate","hash":{},"data":data}) : helper)))
    + "</div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-2\">\r\n                            <strong>Legendary:</strong>\r\n                        </div>\r\n                        <div class=\"col-md-8\">"
    + alias4(((helper = (helper = helpers.isLegendary || (depth0 != null ? depth0.isLegendary : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"isLegendary","hash":{},"data":data}) : helper)))
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
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>ID:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.id : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Name:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.name : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Generation:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.generationNumber : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Region:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.species : stack1)) != null ? stack1.region : stack1), depth0))
    + "</div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <strong>Evolutions:</strong>\r\n        </div>\r\n        <div class=\"col-md-8\"></div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"container\">\r\n    <table class=\"table table-bordered\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.detail : depth0)) != null ? stack1.pokemon : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </table>\r\n\r\n</div>";
},"useData":true});