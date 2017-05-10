'use strict';
var angular = require("angular"),
    converter = require("./jdate-converter"),
    module = angular.module("jdateConverter", []);

module.service("jdateConverter", function () {
    var vm = this;

    vm.toJsDate = function (dateFormat) {
        return converter.toJsDate(dateFormat);
    };
});