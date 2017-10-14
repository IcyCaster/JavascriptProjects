exports = {
    TransformCell: this.TransformCell,
    CountAliveNeighbours: this.CountAliveNeighbours,
    IsUnderPopulated: this.IsUnderPopulated,
    IsOverPopulated: this.IsOverPopulated,
    IsReproduced: this.IsReproduced,
    GetNeighbours: this.GetNeighbours,
    TickCell: this.TickCell
};


TickCell = function(xPosition, yPosition, universe) {
    var cell = universe[yPosition][xPosition];
    var neighbours = GetNeighbours(xPosition,yPosition,universe);
    return TransformCell(cell, neighbours);
};

GetNeighbours = function(x, y, universe) {
    var width = universe[0].length;
    var length = universe.length;

    var topLeft;
    if(y-1 < 0 || x-1 < 0) topLeft = 0;
    else topLeft = universe[y-1][x-1];

    var topMiddle;
    if(y-1 < 0) topMiddle = 0;
    else topMiddle = universe[y-1][x];

    var topRight;
    if(y-1 < 0 || x+1 > width-1) topRight = 0;
    else topRight = universe[y-1][x+1];

    var middleLeft;
    if(x-1 < 0) middleLeft = 0;
    else middleLeft = universe[y][x-1];

    var middleRight;
    if(x+1 > width-1) middleRight = 0;
    else middleRight = universe[y][x+1];

    var bottomLeft;
    if(y+1 > length-1 || x-1 < 0) bottomLeft = 0;
    else bottomLeft = universe[y+1][x-1];

    var bottomMiddle;
    if(y+1 > length-1 ) bottomMiddle = 0;
    else bottomMiddle = universe[y+1][x];

    var bottomRight;
    if(y+1 > length-1 || x+1 > width-1) bottomRight = 0;
    else bottomRight = universe[y+1][x+1];

    return [topLeft, topMiddle, topRight, middleRight, bottomRight, bottomMiddle, bottomLeft, middleLeft ]
};

TransformCell = function (cell, neighbourList) {
    var aliveCount = CountAliveNeighbours(neighbourList);
    if(IsUnderPopulated(aliveCount) || IsOverPopulated(aliveCount)) cell = 0;
    if(IsReproduced(aliveCount)) cell = 1;
    return cell;
};

CountAliveNeighbours = function(neighbourList){
    if(neighbourList.length > 8) throw "Number of neighbours is too high!";
    var count = 0;
    for(i = 0; i < neighbourList.length; i++) {
        if(neighbourList[i] == 1) count++;
        else if(neighbourList[i] != 0) throw "A neighbour(s) is not alive or dead!";
    }
    return count;
};

IsUnderPopulated = function (aliveNeighbourCount) {
    if(aliveNeighbourCount < 2) return true;
    return false;
};

IsOverPopulated = function (aliveNeighbourCount) {
    if(aliveNeighbourCount > 3) return true;
    return false;
};

IsReproduced = function (aliveNeighbourCount) {
    if(aliveNeighbourCount == 3) return true;
    return false;
 };