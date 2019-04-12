/**=============================================================================
        Hides index content and shows content with results
=============================================================================**/
function desktopDomResults(){
    document.getElementById('initialized').setAttribute("hidden", "hidden");
    document.getElementById('results').removeAttribute("hidden");
}

/**=============================================================================
        Grabs the input and returns it to the model as a string.
=============================================================================**/
function grabStringFromDOM(idOfInput){
    //Grab input string
    let inputToProcess = document.getElementById(idOfInput).value;
    return inputToProcess.toString();
}

/**=============================================================================
    Factory method for sentence characteristics table
=============================================================================**/
function buildSentenceCharacteristicsTable(text, breath, identity, words, syllables, iteration){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    //Lift element up later
    let element = document.querySelector("#outputPlace");
    span1.innerHTML = text;
    span2.setAttribute("data-breath", " " + breath + " ");
    span2.innerHTML = breath;
    span2.setAttribute("class", "changeable" + identity + "");
    td3.innerHTML = iteration;
    td1.appendChild(span1);
    td1.setAttribute("class", "changeable");
    td2.appendChild(span2);
    td2.setAttribute("width", "150px");
    td3.setAttribute("width", "50px");
    tr.appendChild(td3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    element.appendChild(tr);
}

/**=============================================================================
    Builds in-table progress bars for visual representation
=============================================================================**/
function buildGradient( identity, sumOfWords, sumOfSyllables, breathsInSentence, wordMax, syllableMax, breathMax){
    let span = document.querySelector(".changeable" + identity + "");
    let wordRatio = ((sumOfWords*100)/wordMax);
    let syllableRatio = ((sumOfSyllables*100)/syllableMax);
    let breathRatio = ((breathsInSentence*100)/breathMax);
    let bar = "<div class='progress progress-bar-adjustment'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + wordRatio + "%'>" + sumOfWords + "</div></div>";
    let bar1 = "<div class='progress progress-bar-adjustment'><div class='progress-bar bg-info' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + syllableRatio + "%'>" + sumOfSyllables + "</div></div>";
    let bar2 = "<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + breathRatio + "%; opacity: .7;'>" + breathsInSentence + "</div></div>";
    let bigbar = bar.concat(bar1).concat(bar2);
    span.innerHTML = bigbar;
}

/**=============================================================================
    Appends breath statistics to body statistics table
=============================================================================**/
function buildBreathStatistics(maximum, minimum, average, median, deviation){
    document.getElementById('breathAverage').innerHTML = average.toFixed(2);
    document.getElementById('breathMax').innerHTML = maximum.toFixed(2);
    document.getElementById('breathMin').innerHTML = minimum.toFixed(2);
    document.getElementById('breathMedian').innerHTML = median.toFixed(2);
    document.getElementById('breathDeviation').innerHTML = deviation.toFixed(2);
}

/**=============================================================================
    Appends syllable statistics to body statistics table
=============================================================================**/
function buildSyllableStatistics(maximum, minimum, average, median, deviation){
    document.getElementById('syllableAverage').innerHTML = average.toFixed(2);
    document.getElementById('syllableMax').innerHTML = maximum.toFixed(2);
    document.getElementById('syllableMin').innerHTML = minimum.toFixed(2);
    document.getElementById('syllableMedian').innerHTML = median.toFixed(2);
    document.getElementById('syllableDeviation').innerHTML = deviation.toFixed(2);
}

/**=============================================================================
    Appends word statistics to body statistics table
=============================================================================**/
function buildWordStatistics(maximum, minimum, average, median, deviation){
    document.getElementById('wordAverage').innerHTML = average.toFixed(2);
    document.getElementById('wordMax').innerHTML = maximum.toFixed(2);
    document.getElementById('wordMin').innerHTML = minimum.toFixed(2);
    document.getElementById('wordMedian').innerHTML = median.toFixed(2);
    document.getElementById('wordDeviation').innerHTML = deviation.toFixed(2);
}

/**=============================================================================
    Builds body statistics tables
=============================================================================**/
function buildBodyStatisticsTable(bodyStatistics){

    // Body word Statistics
    buildWordStatistics(
          bodyStatistics.wordMax,
          bodyStatistics.wordMin,
          bodyStatistics.wordAverage,
          bodyStatistics.wordMedian,
          bodyStatistics.wordDeviation
    );

    // Body syllable Statistics
    buildSyllableStatistics(
          bodyStatistics.syllableMax,
          bodyStatistics.syllableMin,
          bodyStatistics.syllableAverage,
          bodyStatistics.syllableMedian,
          bodyStatistics.syllableDeviation
    );

    // Body Breath statistics
    buildBreathStatistics(
          bodyStatistics.breathMax,
          bodyStatistics.breathMin,
          bodyStatistics.breathAverage,
          bodyStatistics.breathMedian,
          bodyStatistics.breathDeviation
    );
}
