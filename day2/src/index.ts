import fs from 'fs';
import path from 'path';
import { NumberLiteralType } from 'typescript';

class Password {
	lowerLimit:number;
	upperLimit:number;
	needle:string;
	haystack:string;
	constructor(lower:number,upper:number,needle:string,hay:string) {
		this.lowerLimit = lower;
		this.upperLimit = upper;
		this.needle = needle;
		this.haystack = hay;
	}
	verify() : boolean {
		// if the needle couldn't even fit
		if(this.lowerLimit>this.haystack.length) return false;
		var count = 0;
		var traverse = this.haystack.split('');
		for(var i in traverse) {
			if(traverse[i]==this.needle) count++;
		}
		if(count >= this.lowerLimit && count <= this.upperLimit) return true;
		return false;
	}
}

var passwords:Password[] = [];
// anon function to encourage garbage collection on `dataset`
(()=>{
	var dataset = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/\r?\n/); // support unix and windows line endings
	
	for(var i of dataset) {
		var needleExtract = i.split(': '); //["4-5 t", "ftttttrvts"]
		var haystack = needleExtract[1];
		var limitsExtract = needleExtract[0].split(' '); // ["4-5","t"];
		var needle = limitsExtract[1];
		var limits = limitsExtract[0].split('-'); // ["4","5"];
		var limitsNumbers = [parseInt(limits[0]),parseInt(limits[1])];
		passwords.push(new Password(limitsNumbers[0],limitsNumbers[1],needle,haystack));
	}
})();

var count = 0;
for(var i of passwords) {
	console.log(i.lowerLimit,i.upperLimit,i.haystack,i.needle);
	if(i.verify()) count++;
}
console.log(count);