"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Password = /** @class */ (function () {
    function Password(lower, upper, needle, hay) {
        this.indexOne = lower;
        this.indexTwo = upper;
        this.needle = needle;
        this.haystack = hay;
    }
    Password.prototype.verify = function () {
        // if the needle couldn't even fit
        //if(this.indexOne>=this.haystack.length || this.indexTwo>=this.haystack.length) return false;
        var count = 0;
        var i1 = this.haystack.split('')[this.indexOne - 1];
        var i2 = this.haystack.split('')[this.indexTwo - 1];
        if (i1 != i2 && (i1 == this.needle || i2 == this.needle))
            return true;
        return false;
    };
    return Password;
}());
var passwords = [];
// anon function to encourage garbage collection on `dataset`
(function () {
    var dataset = fs_1.default.readFileSync(path_1.default.join(__dirname, '../dataset.txt'), { encoding: 'ascii' }).split(/\r?\n/); // support unix and windows line endings
    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
        var i = dataset_1[_i];
        var needleExtract = i.split(': '); //["4-5 t", "ftttttrvts"]
        var haystack = needleExtract[1];
        var limitsExtract = needleExtract[0].split(' '); // ["4-5","t"];
        var needle = limitsExtract[1];
        var limits = limitsExtract[0].split('-'); // ["4","5"];
        var limitsNumbers = [parseInt(limits[0]), parseInt(limits[1])];
        passwords.push(new Password(limitsNumbers[0], limitsNumbers[1], needle, haystack));
    }
})();
//passwords.push(new Password(6,7,'g','gghggcggg'));
var count = 0;
for (var _i = 0, passwords_1 = passwords; _i < passwords_1.length; _i++) {
    var i = passwords_1[_i];
    console.log(i.indexOne, i.indexTwo, i.haystack, i.needle, i.verify());
    if (i.verify())
        count++;
}
console.log(count);
