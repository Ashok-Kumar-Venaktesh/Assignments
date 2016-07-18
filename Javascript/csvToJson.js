/*Author: Ashok Kumar V
Created: 18-July-2016
Description: Creates 3 json files required to plot graph given in the asssignment. For more details refer Readme.txt
*/

//Variable Declaration
var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');
var data;
var instream = fs.createReadStream('./Indicators.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;
var i = 1960;
var ruralPopulation;
var urbanPopulation;
var urbanPopulationGrowth;
var totalGrowth;
var year;
var tempData = {};
var jsonData = [];
var tempData1 = {};
var tempData2 = {};
var jsonData1 = [];
var jsonData2 = [];
var population = [0.0, 0.0, 0.0,0.0,0.0,0.0,0.0,0.0,0.0];
var countryList = ['India','Bangladesh','China'];
var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});
//options 
var optio = new Object();
optio.flag = "a";
optio.encoding = "utf8"


//readline one by one
rl.on('line', function(line) {
    //regular expression to match and split line
    var arr = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    //Get the rural population data
    if (arr[2] == undefined) {

    } else if (arr[4] == i && arr[2].match(/Rural population \(\% of total population\)/)) {
        
        if (arr[0] == 'India') {
            
            ruralPopulation = arr[5];
            tempData["Growth"] = ruralPopulation;
            tempData["Year"] = i;
            tempData["Client"] = "Rural Population (% of total Population)";
            jsonData.push(tempData);
            tempData = {};
        }

        for (j = 0; j < countryList.length; j = j + 1) {

            if (arr[0] == countryList[j]) {        
                population[j] = parseFloat(population[j]) + parseFloat(arr[5]);        
            }            
        }        

    }


    // Get the Urban population (%total)
    if (arr[2] == undefined) {

    } else if (arr[4] == i && arr[2].match(/Urban population \(\% of total\)/)) {
        if (arr[0] == 'India') {
            console.log(arr[0], arr[2], arr[4], i);
            urbanPopulation = arr[5];

            tempData["Year"] = i;
            tempData["Client"] = "Uraban Population (% of total Population)";
            tempData["Growth"] = urbanPopulation;
            jsonData.push(tempData);
            tempData = {};
            
        }
        for (j = 0; j < countryList.length; j = j + 1) {

            if (arr[0] == countryList[j]) {            
                population[j+3] = parseFloat(population[j+3]) + parseFloat(arr[5]);            
            }
            
        }

    }

    // Get the Urban population growth
    if (arr[2] == undefined) {

    } else if (arr[4] == i && arr[2].match(/Urban population growth \(annual \%\)/)) {

        if (arr[0] == 'India') {
            console.log(arr[0], arr[2], arr[4], i);
            urbanPopulationGrowth = arr[5];
            tempData1["Client1"] = "Urban Population Growth (% total Population)";
            year = i;
            tempData1["Growth"] = urbanPopulationGrowth;
            tempData1["Year"] = year;
            //console.log(urbanPopulationGrowth, year);        
            i = i + 1;
            jsonData1.push(tempData1);
            tempData1 = {};
        }

    }


});

//At the end of reading csv file
rl.on('close', function() {

    //Display the values
    console.log("India, Rural Population", population[0]);
    console.log("Bangladesh, Rural Population", population[1]);
    console.log("China, Rural Population", population[2]);
    console.log("India, Urban Population", population[3]);
    console.log("Bangladesh, Urban Population", population[4]);
    console.log("China, Urban Population", population[5]);

    tempData2["key"] = "India";
    tempData2["Rural Population"] = population[0];
    tempData2["Urban Population"] = population[3];
    jsonData2.push(tempData2);
    tempData2 = {};

    tempData2["key"] = "Bangladesh";
    tempData2["Rural Population"] = population[1];  
    tempData2["Urban Population"] = population[4];
    jsonData2.push(tempData2);
    tempData2 = {};

    tempData2["key"] = "China";
    tempData2["Rural Population"] = population[2];
    tempData2["Urban Population"] = population[5];
    jsonData2.push(tempData2);
    tempData2 = {};

    //Generate json output files
    fs.writeFileSync("./MultiSeriesChart/multiSeriesLine.json", JSON.stringify(jsonData), optio);
    fs.writeFileSync("./AreaChart/areaChart.json", JSON.stringify(jsonData1), optio);
    fs.writeFileSync("./StackedBarChart/stackedBarChart.json", JSON.stringify(jsonData2), optio);
});
