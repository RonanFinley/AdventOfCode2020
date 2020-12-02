import fs from 'fs';
import path from 'path';
var numberset:number[] = [];
// anon function to encourage garbage collection on `dataset`
(()=>{
	var dataset = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/\r?\n/); // support unix and windows line endings
	
	for(var i of dataset) {
		numberset.push(parseInt(i))
	}
	numberset = numberset.sort((a,b)=>a-b)
})();


var target = 2020;
(()=>{
	for(var x of numberset) {
		for(var y of numberset) {
			for(var z of numberset) {
				if(x+y+z == target) {
					console.log(`Found ${x} + ${y} + ${z} = 2020`);
					return false;
				}
			}
		}
	}
})();