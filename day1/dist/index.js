"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var numberset = [];
// anon function to encourage garbage collection on `dataset`
(function () {
    var dataset = fs_1.default.readFileSync(path_1.default.join(__dirname, '../dataset.txt'), { encoding: 'ascii' }).split(/\r?\n/); // support unix and windows line endings
    for (var _i = 0, dataset_1 = dataset; _i < dataset_1.length; _i++) {
        var i = dataset_1[_i];
        numberset.push(parseInt(i));
    }
    numberset = numberset.sort(function (a, b) { return a - b; });
    fs_1.default.writeFileSync(path_1.default.join(__dirname, '../numberset.txt'), JSON.stringify(numberset, undefined, 2));
})();
var found = false;
var top = numberset.length - 2; //because for some stupid reason the last element is null
var bottom = 0;
var target = 2020;
var ops = 0;
while (!found) {
    ops++;
    var cache = numberset[top] + numberset[bottom];
    console.log(cache, numberset[top], numberset[bottom]);
    if (cache == target) {
        found = true;
        console.log("Found " + numberset[top] + " + " + numberset[bottom] + " = 2020 in " + ops + " operations.");
    }
    else if (cache > target) {
        top--;
    }
    else if (cache < target) {
        bottom++;
    }
    if (top < bottom) {
        console.log('Failure');
    }
}
// anon function so I can return false.
/*
(()=>{
    for(var num of numberset) {
        var search = 2020-num;
        var index = binarySearch(search,numberset);
        console.log(`Using ${num}, looking for ${search}, found ${index}`);
        if(index!=false) {
            console.log(`Found ${search} + ${numberset[index]} = 2020!`);
            return true;
        }
    }
})();


function binarySearch(needle:number,numberset:number[]) {
    var index = Math.round(numberset.length / 2);
    var lower = 0;
    var upper = numberset.length;
    while(true) {
        var quickLook = numberset[index]; // so we don't do a billion lookups
        //console.log(quickLook,index,upper,lower)
        if(quickLook==needle) return index;
        else if(lower == upper) return false;
        else if(lower - upper <= 1) {
            if(lower == needle) return lower;
            if(upper == needle) return upper;
            return false;
        }
        else if(quickLook>needle) {
            upper = index;
        } else {
            lower = index;
        }
        index = Math.floor((lower + upper) / 2);
    }
}*/ 
