import fs from 'fs';
import path from 'path';

var groups:string[] = [];
groups = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/[\r?\n]{2}/); // support unix and windows line endings
interface ListOfAnswers {
	"a":number,
	"b":number,
	"c":number,
	"d":number,
	"e":number,
	"f":number,
	"g":number,
	"h":number,
	"i":number,
	"j":number,
	"k":number,
	"l":number,
	"m":number,
	"n":number,
	"o":number,
	"p":number,
	"q":number,
	"r":number,
	"s":number,
	"t":number,
	"u":number,
	"v":number,
	"w":number,
	"x":number,
	"y":number,
	"z":number
};
var answers:ListOfAnswers = {
	"a":0, "b":0, "c":0, "d":0, "e":0, "f":0, "g":0, "h":0, "i":0, "j":0, "k":0, "l":0, "m":0, "n":0, "o":0, "p":0, "q":0, "r":0, "s":0, "t":0, "u":0, "v":0, "w":0, "x":0, "y":0, "z":0
};
const dict = "abcdefghijklmnopqrstuvwxyz";
const copyOfAnswers = Object.freeze(answers);

for(var group of groups) {
	var groupAnswersCombined = newAnswerList();
	var individualAnswers = group.split(/\r?\n/);
	for(var answerList of individualAnswers) {
		var uniquePerson = newAnswerList();
		var answerListIterable = answerList.split('');
		for(var answer of answerListIterable) {
			if(dict.includes(answer)) {
				uniquePerson[answer] = 1;
			}
		}
		groupAnswersCombined = combineLists(groupAnswersCombined,uniquePerson);
	}
	answers = combineLists(trimToGroupSize(groupAnswersCombined, individualAnswers.length),answers);
}
var sumOfAllAnswers = 0;
for(var answerListArrayLey of Object.keys(answers)) {
	sumOfAllAnswers += answers[answerListArrayLey as keyof ListOfAnswers];
}
console.log(sumOfAllAnswers);
function combineLists(listOne:ListOfAnswers,listTwo:ListOfAnswers) {
	var returnList:any = newAnswerList(); // turns out variables are passed by reference in this case, but we can create an unlinked variable.
	for(var i in listOne) { // due to the nature of this data we can assume that both lists contain all the necessary data;
			returnList[i] = listTwo[i as keyof ListOfAnswers] + listOne[i as keyof ListOfAnswers];
	}
	return returnList;
}
function trimToGroupSize(list:ListOfAnswers,size:number) : ListOfAnswers {
	for(var key of Object.keys(list)) {
		if(list[key as keyof ListOfAnswers]>=size) list[key as keyof ListOfAnswers] = 1;
		else list[key as keyof ListOfAnswers] = 0;
	}
	return list;
}
// why. why must i do this.
function newAnswerList() {
	return JSON.parse(JSON.stringify(copyOfAnswers));
}