import fs from 'fs';
import path from 'path';
var numberset:number[] = [];
// anon function to encourage garbage collection on `dataset`
(()=>{
	var dataset = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/\r?\n/); // support unix and windows line endings
	
	// cast full array into integers
	for(var i of dataset) {
		numberset.push(parseInt(i))
	}
	numberset = numberset.sort((a,b)=>a-b);
})();


var found = false;
var top = numberset.length-1;
var bottom = 0;
var target = 2020;
var ops = 0;
while(!found) {
	ops++;
	var cache = numberset[top] + numberset[bottom];
	console.log(cache, numberset[top], numberset[bottom])
	if(cache==target) {
		found = true;
		console.log(`Found ${numberset[top]} + ${numberset[bottom]} = 2020 in ${ops} operations.`);
	} else if(cache>target) {
		top--;
	} else if(cache<target) {
		bottom++;
	}
	if(top<bottom) {
		console.log('Failure')
	}
}