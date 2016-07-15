// This file is taken from test2.js

var fs = require('fs'),
readline = require('readline'),
    stream = require('stream');
var data;
var instream = fs.createReadStream('./Indicators.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;
var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

var optio = new Object();
optio.flag = "a";
optio.encoding = "utf8"

var i = 1960;
var ruralPopulation;
var urbanPopulation;
var urbanPopulationGrowth;
var totalGrowth;
var year;
var tempData = {};
var jsonData = [];
var tempData1 = {};
var jsonData1 = [];
'India','Bangladesh','China','Mongolia','Korea, Rep.','Korea, Dem. Rep.','Vietnam','Lao PDR','Myanmar','Cambodia','Indonesia','Philippines','Malaysia','Singapore','Afghanistan','Bhutan','Brunei Darussalam','Iran, Islamic Rep.','Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyz Republic','Lebanon','Maldives','Nepal','Oman','Pakistan','Qatar','Saudi Arabia','Sri Lanka','Syrian Arab Republic','Tajikistan','Thailand','Turkmenistan','United Arab Emirates','Uzbekistan','Yemen, Rep.','Macao SAR, China','Hong Kong SAR, China','Albania','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Hungary','Iceland','Ireland','Italy','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Cyprus','Macedonia, FYR','Romania','Russia','Serbia','lovak Republic','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom','Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon','Central African Republic','Chad','Comoros','Congo, Dem. Rep.','Congo, Rep.',"Cote d'Ivoire",'Djibouti','Egypt, Arab Rep.','Equatorial Guinea','Eritrea','Ethiopia','Gabon','Gambia','Ghana','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Swaziland','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe','Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela, RB','Antigua and Barbuda','Bahamas, The','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','St. Kitts and Nevis','St. Lucia','St. Vincent and The Grenadines','Trinidad and Tobago','United States','Australia','Papua New Guinea','Fiji','Kiribati','Marshall Islands','Micronesia, Fed. Sts.','New Zealand','Palau','Samoa','Solomon Islands','Tonga','Tuvalu','Vanuatu','American Samoa','French Polynesia','Guam'
rl.on('line', function(line) {

    var arr = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    //console.log(arr);
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Rural population \(\% of total population\)/) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        ruralPopulation = arr[5];
        tempData["Growth"] = ruralPopulation;
        tempData["Year"] = i;
        tempData["Client"] = "Rural Population (% of total Population)";
        jsonData.push(tempData);
        tempData = {};
        console.log(ruralPopulation);

    }


    // Get the Urban population (%total)
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Urban population \(\% of total\)/) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        urbanPopulation = arr[5];

        tempData["Year"] = i;
        tempData["Client"] = "Uraban Population (% of total Population)";
        tempData["Growth"] = urbanPopulation;
        jsonData.push(tempData);
        tempData = {};
        console.log(urbanPopulation);
    }

    // Get the Urban population growth
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Urban population growth \(annual \%\)/) && arr[0] == 'India') {
        //else if (arr[2].match(/Urban population growth \(/g) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        urbanPopulationGrowth = arr[5];
        tempData1["Client1"] = "Urban Population Growth (% total Population)";
        year = i;
        tempData1["Growth"] = urbanPopulationGrowth;
        tempData1["Year"] = year;
        console.log(urbanPopulationGrowth, year);        
        i = i + 1;
        jsonData1.push(tempData1);
        tempData1 = {};
        
        /*tempData["UrbanPopulationGrowth"] = urbanPopulationGrowth;
        year = i;
        tempData["Year"] = year;
        console.log(urbanPopulationGrowth, year);        
        i = i + 1;

        jsonData.push(tempData);
        tempData={};
        */// fs.writeFileSync("data.json", JSON.stringify(jsonData), optio);
    }

});

rl.on('close',function(){
    fs.writeFileSync("test6.json", JSON.stringify(jsonData), optio);
    fs.writeFileSync("test61.json", JSON.stringify(jsonData1), optio);
});
