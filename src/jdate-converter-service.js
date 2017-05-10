'use strict';
var angular = require("angular"),
    converter = require("./jdate-converter"),
    module = angular.module("jdateConverter", []);

module.service("jdateConverter", function () {
    var vm = this;

    var formatCache = {};

    vm.toJsDate = function (dateFormat) {
        if(formatCache[dateFormat]  !== undefined) {
            return formatCache[dateFormat];
        } else {
            formatCache[dateFormat] = converter.toJsDate(dateFormat)
            return formatCache[dateFormat];
        }
    };
});