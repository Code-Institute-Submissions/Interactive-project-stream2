let dataResponseOffenderObj = {}
let dataResponseVictimObj = {}
let haterequest = new XMLHttpRequest();
let victimrequest = new XMLHttpRequest();

function makeGraph(thingData) {

    let ndx = crossfilter(thingData);

    let nameDim = ndx.dimension(dc.pluck('name'));
    let totalCount = nameDim.group().reduceSum(dc.pluck("count"));

    let countChart = dc.pieChart("#pie-chart-count");

    countChart
        .height(300)
        .radius(100)
        .dimension(nameDim)
        .group(totalCount)
        .ordinalColors(["pink", "lightgreen", "blue"])
        .render()

    dc.renderAll();
}

function mainFunc(resultsId, totalsId, dataObject) {
    document.getElementById(resultsId).textContent = "";
    document.getElementById(totalsId).textContent = "";

    let newData = JSON.parse(dataObject.textForResponse);

    let yearInput = document.getElementById("crimeForm")['year'].value
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    let counter = 0;

    for (let i = 0; i <= newData.results.length - 1; i++) {
        let yearResults = newData.results[i].year;
        let ethnicityResults = newData.results[i].ethnicity

        if ((yearInput == yearResults && ethnicityInput == ethnicityResults) ||
            (yearInput == yearResults && ethnicityInput == "") ||
            (ethnicityInput == ethnicityResults && yearInput == "")) 
        {
            document.getElementById(resultsId).innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            counter += newData.results[i].count
            document.getElementById(totalsId).innerHTML = counter

        }
    }

    return counter;
}
/*
function returnCountOff() {

    document.getElementById("search_results").textContent = "";
    document.getElementById("total_count").textContent = "";
    let newData = JSON.parse(dataResponseOffenderObj.textForResponse);

    let yearInput = document.getElementById("crimeForm")['year'].value
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    let totalNumberOffenders = 0;

    for (let i = 0; i <= newData.results.length - 1; i++) {
        let yearResults = newData.results[i].year;
        let ethnicityResults = newData.results[i].ethnicity

        if ((yearInput == yearResults && ethnicityInput == ethnicityResults) ||
            (yearInput == yearResults && ethnicityInput == "") ||
            (ethnicityInput == ethnicityResults && yearInput == "")
        ) {
            document.getElementById("search_results").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberOffenders += newData.results[i].count
            document.getElementById("total_count").innerHTML = totalNumberOffenders
        }
    }



    return totalNumberOffenders;
}

function returnCountVic() {
    document.getElementById("search_resultsv").textContent = "";
    document.getElementById("total_countv").textContent = "";

    let newData = JSON.parse(dataResponseVictimObj.textForResponse);

    let yearInput = document.getElementById("crimeForm")['year'].value
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    let totalNumberVictims = 0;

    for (let i = 0; i <= newData.results.length - 1; i++) {
        let yearResults = newData.results[i].year;
        let ethnicityResults = newData.results[i].ethnicity

        if ((yearInput == yearResults && ethnicityInput == ethnicityResults) ||
            (yearInput == yearResults && ethnicityInput == "") ||
            (ethnicityInput == ethnicityResults && yearInput == "")) 
        {
            document.getElementById("search_resultsv").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberVictims += newData.results[i].count
            document.getElementById("total_countv").innerHTML = totalNumberVictims

        }
    }

    return totalNumberVictims;
}*/


function startParty() {
    var offenders = mainFunc("search_results", "total_count", dataResponseOffenderObj);
    var victims = mainFunc("search_resultsv", "total_countv", dataResponseVictimObj);
  
    var formatObj = [
        { name: 'Offenders', count: offenders },
        { name: 'Victims', count: victims }
    ];

    makeGraph(formatObj);
}

haterequest.onreadystatechange = function() {
    dataResponseOffenderObj.textForResponse = this.responseText
}



victimrequest.onreadystatechange = function() {
    dataResponseVictimObj.textForResponse = this.responseText
}




haterequest.open("GET", "https://api.usa.gov/crime/fbi/ucr/offenders/count/national/ethnicity?page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv");

victimrequest.open("GET", "https://api.usa.gov/crime/fbi/ucr/victims/count/national/ethnicity?page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv");

haterequest.send();
victimrequest.send();
