let breathUnits = [];
let breathSentences = [];
let breathWords = [];
let breathSyllables = [];

function buildBreathStatistics(breaths){
    let averageSentence = breaths[0].toFixed(2);
    let maxSentence = breaths[1].toFixed(2);
    let minSentence = breaths[2].toFixed(2);
    let medianSentence = breaths[3].toFixed(2);
    let standarDeviationSentence = breaths[4].toFixed(2);
    document.getElementById('breathAverage').innerHTML = averageSentence;
    document.getElementById('breathMax').innerHTML = maxSentence;
    document.getElementById('breathMin').innerHTML = minSentence;
    document.getElementById('breathMedian').innerHTML = medianSentence;
    document.getElementById('breathDeviation').innerHTML = standarDeviationSentence;
}

function buildSyllableStatistics(syllables){
    let averageSentence = syllables[0].toFixed(2);
    let maxSentence = syllables[1].toFixed(2);
    let minSentence = syllables[2].toFixed(2);
    let medianSentence = syllables[3].toFixed(2);
    let standarDeviationSentence = syllables[4].toFixed(2);
    document.getElementById('syllableAverage').innerHTML = averageSentence;
    document.getElementById('syllableMax').innerHTML = maxSentence;
    document.getElementById('syllableMin').innerHTML = minSentence;
    document.getElementById('syllableMedian').innerHTML = medianSentence;
    document.getElementById('syllableDeviation').innerHTML = standarDeviationSentence;
}

function buildWordStatistics(words){
    let averageSentence = words[0].toFixed(2);
    let maxSentence = words[1].toFixed(2);
    let minSentence = words[2].toFixed(2);
    let medianSentence = words[3].toFixed(2);
    let standarDeviationSentence = words[4].toFixed(2);
    document.getElementById('wordAverage').innerHTML = averageSentence;
    document.getElementById('wordMax').innerHTML = maxSentence;
    document.getElementById('wordMin').innerHTML = minSentence;
    document.getElementById('wordMedian').innerHTML = medianSentence;
    document.getElementById('wordDeviation').innerHTML = standarDeviationSentence;
}

function buildBodyStatistics(){
    let wordStats = wordStatistics();
    let syllableStats = syllableStatistics();
    let breathUnitsStats = breathUnitsStatistics();
    buildWordStatistics(wordStats);
    buildSyllableStatistics(syllableStats);
    buildBreathStatistics(breathUnitsStats);
}
//May need to move where this is
function buildGradient(a, b, c, d){
    let span = document.querySelector(".changeable" + b + "");
    let wordMax = getMaximum(breathWords);
    let syllableMax = getMaximum(breathSyllables);
    let breathMax = getMaximum(breathUnits);
    let wordRatio = ((c*100)/wordMax);
    let syllableRatio = ((d*100)/syllableMax);
    let breathRatio = ((a*100)/breathMax);
    let bar = "<div class='progress progress-bar-adjustment'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + wordRatio + "%'>" + c + "</div></div>";
    let bar1 = "<div class='progress progress-bar-adjustment'><div class='progress-bar bg-info' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + syllableRatio + "%'>" + d + "</div></div>";
    let bar2 = "<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + breathRatio + "%; opacity: .7;'>" + a + "</div></div>";
    let bigbar = bar.concat(bar1).concat(bar2);
    span.innerHTML = bigbar;
}

function classDOMManipulation(a, b, d, e){
    //Run statistics
    statistics();
    buildGradient(a, b, d, e);
    buildBodyStatistics();
}

function domAddition(a, b, c, d, e){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let element = document.querySelector("#outputPlace");
    span1.innerHTML = a;
    span2.setAttribute("data-breath", " " + b + " ");
    span2.innerHTML = b;
    span2.setAttribute("class", "changeable" + c + "");
    td3.innerHTML = c+1;
    td1.appendChild(span1);
    td1.setAttribute("class", "changeable");
    td2.appendChild(span2);
    td2.setAttribute("width", "150px");
    td3.setAttribute("width", "50px");
    tr.appendChild(td3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    element.appendChild(tr);
    classDOMManipulation(b, c, d, e);
}

//Processes sentences in process.js
function package(a){
    let iteration = a.length;
    for (let i = 0; i < iteration; i++) {
        let b = a[i];
// TODO: Add a "." to the end of b1
        let b1 = b.concat(". ");
        b = b.toString();
        b = b.replace(/(\r\n|\n|\r)/gm,"").trim();
        let c = processSentence(b);
        //breath units
        breathUnits[i] = c.breath;
        //sentences
        breathSentences[i] = c.source;
        //sum of words
        breathWords[i] = c.sumWords;
        //sum of syllables
        breathSyllables[i] = c.sumSyllables;
        /**
        source: a,
        words: x,
        syllables: y,
        sumSyllables: e,
        sumWords: f,
        sizes: z,
        breath: w,
        **/
        domAddition(b1, c.breath, i, c.sumWords, c.sumSyllables);
    }
}
function characterSearch(a){
    let Characters = new Object;
    let all = [];
    for (var i = 0; i < a.length; i++) {
        all = [a.charAt(i)];
    }
    Characters.original = a;
    Characters.chars = all;
    Characters.entries = all.entries;
    for (let f = 0; f <= all.length; f++){
        if(all[f] === "."){
            console.log("period");
        }
    }
    //filter non-word characters
    //var result = a.substring(1,3);
    //a.match(/\W/g); filters non-word characters and returns them
    //a.split("(?!^)") break into chars
    //a.exec("M"); searches for a string
    //console.log(result);

}

//Splits paragraph and array of sentences
function segment(a){
    //split each sentence by periods.
    //need to create cases for titles and other periods
    let index = characterSearch(a);
    let b = a.split(". ");
    package(b);
}

function startCount(){
    //Grab paragraph
    let paragraphToProcess = document.getElementById('inputPlace').value;
    //Segment paragraph
    segment(paragraphToProcess.toString());


}
