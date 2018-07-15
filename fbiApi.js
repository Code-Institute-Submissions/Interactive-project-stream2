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
        .colors(d3.scale.ordinal().domain(["Victims", "Offenders"]).range(["white", "red"]))
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
    
    for (let i = 0; i <= newData.data.length - 1; i++) {
        let yearResults = newData.data[i].data_year;
        let ethnicityResults = newData.data[i].key

        if ((yearInput == yearResults && ethnicityInput == ethnicityResults) ||
            (yearInput == yearResults && ethnicityInput == "") ||
            (ethnicityInput == ethnicityResults && yearInput == "")) 
        {
            document.getElementById(resultsId).innerHTML += "<strong>Year: </strong>" + newData.data[i].data_year + "<br>" + "<strong>Ethnicity: </strong>" + newData.data[i].key + "<br>";
            counter += newData.data[i].value
             document.getElementById(totalsId).innerHTML = counter
            
        }
    }
    return counter;
}



function afterhours() {
    var offenders = mainFunc("resultsOffenders", "totalCountOffenders", dataResponseOffenderObj);
    var victims = mainFunc("resultsVictims", "totalCountVictims", dataResponseVictimObj);
  
    var formatObj = [
        { name: 'Offenders', count: offenders },
        { name: 'Victims', count: victims }
    ];
    document.getElementById("resultsid").classList.remove("display_none");
    document.getElementById("underThePieChartOffendersCount").innerHTML = "<p>"+offenders+"</p>";
    document.getElementById("underThePieChartVictimsCount").innerHTML = victims;
   // $( "#totalCountVictims" ).clone().appendTo( "#underThePieChartVictimsCount" );
    //$( "#totalCountOffenders" ).clone().appendTo( "#underThePieChartOffendersCount" );

    makeGraph(formatObj);
}

haterequest.onload = function() {

        //console.log('newData', this.responseText)
        const parsedData = JSON.parse(this.responseText)
        $('#crimediv').html('')
        for (let i = 0; i <= parsedData.keys.length - 1; i++) {
            $('#crimediv').append('<input type="radio" name="ethnicity" id="ethinicity_input" value="'+parsedData.keys[i]+'"> '+parsedData.keys[i]+'</input><br>');
        }

    dataResponseOffenderObj.textForResponse = this.responseText
}



victimrequest.onload = function() {
    dataResponseVictimObj.textForResponse = this.responseText
}






function startParty(crime, crimeTitle) {
    $('#titleCrime').html(crimeTitle)
    haterequest.open("GET", "https://fbi-flask-restful-api-mboladop.c9users.io:8080/offenders/" + crime);

    victimrequest.open("GET", "https://fbi-flask-restful-api-mboladop.c9users.io:8080/victims/"+ crime);

    haterequest.send();
    victimrequest.send();

 
}