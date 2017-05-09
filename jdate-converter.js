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
;var jdateconverter = (function () {
    'use strict';
    var vm = {};
    
    var javaToJavaScript = {
        "d": "D",       // (day in month - one or two digits)");
        "dd": "DD",     // (day in month - two digits)");
        "D": "DDD",     // (day in year - one to three digits)");
        "DD": null,     // (day in year- two or three digits)");
        "DDD": "DDDD",  // (day in year- three digits)");
        "F": null,      // (day of week in month)");
        "y": "YYYY",    // (year - every digit)");
        "yy": "YY",     // (year - two digits)");
        "yyy": "YYYY",  // (year - three digits)");
        "yyyy": "YYYY", // (year - every digit)");
        "Y": null,      // (week year - two digits)");
        "YY": "gg",     // (week year - two digits)");
        "YYY": null,    // (week year - three digits)");
        "YYYY": "gggg", // (week year - all digits)");
        "a": "A",       // (AM or PM)");
        "G": null,      // (era - AD or BC)");
        "M": "M",       // (month in year - two digits, 1..12)");
        "MM": "MM",     // (month in year - two digits, 01..12)");
        "MMM": "MMM",   // (month in year - short text)");
        "MMMM": "MMMM", // (month in year - full text)");
        "h": "h",       // (hour - one or two digits, 12 hours, 1..12)");
        "hh": "hh",     // (hour - two digits, 12 hours, 01..12)");
        "H": "H",       // (hour - one or two digits, 24 hours, 0..23)");
        "HH": "HH",     // (hour - two digits, 24 hours, 00..23)");
        "k": "k",       // (hour - one or two digits, 12 hours, 1..24)");
        "kk": "kk",     // (hour - two digits, 24 hours, 01..24)");
        "K": null,      // (hour - one or two digits, 12 hours, 0..11)");
        "KK": null,     // (hour - two digits, 12 hours, 00..11)");
        "m": "m",       // (minutes - one or two digits)");
        "mm": "mm",     // (minutes - two digits)");
        "s": "s",       // (seconds- one or two digits)");
        "ss": "ss",     // (seconds - two digits)");
        "S": "S",       // (millisecond)");
        "SS": "SS",    // (millisecond)");
        "SSS": "SSS",  // (millisecond)");
        "E": "ddd",     // (day name in week - short)");
        "EE": "ddd",    // (day name in week - short)");
        "EEE": "ddd",   // (day name in week - short)");
        "EEEE": "dddd", // (day name in week - full)");
        "w": "W",       // (week in year - one or two digits)");
        "ww": "WW",     // (week in year - two digits, zero-padded)");
        "W": null,      // (week in month - one or two digits)");
        "WW": null,     // (week in month - two digits, zero-padded)");
        "z": null,      // (General time zone)");
        "zz": null,     // (General time zone)");
        "zzz": null,    // (General time zone)");
        "zzzz": null,   // (General time zone)");
        "Z": "ZZ",      // (RFC 822 time zone)");
        "X": null,      // (ISO 8601 time zone -  - hours only)");
        "XX": "ZZ",     // (ISO 8601 time zone - short)");
        "XXX": "Z",     // (ISO 8601 time zone - long)");
        "u": "E",       // (day number of week - 1=Monday, 7=Sunday)");
        // "'": "[]",// (escape character);
    }

    var translate = function(formatString, mapping) {
        var len = formatString.length,
            beginIndex = 1,
            lastChar = null,
            currentChar = "",
            result = "";

        for(var i = 0; i < len; i++) {
            currentChar = formatString.charAt(i);
            if(i > 0 && lastChar !== currentChar) {
                var fragment = mapFragment(formatString, mapping, beginIndex, i)
                result += fragment;
                beginIndex = i;
                if(i < formatString.length) {
                    lastChar = formatString.charAt(i);
                }
            }
        }

        if(beginIndex < formatString.length && i <= formatString.length) {
            result += mapFragment(formatString, mapping, beginIndex, i)
        }

        // trimming whitespaces from beginning and end
        return result.trim();
    } 

    var mapFragment = function(formatString, mapping, beginIndex, currentIndex) {
        var subFormat = formatString.substring(beginIndex, currentIndex);
        if(mapping[subFormat] === undefined) {
            return subFormat;
        } else if(mapping[subFormat] === null) {
            return "";
        } else {
            return mapping[subFormat];
        }
    }

    vm.toJsDate = function(formatString) {
        return translate(formatString, javaToJavaScript);
    }

    return vm;
}());

// function to export
exports.toJsDate = jdateconverter.toJsDate;

