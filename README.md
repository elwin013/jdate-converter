# jdate-converter [![Build Status](https://travis-ci.org/elwin013/jdate-converter.svg?branch=master)](https://travis-ci.org/elwin013/jdate-converter)

A simple library to convert Java date & time format to JavaScript date & time format (used for example in moment.js).

Based on: 
 * [moment-jdateformatparser](https://github.com/MadMG/moment-jdateformatparser)
 * [Locale utils from BootsFaces-OSP](https://github.com/TheCoder4eu/BootsFaces-OSP/blob/master/src/main/java/net/bootsfaces/utils/LocaleUtils.java)

### Usage
Install with npm (or bower) and then:

```javascript
var converter = require("jdate-converter");

var date = converter.toJsDate("dd/MM/yyyy")

// date = "D/MM/YYYY"

```

### Usage in AngularJS
Install with npm (or bower) and then add module `jdateConverter` to your app. Now you can use service named `jdateConverter`:

```javascript
angular.module("yourModule")
    .controller("YourService", function($scope, jdateConverter) {
        $scope.myDateFormat = jdateConverter.toJsDate("dd/MM/yyyy");
        // $scope.myDateFormat should be "D/MM/YYYY"
    };
```

Important: service have working format cache (you don't have to create it on your own).

### Contribution
You're interested in contributing? Awesome! Fork, make change, commit and create
pull request. I'll do my best to merge changes!

### License
[MIT](/LICENSE)