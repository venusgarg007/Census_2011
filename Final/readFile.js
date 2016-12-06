var fs = require('fs');
var readline = require('readline');
//taking 3 files
var file1 = fs.readFileSync('../CSV/India2011.csv');
var file2 = fs.readFileSync('../CSV/IndiaSC2011.csv');
var file3 = fs.readFileSync('../CSV/IndiaST2011.csv');

// var writefile=fs.createWriteStream('.csv');

var finalfile = file1 + file2 + file3;
//appending 3 files
fs.appendFile(finalfile);

var rows = [];
var varheader = []; //all headers in varheader
var rows = finalfile.split('\n');
var varHeader = rows[0].split(',');

var requiredHeader = [];	//all headers required by us in json
var index = [];	//index of required headers
//array of all age groups

// var arrAgeGroup = ['0-6' , '7' , '8' , '9' , '10' , '11' , '12' , '13' , '14' , '15' , '16' , '17' , '18' , '19' , '20-24' , '25-29' , '30-34' , '35-39' , '40-44' , '45-49' , '50-54' , '55-59' , '60-64' , '65-69' , '70-74' , '75-79' , '80+' , 'Age not stated'];
var sum = 0;
for(var i = 0;i < varHeader.length;i++){
  if(varHeader[i] =='Literate - Persons' || varHeader[i] =='Age-group' || varHeader[i] =='Total/ Rural/ Urban'){
    requiredHeader.push(varHeader[i]);
    index.push(i);
  }
}
var body = [];
var arrAgeGroup = [];
for (var i = 1; i < rows.length-1; i++) {
  body = rows[i].split(',');
  if((arrAgeGroup.indexOf(body[index[1]]) < 0) && (body[index[1]] !== 'All ages') && (body[index[1]] !== 'Age-group')) {
    // if (!( || body[index[1]] == undefined || )) {
      arrAgeGroup.push(body[index[1]]);
    // }
  }
}
// console.log(arrAge);
// console.log(requiredHeader);
// console.log(index);

var pr;
var varbody = []; //rest of body/all data except headers
var ageObject={};
var arrObj=[];
for (var k = 0; k < arrAgeGroup.length; k++) {
  for(var i = 1;i < rows.length;i++){
    varbody = rows[i].split(',');
    for(var j = 0;j < requiredHeader.length;j++) {
      if(varbody[index[j+1]] == arrAgeGroup[k] && varbody[index[j]] == 'Total'){
        sum = sum+parseInt(varbody[index[j+2]]);
        ageObject['Age']=arrAgeGroup[k];
      }
    }
  }
  ageObject['Literate']=sum;
  arrObj.push(ageObject);
  ageObject={};
  sum=0;
}
console.log(arrObj);
var jsString=JSON.stringify(arrObj);
fs.writeFileSync('../JSON/age.json',jsString);