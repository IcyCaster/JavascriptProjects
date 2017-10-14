var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var universeTicker = require("../src/UniverseTicker");

describe('UniverseTicker tests', function() {
    describe('StringifiedUniverse', function() {
        it('should take the 2D and display it to the user.', function() {
            var universe = [
                [1,0,0,0,1,0,0,0,0,1],
                [1,1,1,0,1,0,1,0,1,1],
                [1,0,0,0,1,0,0,0,0,1],
                [1,0,1,0,1,0,0,1,0,1],
                [1,0,0,0,1,0,0,0,0,1],
                [1,0,1,1,1,0,1,0,0,1],
                [1,0,0,0,1,0,0,1,0,1],
                [1,1,1,0,1,0,0,1,0,1],
                [1,0,0,0,1,0,1,1,0,1],
                [1,0,1,0,1,0,0,0,0,1]];
            var universeAsAString = StringifiedUniverse(universe);
            assert.equal(universeAsAString,"1000100001\n1110101011\n1000100001\n1010100101\n1000100001\n1011101001\n1000100101\n1110100101\n1000101101\n1010100001");
        });
    });
    describe('UpdateUniverse', function() {
        it('should update the 1st example to alternate.', function() {
            var universeFrame1 = [
                [0,0,0,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0]];
            var universeFrame2 = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,0],
                [0,0,0,0,0]];
            var actual = UpdateUniverse(universeFrame1);
            expect(actual).to.deep.equal(universeFrame2);
            actual = UpdateUniverse(universeFrame2);
            expect(actual).to.deep.equal(universeFrame1);
        });
        it('should update the 2nd example to alternate.', function() {
            var universeFrame1 = [
                [0,0,0,0,0,0],
                [0,0,0,1,0,0],
                [0,1,0,0,1,0],
                [0,1,0,0,1,0],
                [0,0,1,0,0,0],
                [0,0,0,0,0,0]];
            var universeFrame2 = [
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,1,1,1,0],
                [0,1,1,1,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0]];
            var actual = UpdateUniverse(universeFrame1);
            expect(actual).to.deep.equal(universeFrame2);
            actual = UpdateUniverse(universeFrame2);
            expect(actual).to.deep.equal(universeFrame1);
        });
        it('should update the 3rd example to remain the same.', function() {
            var universeFrame1 = [
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0]];
            var universeFrame2 = [
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0]];
            var actual = UpdateUniverse(universeFrame1);
            expect(actual).to.deep.equal(universeFrame2);
        });
    });
});