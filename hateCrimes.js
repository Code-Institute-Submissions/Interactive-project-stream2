let dataResponseOffenderObj = {}
let dataResponseVictimObj = {}
let haterequest = new XMLHttpRequest();
let victimrequest = new XMLHttpRequest();

function displayHateNicely(apiData) {
    let newData = JSON.parse(apiData);

    // document.getElementById("ethnicity").innerHTML = "<strong>Ethnicity: </strong>" + newData.results[0].ethnicity + "<br>";
    // document.getElementById("year").innerHTML += "<strong>Year: </strong>" + newData.results[0].year + "<br>";

    // document.getElementById("count").innerHTML += "<strong>Count: </strong>" + newData.results[0].count;

    // for ( let i = 0; i <= newData.results.length -1;i++) {
    // document.getElementById("year").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Count: </strong>" + newData.results[i].count + "<br>"+ "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
    // }
}



//function displayVictimsNicely(apiData) {
//    let newData = JSON.parse(apiData);

//    document.getElementById("ethnicityv").innerHTML = "<strong>Ethnicity: </strong>" + newData.results[0].ethnicity + "<br>";

//   document.getElementById("yearv").innerHTML += "<strong>Year: </strong>" + newData.results[0].year + "<br>";

//   document.getElementById("countv").innerHTML += "<strong>Count: </strong>" + newData.results[0].count;
//}



function returnCountOff() {

    document.getElementById("search_results").textContent = "";
    document.getElementById("total_count").textContent = "";
debugger;
    let newData = JSON.parse(dataResponseOffenderObj.textForResponse);

    let yearInput = document.getElementById("crimeForm")['year'].value
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    let totalNumberOffenders = 0;

    for (let i = 0; i <= newData.results.length - 1; i++) {
        let yearResults = newData.results[i].year;
        let ethnicityResults = newData.results[i].ethnicity


        if (yearInput == yearResults && ethnicityInput == ethnicityResults) {
            document.getElementById("search_results").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
                totalNumberOffenders += newData.results[i].count
            document.getElementById("total_count").innerHTML = totalNumberOffenders

        }
        else if (yearInput == yearResults && ethnicityInput == "" ) {
            document.getElementById("search_results").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberOffenders += newData.results[i].count
            document.getElementById("total_count").innerHTML = totalNumberOffenders

        }
        else if (ethnicityInput == ethnicityResults && yearInput == ""){
            document.getElementById("search_results").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberOffenders += newData.results[i].count
            document.getElementById("total_count").innerHTML = totalNumberOffenders
        }
    }

    return false;
}

function returnCountVic() {
    document.getElementById("search_resultsv").textContent = "";
    document.getElementById("total_countv").textContent = "";
debugger;
    let newData = JSON.parse(dataResponseVictimObj.textForResponse);

    let yearInput = document.getElementById("crimeForm")['year'].value
    let ethnicityInput = document.getElementById("crimeForm")['ethnicity'].value
    let totalNumberVictims = 0;

    for (let i = 0; i <= newData.results.length - 1; i++) {
        let yearResults = newData.results[i].year;
        let ethnicityResults = newData.results[i].ethnicity


        if (yearInput == yearResults && ethnicityInput == ethnicityResults) {
            document.getElementById("search_resultsv").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberVictims += newData.results[i].count
            document.getElementById("total_countv").innerHTML = totalNumberVictims

        }
        else if (yearInput == yearResults && ethnicityInput == "") {
            document.getElementById("search_resultsv").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberVictims += newData.results[i].count
            document.getElementById("total_countv").innerHTML = totalNumberVictims

        }
        else if (ethnicityInput == ethnicityResults && yearInput == "") {
            document.getElementById("search_resultsv").innerHTML += "<strong>Year: </strong>" + newData.results[i].year + "<br>" + "<strong>Ethnicity: </strong>" + newData.results[i].ethnicity + "<br>";
            totalNumberVictims += newData.results[i].count
            document.getElementById("total_countv").innerHTML = totalNumberVictims
        }
    }

    return false;
}


haterequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayHateNicely(this.responseText);

    }
    dataResponseOffenderObj.textForResponse = this.responseText
}



victimrequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayHateNicely(this.responseText)
    }
    dataResponseVictimObj.textForResponse = this.responseText
}




haterequest.open("GET", "https://api.usa.gov/crime/fbi/ucr/offenders/count/national/ethnicity?page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv");

victimrequest.open("GET", "https://api.usa.gov/crime/fbi/ucr/victims/count/national/ethnicity?page=1&per_page=100&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv");

haterequest.send();
victimrequest.send();
