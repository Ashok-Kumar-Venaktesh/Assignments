/*Author: Ashok Kumar V
Created: 18-July-2016
Description: Creates 3 json files required to plot graph given in the asssignment. For more details refer Readme.txt
*/

//Variable Declaration
var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream'),
    data,
    instream = fs.createReadStream('./Indicators.csv'),
    year = 1960,
    ruralPopulation,
    urbanPopulation,
    urbanPopulationGrowth,
    totalGrowth,
    tempData = {},
    jsonData = [],
    jsonData1 = [],
    jsonData2 = [],
    population = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    countryList = ['India', 'Bangladesh', 'China'],
    optio = new Object();

var outstream = new stream;
outstream.readable = true;
outstream.writable = true;
var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

// regex options 
optio.flag = "a";
optio.encoding = "utf8"

var StackedPush = function(value1, value2, value3) {
    tempData["key"] = value1;
    tempData["Rural Population"] = value2;
    tempData["Uraban Population"] = value3;
    jsonData2.push(tempData);
    tempData = {};
}

var JsonPush = function(coloumnName, fileName, value) {
    tempData["Year"] = year;
    tempData["Client"] = coloumnName;
    tempData["Growth"] = value;
    fileName.push(tempData);
    tempData = {};
}

var LoopingCountryList = function(displacement, countryName, value) {
        countryList.forEach(function(currentValue, index) {
            if (countryName == currentValue) {
                population[parseInt(index) + parseInt(displacement)] = parseFloat(population[parseInt(index) + parseInt(displacement)]) + parseFloat(value);
            }
        })
    }


//readline one by one
rl.on('line', function(line) {
    //regular expression to match and split line
    var arr = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    //Get the rural population data
    if (arr[2] == undefined) {

    } else if (arr[4] == year && arr[2].match(/Rural population \(\% of total population\)/)) {
        if (arr[0] == 'India') {
            JsonPush("Rural Population (% of total Population)", jsonData, arr[5]);
        }
        LoopingCountryList(0, arr[0], arr[5]);
    }

    // Get the Urban population (%total)
    else if (arr[4] == year && arr[2].match(/Urban population \(\% of total\)/)) {
        if (arr[0] == 'India') {
            JsonPush("Uraban Population (% of total Population)", jsonData, arr[5]);
        }
        LoopingCountryList(3, arr[0], arr[5]);
    }

    // Get the Urban population growth
    else if (arr[4] == year && arr[2].match(/Urban population growth \(annual \%\)/) && arr[0] == 
    'India') {        
            JsonPush("Urban Population Growth (% total Population)", jsonData1, arr[5]);
            year = year + 1;        
    }
});

//At the end of reading csv file
rl.on('close', function() {
    StackedPush("India", population[0], population[3]);
    StackedPush("Bangladesh", population[1], population[4]);
    StackedPush("India", population[2], population[5]);

    //Generate json output files
    fs.writeFileSync("./MultiSeriesChart/multiSeriesLine.json", JSON.stringify(jsonData), optio);
    fs.writeFileSync("./AreaChart/areaChart.json", JSON.stringify(jsonData1), optio);
    fs.writeFileSync("./StackedBarChart/stackedBarChart.json", JSON.stringify(jsonData2), optio);
});
