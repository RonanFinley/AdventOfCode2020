import fs from 'fs';
import path from 'path';

var dataset:string[] = [];
dataset = fs.readFileSync(path.join(__dirname,'../dataset.txt'),{encoding:'ascii'}).split(/\r?\n/); // support unix and windows line endings

var previous = 0;
var seats = [];
for(var pass of dataset) {
	if(pass.length!=10) continue; //general failure
	else {
		var row:string[] = pass.slice(0,7).split('');
		var col:string[] = pass.slice(7,10).split('');
		var rowNumber = bracket(0,127,row,'B');
		var colNumber = bracket(0,7,col,'R');
		var seatNumber = rowNumber*8+colNumber;
		seats.push(seatNumber);
	}
}

seats.sort((a,b)=>a-b);
for(var seatIndex = 1; seatIndex < seats.length; seatIndex++) {
	if(seats[seatIndex]-seats[seatIndex-1]!=1) console.log(seats[seatIndex]-1)
}

function bracket(from:number,to:number,binary:string[],bool:string) {
	var lower = from;
	var higher = to;

	for(var i of binary) {
		if(i==bool) lower = Math.ceil((lower+higher)/2)
		else higher = Math.floor((lower+higher)/2)
	}

	if(lower != higher) console.log("General failure: " + lower + " =/= " + higher + " ... returning lower");
	return lower;
}