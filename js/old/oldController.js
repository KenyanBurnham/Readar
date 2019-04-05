let breathUnits = [];
let breathSentences = [];
let breathWords = [];
let breathSyllables = [];

function buildBreathStatistics(breaths){
    let averageSentence = "Average Breath Unit Size: " + breaths[0];
    let maxSentence = "Maximum Breath Unit Size: " + breaths[1];
    let minSentence = "Minimum Breath Unit Size: " + breaths[2];
    let medianSentence = "Median Breath Unit Size: " + breaths[3];
    let standarDeviationSentence = "Standard Deviation: " + breaths[4];
    document.getElementById('breathAverage').innerHTML = averageSentence;
    document.getElementById('breathMax').innerHTML = maxSentence;
    document.getElementById('breathMin').innerHTML = minSentence;
    document.getElementById('breathMedian').innerHTML = medianSentence;
    document.getElementById('breathDeviation').innerHTML = standarDeviationSentence;
}

function buildSyllableStatistics(syllables){
    let averageSentence = "Average Syllable Size: " + syllables[0];
    let maxSentence = "Maximum Syllable Size: " + syllables[1];
    let minSentence = "Minimum Syllable Size: " + syllables[2];
    let medianSentence = "Median Syllable Size: " + syllables[3];
    let standarDeviationSentence = "Standard Deviation: " + syllables[4];
    document.getElementById('syllableAverage').innerHTML = averageSentence;
    document.getElementById('syllableMax').innerHTML = maxSentence;
    document.getElementById('syllableMin').innerHTML = minSentence;
    document.getElementById('syllableMedian').innerHTML = medianSentence;
    document.getElementById('syllableDeviation').innerHTML = standarDeviationSentence;
}

function buildWordStatistics(words){
    let averageSentence = "Average Word Size: " + words[0];
    let maxSentence = "Maximum Word Size: " + words[1];
    let minSentence = "Minimum Word Size: " + words[2];
    let medianSentence = "Median Word Size: " + words[3];
    let standarDeviationSentence = "Standard Deviation: " + words[4];
    document.getElementById('wordAverage').innerHTML = averageSentence;
    document.getElementById('wordMax').innerHTML = maxSentence;
    document.getElementById('wordMin').innerHTML = minSentence;
    document.getElementById('wordMedian').innerHTML = medianSentence;
    document.getElementById('wordDeviation').innerHTML = standarDeviationSentence;
}

function buildBodyStatistics(){
    let wordStatistics = wordStatistics();
    let syllableStatistics = syllableStatistics();
    let breathUnitsStatistics = breathUnitsStatistics();
    buildWordStatistics(wordStatistics);
    buildSyllableStatistics(wordStatistics);
    buildBreathStatistics(wordStatistics);
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
