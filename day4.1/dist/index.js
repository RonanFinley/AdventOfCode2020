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
var validHairColors = [
    "amb",
    "blu",
    "brn",
    "gry",
    "grn",
    "hzl",
    "oth"
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
        var index = passport.findIndex(function (e) { return e.startsWith(field + ":"); });
        if (index != -1) {
            var dataField = passport[index].split(":")[1];
            switch (field) {
                case "byr":
                    var year = parseInt(dataField);
                    if (year >= 1920 && year <= 2002)
                        validFields++;
                    break;
                case "iyr":
                    var year = parseInt(dataField);
                    if (year >= 2010 && year <= 2020)
                        validFields++;
                    break;
                case "eyr":
                    var year = parseInt(dataField);
                    if (year <= 2030 && year >= 2020)
                        validFields++;
                    break;
                case "hgt":
                    var height = parseInt(dataField.slice(0, dataField.length - 2));
                    if (dataField.includes("in") && height >= 59 && height <= 76)
                        validFields++;
                    else if (dataField.includes("cm") && height >= 150 && height <= 193)
                        validFields++;
                    break;
                case "hcl":
                    if (dataField.match(/#[0-9a-f]{6}/))
                        validFields++;
                    break;
                case "ecl":
                    if (validHairColors.includes(dataField))
                        validFields++;
                    break;
                case "pid":
                    if (dataField.match(/[0-9]{9}/) && dataField.length == 9)
                        validFields++;
                    break;
            }
        }
    }
    if (validFields == requiredFields.length) {
        countValid++;
    }
}
console.log(countValid);
