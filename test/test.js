var converter = require("../src/jdate-converter");
var assert = require("assert");

describe("Java to JS date", function () {
    it("simple date", function () {
        assert.equal(converter.toJsDate("dd/MM/yyyy"), "D/MM/YYYY");
    });
    it("date with date and timezone", function () {
        assert.equal(converter.toJsDate("EEEE, MMMM d, yyyy h:mm:ss a z"), "ddd, MMMM D, YYYY h:mm:ss A");
    });
    it("date with full month", function() {
        assert.equal(converter.toJsDate("yyyy.MMMMM.dd hh:mm aa"), "YYYY.MMMM.DD hh:mm aa");
    });
    it("date with short month", function() {
        assert.equal(converter.toJsDate("yyyy.MMM.dd hh:mm aa"), "YYYY.MMM.DD hh:mm aa");
    })
    it("escape test 1", function () {
        assert.equal(converter.toJsDate("'test'"), "[test]");
    });
    it("escape test 2", function () {
        assert.equal(converter.toJsDate("EEEE, d MMMM yyyy HH:mm:ss 'o''clock' z"), "ddd, D MMMM YYYY HH:mm:ss [o'clock]");
    });
});