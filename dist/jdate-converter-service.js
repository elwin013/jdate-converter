/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var angular = __webpack_require__(1),
	    converter = __webpack_require__(2),
	    module = angular.module("jdateConverter", []);
	
	module.service("jdateConverter", function () {
	    var vm = this,
	        formatCache = {};
	
	    vm.toJsDate = function (dateFormat) {
	        if (formatCache[dateFormat] === undefined) {
	            formatCache[dateFormat] = converter.toJsDate(dateFormat);
	        }
	        return formatCache[dateFormat];
	    };
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = angular;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/*
	 * jdate-converter.js
	 * Simple utility to convert Java date formats to JavaScript date formats
	 * used for example in moment.js.
	 *
	 * Based on: 
	 * - https://github.com/TheCoder4eu/BootsFaces-OSP/blob/master/src/main/java/net/bootsfaces/utils/LocaleUtils.java
	 * - https://github.com/MadMG/moment-jdateformatparser/blob/master/moment-jdateformatparser.js
	 *
	 */
	'use strict';
	
	(function () {
	    var obj = {},
	        javaToJavaScript = {
	        "d": "D", // (day in month - one or two digits);
	        "dd": "DD", // (day in month - two digits);
	        "D": "DDD", // (day in year - one to three digits);
	        "DD": null, // (day in year- two or three digits);
	        "DDD": "DDDD", // (day in year- three digits);
	        "F": null, // (day of week in month);
	        "y": "YYYY", // (year - every digit);
	        "yy": "YY", // (year - two digits);
	        "yyy": "YYYY", // (year - three digits);
	        "yyyy": "YYYY", // (year - every digit);
	        "Y": null, // (week year - two digits);
	        "YY": "gg", // (week year - two digits);
	        "YYY": null, // (week year - three digits);
	        "YYYY": "gggg", // (week year - all digits);
	        "a": "A", // (AM or PM);
	        "aa": "AA", // (AM or PM);
	        "G": null, // (era - AD or BC);
	        "M": "M", // (month in year - two digits, 1..12);
	        "MM": "MM", // (month in year - two digits, 01..12);
	        "MMM": "MMM", // (month in year - short text);
	        "MMMM": "MMMM", // (month in year - full text);
	        "MMMMM": "MMMM", // (month in year - full text);
	        "h": "h", // (hour - one or two digits, 12 hours, 1..12);
	        "hh": "hh", // (hour - two digits, 12 hours, 01..12);
	        "H": "H", // (hour - one or two digits, 24 hours, 0..23);
	        "HH": "HH", // (hour - two digits, 24 hours, 00..23);
	        "k": "k", // (hour - one or two digits, 12 hours, 1..24);
	        "kk": "kk", // (hour - two digits, 24 hours, 01..24);
	        "K": null, // (hour - one or two digits, 12 hours, 0..11);
	        "KK": null, // (hour - two digits, 12 hours, 00..11);
	        "m": "m", // (minutes - one or two digits);
	        "mm": "mm", // (minutes - two digits);
	        "s": "s", // (seconds- one or two digits);
	        "ss": "ss", // (seconds - two digits);
	        "S": "S", // (millisecond);
	        "SS": "SS", // (millisecond);
	        "SSS": "SSS", // (millisecond);
	        "E": "ddd", // (day name in week - short);
	        "EE": "ddd", // (day name in week - short);
	        "EEE": "ddd", // (day name in week - short);
	        "EEEE": "dddd", // (day name in week - full);
	        "w": "W", // (week in year - one or two digits);
	        "ww": "WW", // (week in year - two digits, zero-padded);
	        "W": null, // (week in month - one or two digits);
	        "WW": null, // (week in month - two digits, zero-padded);
	        "z": null, // (General time zone);
	        "zz": null, // (General time zone);
	        "zzz": null, // (General time zone);
	        "zzzz": null, // (General time zone);
	        "Z": "ZZ", // (RFC 822 time zone);
	        "X": null, // (ISO 8601 time zone -  - hours only);
	        "XX": "ZZ", // (ISO 8601 time zone - short);
	        "XXX": "Z", // (ISO 8601 time zone - long);
	        "u": "E" };
	
	    obj.replaceAll = function (str, substr, newSubstr) {
	        while (str.indexOf(substr) >= 0) {
	            str = str.replace(substr, newSubstr);
	        }
	        return str;
	    };
	
	    obj.mapFragment = function (formatString, mapping, beginIndex, currentIndex) {
	        var subFormat = formatString.substring(beginIndex, currentIndex);
	        // if null then ignore that fragment
	        if (mapping[subFormat] === null) {
	            subFormat = "";
	        }
	        // if not undefined then return that fragment from mapping
	        if (mapping[subFormat] !== undefined) {
	            subFormat = mapping[subFormat];
	        }
	        // otherwise return fragment from original
	        return subFormat;
	    };
	
	    obj.getMappedIndex = function (formatString, mapping, beginIndex, currentIndex) {
	        do {
	            currentIndex += 1;
	        } while (mapping[formatString.substring(beginIndex, currentIndex)] !== undefined && currentIndex < formatString.length);
	        return currentIndex;
	    };
	
	    obj.translate = function (formatString, mapping, escapeSource, escapeTarget) {
	        var len = formatString.length,
	            i = 0,
	            beginIndex = 0,
	            index = 0,
	            result = "",
	            fragment = "";
	
	        // hack for Java single quote char ( '' -> '), part 1/2
	        formatString = this.replaceAll(formatString, "''", "\u0007");
	
	        while (i < len) {
	            if (formatString.charAt(beginIndex) === escapeSource[0]) {
	                while (i + 1 < formatString.length && formatString.charAt(i + 1) !== escapeSource[1]) {
	                    i += 1;
	                }
	                result += escapeTarget[0];
	                result += formatString.substring(beginIndex + 1, i + 1);
	                result += escapeTarget[1];
	                i += 2;
	                beginIndex = i;
	            }
	
	            // map fragment
	            index = obj.getMappedIndex(formatString, mapping, beginIndex, i);
	            fragment = formatString.substring(beginIndex, index);
	            if (mapping[fragment] !== null) {
	                if (mapping[fragment] !== undefined) {
	                    // if we get mapping add it to result
	                    result += mapping[fragment];
	                } else if (mapping[formatString.substring(beginIndex, index - 1)] !== undefined) {
	                    // if we don't have mapping try do map fragment 1 letter smaller
	                    result += mapping[formatString.substring(beginIndex, index - 1)];
	                    index -= 1;
	                } else {
	                    // if we don't map anything just add fragment to result
	                    result += fragment;
	                }
	            }
	            beginIndex = index;
	            i = index;
	        }
	
	        // hack for Java single quote char ( '' -> '), part 2/2
	        result = this.replaceAll(result, "\u0007", "'");
	
	        // trimming whitespaces from beginning and end
	        return result.trim();
	    };
	
	    obj.toJsDate = function (formatString) {
	        return obj.translate(formatString, javaToJavaScript, "''", "[]");
	    };
	
	    exports.toJsDate = obj.toJsDate;
	})();

/***/ })
/******/ ]);
//# sourceMappingURL=jdate-converter-service.js.map