import fs from 'fs';
import path from 'path';
import { NumberLiteralType } from 'typescript';

class Password {
	indexOne:number;
	indexTwo:number;
	needle:string;
	haystack:string;
	constructor(lower:number,upper:number,needle:string,hay:string) {
		this.indexOne = lower;
		this.indexTwo = upper;
		this.needle = needle;
		this.haystack = hay;
	}
	verify() : boolean {
		// if the needle couldn't even fit
		//if(this.indexOne>=this.haystack.length || this.indexTwo>=this.haystack.length) return false;
		var count = 0;
		var i1 = this.haystack.split('')[this.indexOne-1];
		var i2 = this.haystack.split('')[this.indexTwo-1];
		if(i1!=i2 && (i1==this.needle || i2==this.needle)) return true;
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
//passwords.push(new Password(6,7,'g','gghggcggg'));

var count = 0;
for(var i of passwords) {
	console.log(i.indexOne,i.indexTwo,i.haystack,i.needle,i.verify());
	if(i.verify()) count++;
}
console.log(count);