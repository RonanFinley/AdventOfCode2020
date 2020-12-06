"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dataset = [];
dataset = fs_1.default.readFileSync(path_1.default.join(__dirname, '../dataset.txt'), { encoding: 'ascii' }).split(/\r?\n/); // support unix and windows line endings
var highestSeatNumber = -1;
for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
    var pass = dataset_1[_i];
    if (pass.length != 10)
        continue; //general failure
    else {
        var row = pass.slice(0, 7).split('');
        var col = pass.slice(7, 10).split('');
        console.log(row, col);
        var rowNumber = bracket(0, 127, row, 'B');
        var colNumber = bracket(0, 7, col, 'R');
        var seatNumber = rowNumber * 8 + colNumber;
        if (seatNumber > highestSeatNumber)
            highestSeatNumber = seatNumber;
    }
}
console.log(highestSeatNumber);
function bracket(from, to, binary, bool) {
    var lower = from;
    var higher = to;
    for (var _i = 0, binary_1 = binary; _i < binary_1.length; _i++) {
        var i = binary_1[_i];
        if (i == bool)
            lower = Math.ceil((lower + higher) / 2);
        else
            higher = Math.floor((lower + higher) / 2);
    }
    if (lower != higher)
        console.log("General failure: " + lower + " =/= " + higher + " ... returning lower");
    return lower;
}
