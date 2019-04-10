let breathUnits = [];
let breathSentences = [];
let breathWords = [];
let breathSyllables = [];

function buildBreathStatistics(breaths){
    document.getElementById('breathAverage').innerHTML = breaths[0].toFixed(2);
    document.getElementById('breathMax').innerHTML = breaths[4].toFixed(2);
    document.getElementById('breathMin').innerHTML = breaths[3].toFixed(2);
    document.getElementById('breathMedian').innerHTML = breaths[2].toFixed(2);
    document.getElementById('breathDeviation').innerHTML = breaths[1].toFixed(2);
}

function buildSyllableStatistics(syllables){
    document.getElementById('syllableAverage').innerHTML = syllables[0].toFixed(2);
    document.getElementById('syllableMax').innerHTML = syllables[4].toFixed(2);
    document.getElementById('syllableMin').innerHTML = syllables[3].toFixed(2);
    document.getElementById('syllableMedian').innerHTML = syllables[2].toFixed(2);
    document.getElementById('syllableDeviation').innerHTML = syllables[1].toFixed(2);
}

function buildWordStatistics(words){
    document.getElementById('wordAverage').innerHTML = words[0].toFixed(2);
    document.getElementById('wordMax').innerHTML = words[4].toFixed(2);
    document.getElementById('wordMin').innerHTML = words[3].toFixed(2);
    document.getElementById('wordMedian').innerHTML = words[2].toFixed(2);
    document.getElementById('wordDeviation').innerHTML = words[1].toFixed(2);
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
function buildGradient(breathsInSentence, iterationOfForLoop, sumOfWords, sumOfSyllables){
    let span = document.querySelector(".changeable" + iterationOfForLoop + "");
    let wordMax = getMaximum(breathWords);
    let syllableMax = getMaximum(breathSyllables);
    let breathMax = getMaximum(breathUnits);
    let wordRatio = ((sumOfWords*100)/wordMax);
    console.log(wordRatio);
    let syllableRatio = ((sumOfSyllables*100)/syllableMax);
    console.log(syllableRatio);
    let breathRatio = ((breathsInSentence*100)/breathMax);
    console.log(breathRatio);
    let bar = "<div class='progress progress-bar-adjustment'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + wordRatio + "%'>" + sumOfWords + "</div></div>";
    let bar1 = "<div class='progress progress-bar-adjustment'><div class='progress-bar bg-info' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + syllableRatio + "%'>" + sumOfSyllables + "</div></div>";
    let bar2 = "<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + breathRatio + "%; opacity: .7;'>" + breathsInSentence + "</div></div>";
    let bigbar = bar.concat(bar1).concat(bar2);
    span.innerHTML = bigbar;
}

function classDOMManipulation(breathsInSentence, iterationOfForLoop, sumOfWords, sumOfSyllables){
    //Run statistics to generate global
    statistics();
    //Creates progress bar element
    buildGradient(breathsInSentence, iterationOfForLoop, sumOfWords, sumOfSyllables);
    //Builds table with body statistics
    buildBodyStatistics();
}

function domAddition(copyOfSource, breathsInSentence, iterationOfForLoop, sumOfWords, sumOfSyllables){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let element = document.querySelector("#outputPlace");
    span1.innerHTML = copyOfSource;
    span2.setAttribute("data-breath", " " + breathsInSentence + " ");
    span2.innerHTML = breathsInSentence;
    span2.setAttribute("class", "changeable" + iterationOfForLoop + "");
    td3.innerHTML = iterationOfForLoop;
    td1.appendChild(span1);
    td1.setAttribute("class", "changeable");
    td2.appendChild(span2);
    td2.setAttribute("width", "150px");
    td3.setAttribute("width", "50px");
    tr.appendChild(td3);
    tr.appendChild(td1);
    tr.appendChild(td2);
    element.appendChild(tr);
    classDOMManipulation(breathsInSentence, iterationOfForLoop, sumOfWords, sumOfSyllables);
}

//Processes sentences in process.js
function package(source){
    let Body = {
        sentences: [],
    };
    for (let i = 0; i < source.length; i++) {
        //b is a temporary storage variable
        let mutableSource = source[i];
        //c is a copy of the original sentences that will not be altered
        let mutableCopy = mutableSource;
        mutableSource = mutableSource.toString();
        mutableSource = mutableSource.replace(/(\r\n|\n|\r)/gm,"").trim();
        let sentence = processSentence(mutableSource);
        //breath units
        breathUnits[i] = sentence.breath;
        //sentences
        breathSentences[i] = sentence.source;
        //sum of words
        breathWords[i] = sentence.sumWords;
        //sum of syllables
        breathSyllables[i] = sentence.sumSyllables;
        //DOM Addition Adds elements to the dom with the statistics
        domAddition(mutableCopy, sentence.breath, i, sentence.sumWords, sentence.sumSyllables);
        Body.sentences[i] = sentence;
    }
    return Body;
}

//Splits paragraph and array of sentences
function segment(a){
    //split each sentence by periods.
    //need to create cases for titles and other periods
    //let index = characterSearch(a);
    let b = a.split(". ");
    let body = package(b);
    getDataReady(body);
}

function startCount(){
    //Grab paragraph
    let paragraphToProcess = document.getElementById('inputPlace').value;
    //Segment paragraph
    segment(paragraphToProcess.toString());

    document.getElementById('initialized').setAttribute("hidden", "hidden");
    document.getElementById('results').removeAttribute("hidden");

// TODO: Put results on separate page
// TODO: Figure out why statistics are wrong
// TODO: find a graph library and impliment on results page
// TODO: Make CSS library for mobile view or make mobile templates
// TODO: Create sample text function that auto-inserts and runs
// TODO: Add footer with my info
// TODO: Write API for functions
// TODO: Package JS for other contributors
// TODO: Figure out manifest info for mobile homepage
// TODO: Figure out a way to export data
}
