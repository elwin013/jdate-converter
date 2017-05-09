var converter = require("../jdate-converter");
var assert = require("assert");

describe("Java to JS date", function() {
    it("simple date", function() {
        assert.equal(converter.toJsDate("dd/MM/yyyy"), "D/MM/YYYY");
    });
    it("date with date and timezone", function() {
        assert.equal(converter.toJsDate("EEEE, MMMM d, yyyy h:mm:ss a z"),"ddd, MMMM D, YYYY h:mm:ss A");    
    })
});