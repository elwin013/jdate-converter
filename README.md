# jdate-converter

A simple library to convert Java date & time format to JavaScript date & time format (used for example in moment.js).

Based on: 
 * [moment-jdateformatparser](https://github.com/MadMG/moment-jdateformatparser)
 * [Locale utils from BootsFaces-OSP](https://github.com/TheCoder4eu/BootsFaces-OSP/blob/master/src/main/java/net/bootsfaces/utils/LocaleUtils.java)

### Usage
Install with npm and then:

```javascript
var converter = require("jdate-converter");

var date = converter.toJsDate("dd/MM/yyyy")

// date = "D/MM/YYYY"

```

### Contribution
You're interested in contributing? Awesome! Fork, make change, commit and create
pull request. I'll do my best to merge changes!

### License
[MIT](/LICENSE)