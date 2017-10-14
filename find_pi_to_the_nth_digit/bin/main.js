exports.CalculatePieToDecimal = function(callback, decimalPlace) {
    if(decimalPlace == 0) return 3;

    var n = 0;
    var pi = 0;

    for(n = 0; n < decimalPlace; n++){
        pi += BaileyBorweinPlouffeIteration(n);
    }

    if(typeof arguments[0] !== "function") {
        return pi;
    }

    return callback(pi, decimalPlace);

};

function BaileyBorweinPlouffeIteration(n){
    var a = (1/(Math.pow(16, n)));
    var b = (4/((8*n) + 1));
    var c = (2/((8*n) + 4));
    var d = (1/((8*n) + 5));
    var e = (1/((8*n) + 6));
    return a*( b - c - d - e );
}



