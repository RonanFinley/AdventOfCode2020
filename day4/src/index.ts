import fs from 'fs';
import path from 'path';

var passports = [];

const requiredFields = [
	"byr",
	"iyr",
	"eyr",
	"hgt",
	"hcl",
	"ecl",
	"pid",
	//"cid"
];

// anon function to encourage garbage collection on `dataset`

(()=>{
	var dataset = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/\r?\n{2}/); // support unix and windows line endings
	// the passports are seperated by a doublenewline
	
	for(var i of dataset) {
		passports.push(i.split(/\s/)); //just match any whitespace
	}
})();

var countValid = 0;
for(var passport of passports) {
	var validFields = 0;
	for(var field of requiredFields) {
		if(passport.find(e=>e.startsWith(field+":"))) {
			validFields++;
		}
	}
	if(validFields==requiredFields.length) {
		countValid++;
	}
}
console.log(countValid);