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
        .height(300)
        .radius(150)
        .dimension(nameDim)
        .group(totalCount)
        .colors(d3.scale.ordinal().domain(["Victims", "Offenders"]).range(["white", "red"]))
        .render()
    
    dc.renderAll();
}

function makeCompositeGraph(compositeGraph){
    
    let ndx = crossfilter(compositeGraph);
    
    
    let yearDim = ndx.dimension(dc.pluck('year'));
    let minDate = 1995;
    let maxDate = 2016;
    
    
    
    let victimsValue = yearDim.group().reduceSum(function(d) {
        if (d.name === 'Victims') {
            return +d.value;
            
        }
    else {
        return 0;
    }
    });
    
    let offendersValue = yearDim.group().reduceSum(function(d) {
        
        if (d.name === "Offenders") {
            return +d.value;
            //the plus sign forces the return to be a nº
        }
        else {
            return 0;
        }
    });
    
    let compositeChart = dc.compositeChart("#composite-chart")
    var width = document.getElementById('containerComposite').offsetWidth;
    compositeChart
        .width(width)
        .height(200)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(yearDim)
        .x(d3.scale.linear().domain([1995,2016]))
        .yAxisLabel("Number of Crimes")
        .xAxisLabel("Year")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        .compose([
            dc.lineChart(compositeChart)
            .colors("white")
            .group(victimsValue, "Victims"),
            dc.lineChart(compositeChart)
            .colors("red")
            .group(offendersValue, "Offenders"),
        ])
        .render()
        .yAxis().ticks(4);
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
   
    var compositeObj = [];
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    
    let parsedOffenderObj = JSON.parse(dataResponseOffenderObj.textForResponse);
    for (var i = 0; i <= parsedOffenderObj.data.length -1; i++) {
        let year = parsedOffenderObj.data[i].data_year;
        let race = parsedOffenderObj.data[i].key;
        let value =parsedOffenderObj.data[i].value;
        
        if (ethnicityInput == race){
            compositeObj.push({ name: 'Offenders', value: value, year: year });
        }
        
    }
    
    let parsedVictimObj = JSON.parse(dataResponseVictimObj.textForResponse);
    for (var i = 0; i <= parsedVictimObj.data.length -1; i++) {
        let year = parsedVictimObj.data[i].data_year;
        let race = parsedVictimObj.data[i].key;
        let value =parsedVictimObj.data[i].value;
        
        if (ethnicityInput == race){
            compositeObj.push({ name: 'Victims', value: value, year: year });
        }
        
    }
    
      //  { name: 'Offenders', value: offenders, year:offenders },
        
       
    
    document.getElementById("resultsid").classList.remove("display_none");
    document.getElementById("underThePieChartOffendersCount").innerHTML = "<p>"+offenders+"</p>";
    document.getElementById("underThePieChartVictimsCount").innerHTML = victims;
   // $( "#totalCountVictims" ).clone().appendTo( "#underThePieChartVictimsCount" );
    //$( "#totalCountOffenders" ).clone().appendTo( "#underThePieChartOffendersCount" );

    makeGraph(formatObj);
    makeCompositeGraph(compositeObj);
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
    $("#searchbtn").css("display", "block");
    $('#titleCrime').html(crimeTitle)
    haterequest.open("GET", "https://fbi-flask-restful-api-mboladop.c9users.io:8080/offenders/" + crime);

    victimrequest.open("GET", "https://fbi-flask-restful-api-mboladop.c9users.io:8080/victims/"+ crime);

    haterequest.send();
    victimrequest.send();

 
}