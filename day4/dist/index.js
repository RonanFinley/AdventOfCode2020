"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var passports = [];
var requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid",
];
// anon function to encourage garbage collection on `dataset`
(function () {
    var dataset = fs_1.default.readFileSync(path_1.default.join(__dirname, '../dataset.txt'), { encoding: 'ascii' }).split(/\r?\n{2}/); // support unix and windows line endings
    // the passports are seperated by a doublenewline
    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
        var i = dataset_1[_i];
        passports.push(i.split(/\s/)); //just match any whitespace
    }
})();
var countValid = 0;
for (var _i = 0, passports_1 = passports; _i < passports_1.length; _i++) {
    var passport = passports_1[_i];
    var validFields = 0;
    for (var _a = 0, requiredFields_1 = requiredFields; _a < requiredFields_1.length; _a++) {
        var field = requiredFields_1[_a];
        if (passport.find(function (e) { return e.startsWith(field + ":"); })) {
            validFields++;
        }
    }
    if (validFields == requiredFields.length) {
        countValid++;
    }
}
console.log(countValid);
