var fs = require('fs');
// taking 3 files
var file1 = fs.readFileSync('../CSV/India2011.csv');
var file2 = fs.readFileSync('../CSV/IndiaSC2011.csv');
var file3 = fs.readFileSync('../CSV/IndiaST2011.csv');

var finalfile = file1 + file2 + file3;
//appending 3 files
fs.appendFile(finalfile);

var rows = [];	//rest of body/all data except headers
var varheader = []; //all headers in varheader
var rows = finalfile.split('\n');
var varHeader = rows[0].split(',');

var requiredHeader = [];	//all headers required by us in json
var index = [];	//index of required headers
//array of all age groups
var arrEducationCategory = ['Educational level - Literate without educational level - Persons','Educational level - Below Primary - Persons','Educational level - Primary - Persons','Educational level - Middle - Persons','Educational level - Matric/Secondary - Persons','Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons','Educational level - Non-technical diploma or certificate not equal to degree - Persons','Educational level - Technical diploma or certificate not equal to degree - Persons','Educational level - Graduate & above - Persons','Educational level - Unclassified - Persons','Age-group','Total/ Rural/ Urban'];
var sum = 0;

for(var i = 0;i < varHeader.length;i++){
  for (var j = 0; j < arrEducationCategory.length; j++) {
    if(varHeader[i] == arrEducationCategory[j]){
      requiredHeader.push(varHeader[i]);
      index.push(i);
    }
  }
}
// console.log(requiredHeader);
// console.log(index);

var varbody = [];
var sum=0;
var objEdu={};
var arrObj=[];
for(var j = 2;j < requiredHeader.length;j++){
  for(var i = 1;i < rows.length;i++){
    varbody = rows[i].split(',');
    if((varbody[index[1]]=='All ages') && (varbody[index[0]]=='Total')) {
      if(!(isNaN(varbody[index[j]]))){
        sum=sum+parseInt(varbody[index[j]]);
      }
    }
  }
objEdu['EduCateg']=requiredHeader[j];
objEdu['TotalPop']=sum;
  // objEdu[requiredHeader[j]]=sum;
  if(!(arrObj.hasOwnProperty(requiredHeader[j]))) {
    arrObj.push(objEdu);
    // console.log(objEdu);
    objEdu={};
  }
}

console.log(arrObj);
var jsString=JSON.stringify(arrObj);
fs.writeFileSync('../JSON/education.json',jsString);