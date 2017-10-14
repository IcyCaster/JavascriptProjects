var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var cellTicker = require("../src/CellTicker");

describe('CellTicker tests', function() {
    describe('CountAliveNeighbours', function() {
        it('should return 0 alive neighbours when they are all dead.', function() {
            var neighbours = [0,0,0,0,0,0,0,0];
            var aliveCount = CountAliveNeighbours(neighbours);
            assert.equal(aliveCount, 0);
        });
        it('should return 1 alive neighbours when only 1 is alive.', function() {
            var neighbours = [0,0,0,0,0,0,0,1];
            var aliveCount = CountAliveNeighbours(neighbours);
            assert.equal(aliveCount, 1);
        });
        it('should return 8 alive neighbours when all are alive.', function() {
            var neighbours = [1,1,1,1,1,1,1,1];
            var aliveCount = CountAliveNeighbours(neighbours);
            assert.equal(aliveCount, 8);
        });
        it('should return an error when there are over 8 neighbours.', function() {
            var neighbours = [1,1,1,1,1,1,1,1,0];
            try{
                CountAliveNeighbours(neighbours);
            }
            catch(error){
                assert.equal(error, "Number of neighbours is too high!");
            }
        });
        it('should return an error when a neighbour is not 1 or 0.', function() {
            var neighbours = [1,2,3,4,5,6,7,8];
            try{
                CountAliveNeighbours(neighbours);
            }
            catch(error){
                assert.equal(error, "A neighbour(s) is not alive or dead!");
            }
        });
    });
    describe('IsUnderPopulated', function() {
        it('should return true if the cell has one or less neighbours.', function() {
            var actual = IsUnderPopulated(1);
            assert.equal(actual, true);
        });
        it('should return false if the has two or more neighbours.', function() {
            var actual = IsUnderPopulated(2);
            assert.equal(actual, false);
        });
    });
    describe('IsOverPopulated', function() {
        it('should return true if the cell has four or more neighbours.', function() {
            var actual = IsOverPopulated(4);
            assert.equal(actual, true);
        });
        it('should return false if the cell has three or less neighbours.', function() {
            var actual = IsOverPopulated(3);
            assert.equal(actual, false);
        });

    });
    describe('IsReproduced', function() {
        it('should return false if the cell has more or less than three neighbours.', function() {
            var actual = IsReproduced(2);
            assert.equal(actual, false);
        });
        it('should return true if the cell has three neighbours.', function() {
            var actual = IsReproduced(3);
            assert.equal(actual, true);
        });
        it('should return false if the cell has more or less than three neighbours.', function() {
            var actual = IsReproduced(4);
            assert.equal(actual, false);
        });
    });
    describe('TransformCell', function() {
        it('should return dead if alive with 1 alive neighbours', function() {
            var neighbours = [0,0,0,0,0,0,1,0];
            var actual = TransformCell(1, neighbours);
            assert.equal(actual, 0);
        });
        it('should return alive if alive with 2 alive neighbours', function() {
            var neighbours = [0,0,0,1,0,0,1,0];
            var actual = TransformCell(1, neighbours);
            assert.equal(actual, 1);
        });
        it('should return alive if alive with 3 alive neighbours', function() {
            var neighbours = [1,0,0,1,0,0,1,0];
            var actual = TransformCell(1, neighbours);
            assert.equal(actual, 1);
        });
        it('should return dead if alive with 4 alive neighbours', function() {
            var neighbours = [1,0,0,1,1,0,1,0];
            var actual = TransformCell(1, neighbours);
            assert.equal(actual, 0);
        });

        it('should return dead if dead with 1 alive neighbours', function() {
            var neighbours = [0,0,0,0,0,0,1,0];
            var actual = TransformCell(0, neighbours);
            assert.equal(actual, 0);
        });
        it('should return dead if dead with 2 alive neighbours', function() {
            var neighbours = [0,0,0,1,0,0,1,0];
            var actual = TransformCell(0, neighbours);
            assert.equal(actual, 0);
        });
        it('should return alive if dead with 3 alive neighbours', function() {
            var neighbours = [1,0,0,1,0,0,1,0];
            var actual = TransformCell(0, neighbours);
            assert.equal(actual, 1);
        });
        it('should return dead if dead with 4 alive neighbours', function() {
            var neighbours = [1,0,0,1,1,0,1,0];
            var actual = TransformCell(0, neighbours);
            assert.equal(actual, 0);
        });
    });
    describe('GetNeighbours', function() {
        it('should return three alive neighbours when surrounded on the corner of the universe..', function() {
            var miniverse = [
                [9,1,0],
                [1,1,0],
                [0,0,0]];
            var actual = GetNeighbours(0, 0, miniverse);
            expect(actual).to.deep.equal([0,0,0,1,1,1,0,0]);
        });
        it('should return three alive neighbours when surrounded on the corner of the universe..', function() {
            var miniverse = [
                [0,0,0],
                [0,1,1],
                [0,1,9]];
            var actual = GetNeighbours(2, 2, miniverse);
            expect(actual).to.deep.equal([1,1,0,0,0,0,0,1]);
        });
        it('should return five alive neighbours when surround on the edge of the universe.', function() {
            var miniverse = [
                [1,9,1],
                [1,1,1],
                [0,0,0]];
            var actual = GetNeighbours(1, 0, miniverse);
            expect(actual).to.deep.equal([0,0,0,1,1,1,1,1]);
        });
        it('should return all alive neighbours when surrounded completely by alive neighbours.', function() {
            var miniverse = [
                [1,1,1],
                [1,9,1],
                [1,1,1]];
            var actual = GetNeighbours(1, 1, miniverse);
            expect(actual).to.deep.equal([1,1,1,1,1,1,1,1]);
        });
        it('should return all dead neighbours when surrounded completely by dead neighbours.', function() {
            var miniverse = [
                [0,0,0],
                [0,9,0],
                [0,0,0]];
            var actual = GetNeighbours(1, 1, miniverse);
            expect(actual).to.deep.equal([0,0,0,0,0,0,0,0]);
        });
    });
    describe('TickCell', function() {
        it('should turn an alive cell dead when there are 0 alive neighbours', function() {
            var miniverse = [
                [0,0,0],
                [0,1,0],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('should turn an alive cell dead when there is 1 alive neighbour', function() {
            var miniverse = [
                [0,0,0],
                [0,1,0],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('should keep an alive cell alive when there are 3 alive neighbours', function() {
            var miniverse = [
                [1,1,0],
                [0,1,1],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 1);
        });
        it('should turn an alive cell dead when there are 4 alive neighbours', function() {
            var miniverse = [
                [1,1,0],
                [0,1,0],
                [1,0,1]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('should keep a dead cell dead when there are 0 alive neighbours', function() {
            var miniverse = [
                [0,0,0],
                [0,0,0],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('should keep a dead cell dead when there is 1 alive neighbour', function() {
            var miniverse = [
                [0,0,0],
                [0,0,0],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('should turn an dead cell alive when there are 3 alive neighbours', function() {
            var miniverse = [
                [1,1,0],
                [0,0,1],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 1);
        });
        it('should keep a dead cell dead when there are 4 alive neighbours', function() {
            var miniverse = [
                [1,1,0],
                [0,0,0],
                [1,0,1]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('edge case 1', function() {
            var miniverse = [
                [0,0,0],
                [0,0,1],
                [1,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
        it('edge case 2', function() {
            var miniverse = [
                [0,0,1],
                [1,0,0],
                [0,0,0]];
            var actual = TickCell(1, 1, miniverse);
            assert.equal(actual, 0);
        });
    });
});