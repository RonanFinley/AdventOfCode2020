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
const validHairColors = [
	"amb",
	"blu",
	"brn",
	"gry",
	"grn",
	"hzl",
	"oth"
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
		var index = passport.findIndex(e=>e.startsWith(field+":"));
		if(index!=-1) {
			var dataField = passport[index].split(":")[1];
			switch(field){
				case "byr":
					var year = parseInt(dataField)
					if(year >=1920 && year <= 2002) validFields++;
					break;
				case "iyr":
					var year = parseInt(dataField)
					if(year >=2010 && year <= 2020) validFields++;
					break;
				case "eyr":
					var year = parseInt(dataField)
					if(year <= 2030 && year >=2020) validFields++;
					break;
				case "hgt":
					var height = parseInt(dataField.slice(0,dataField.length-2));
					if(dataField.includes("in") && height >=59 && height <=76) validFields++;
					else if(dataField.includes("cm") && height >=150 && height <= 193) validFields++;
					break;
				case "hcl":
					if(dataField.match(/#[0-9a-f]{6}/)) validFields++;
					break;
				case "ecl":
					if(validHairColors.includes(dataField)) validFields++;
					break;
				case "pid":
					if(dataField.match(/[0-9]{9}/) && dataField.length == 9) validFields++;
					break;
			}
		}
	}
	if(validFields==requiredFields.length) {
		countValid++;
	}
}
console.log(countValid);