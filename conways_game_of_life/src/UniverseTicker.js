var cellTicker = require("../src/CellTicker");

StringifiedUniverse = function (universe) {
    var width = universe[0].length;
    var length = universe.length;
    var universeString = '';

    for(var i = 0; i < length; i++) {
        if(i != 0) universeString = universeString + '\n';
        for(var j = 0; j < width; j++) {
            universeString = universeString + "" + universe[i][j].toString();
        }
    }
    return universeString;
};


UpdateUniverse = function (universe) {
    var width = universe[0].length;
    var length = universe.length;

    var nextGen = [];

    for(var i = 0; i < length; i++) {
        for(var j = 0; j < width; j++) {
            if (!nextGen[i]) nextGen[i] = [];
            cell = TickCell(j,i,universe);
            nextGen[i][j] = cell;
        }
    }
    return nextGen;
};


TickUniverse = function (universe) {
    console.log("Conway's Game of Life");
    console.log(StringifiedUniverse(universe));
    while(true){
        sleep(1000);
        var universe = UpdateUniverse(universe);
        console.log("");
        console.log(StringifiedUniverse(universe));
    }
};

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}


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


TickUniverse(universe);


exports = {
    StringifiedUniverse: this.StringifiedUniverse,
    TickUniverse: this.TickUniverse,
    UpdateUniverse: this.UpdateUniverse

};