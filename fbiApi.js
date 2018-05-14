let dataResponseOffenderObj = {}
let dataResponseVictimObj = {}
let haterequest = new XMLHttpRequest();
let victimrequest = new XMLHttpRequest();

function makeGraph(countChartData) {

    let ndx = crossfilter(countChartData);

    let nameDim = ndx.dimension(dc.pluck('name'));
    let totalCount = nameDim.group().reduceSum(dc.pluck("count"));

    let countChart = dc.pieChart("#pie-chart-count");

    countChart
        .height(200)
        .radius(100)
        .dimension(nameDim)
        .group(totalCount)
        .ordinalColors(["white", "red",])
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



function startParty() {
    var offenders = mainFunc("resultsOffenders", "totalCountOffenders", dataResponseOffenderObj);
    var victims = mainFunc("resultsVictims", "totalCountVictims", dataResponseVictimObj);
  
    var formatObj = [
        { name: 'Offenders', count: offenders },
        { name: 'Victims', count: victims }
    ];
    document.getElementById("resultsid").classList.remove("display_none");
    $( "#totalCountVictims" ).clone().appendTo( "#underThePieChartVictimsCount" );
    $( "#totalCountOffenders" ).clone().appendTo( "#underThePieChartOffendersCount" );

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
