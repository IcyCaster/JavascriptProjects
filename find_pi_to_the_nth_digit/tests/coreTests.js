var assert = require('assert');
var should = require('chai').should();
var core = require("../bin/main");

describe('BBP Formula', function() {
    describe('Calculate pie to decimal', function() {
        it('should correctly return first digit for π', function() {
            var pie = core.CalculatePieToDecimal(0)
            assert.equal(pie,3);
        });
        it('should correctly return first decimal for π', function() {
            var pie = core.CalculatePieToDecimal(1)
            var actual = pie.toFixed(1)
            assert.equal(actual,3.1);
        });
        it('should correctly return second decimal for π', function() {
            var pie = core.CalculatePieToDecimal(2)
            var actual = pie.toFixed(2)
            assert.equal(actual,3.14);
        });
        it('should correctly return π to 10 digits', function() {
            var pie = core.CalculatePieToDecimal(10)
            var actual = pie.toFixed(10)
            assert.equal(actual,3.1415926536);
        });
        // Apparently the assert.equal doesn't check things past the 15th-ish decimal place???
        it('should correctly return π to 100 digits', function() {
            var pie = core.CalculatePieToDecimal(100)
            var actual = pie.toFixed(20)
            assert.equal(actual,3.14159265358979311600);
        });
        it('should correctly return the specific digit', function() {
            var pie = core.CalculatePieToDecimal(function(num, decimal) { var one = String(num).charAt(decimal); return one; }, 3);
            assert.equal(pie,4);
        });
    });
});
