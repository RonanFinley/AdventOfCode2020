"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * Most of this file is just JS with honorary TS typings
 * because it really doesn't matter for this problem
 * and it's a bit overkill to write typings for the
 * datastructures this problem uses.
 */
var groups = [];
groups = fs_1.default.readFileSync(path_1.default.join(__dirname, '../dataset.txt'), { encoding: 'ascii' }).split(/[\r?\n]{2}/); // support unix and windows line endings
;
var answers = {
    "a": 0, "b": 0, "c": 0, "d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, "j": 0, "k": 0, "l": 0, "m": 0, "n": 0, "o": 0, "p": 0, "q": 0, "r": 0, "s": 0, "t": 0, "u": 0, "v": 0, "w": 0, "x": 0, "y": 0, "z": 0
};
var dict = "abcdefghijklmnopqrstuvwxyz";
var copyOfAnswers = Object.freeze(answers);
for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
    var group = groups_1[_i];
    var groupAnswersCombined = newAnswerList();
    var individualAnswers = group.split(/\r?\n/);
    for (var _a = 0, individualAnswers_1 = individualAnswers; _a < individualAnswers_1.length; _a++) {
        var answerList = individualAnswers_1[_a];
        var uniquePerson = newAnswerList();
        var answerListIterable = answerList.split('');
        for (var _b = 0, answerListIterable_1 = answerListIterable; _b < answerListIterable_1.length; _b++) {
            var answer = answerListIterable_1[_b];
            if (dict.includes(answer)) {
                uniquePerson[answer] = 1;
            }
        }
        groupAnswersCombined = combineLists(groupAnswersCombined, uniquePerson);
    }
    answers = combineLists(trimToOne(groupAnswersCombined), answers);
}
var sumOfAllAnswers = 0;
for (var _c = 0, _d = Object.keys(answers); _c < _d.length; _c++) {
    var answerListArrayLey = _d[_c];
    sumOfAllAnswers += answers[answerListArrayLey];
}
console.log(sumOfAllAnswers);
function combineLists(listOne, listTwo) {
    var returnList = newAnswerList(); // turns out variables are passed by reference in this case, but we can create an unlinked variable.
    for (var i in listOne) { // due to the nature of this data we can assume that both lists contain all the necessary data;
        returnList[i] = listTwo[i] + listOne[i];
    }
    return returnList;
}
function trimToOne(list) {
    for (var _i = 0, _a = Object.keys(list); _i < _a.length; _i++) {
        var key = _a[_i];
        if (list[key] > 1)
            list[key] = 1;
    }
    return list;
}
// why. why must i do this.
function newAnswerList() {
    return JSON.parse(JSON.stringify(copyOfAnswers));
}
