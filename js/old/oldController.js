let breathUnits = [];
let breathSentences = [];
let breathWords = [];
let breathSyllables = [];

function buildGradient(a, b){
    console.log(a);
    let span = document.querySelector(".changeable" + b + "");
    let ratio = ((a*100)/3);
    let bar = "<div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='70' aria-valuemin='0' aria-valuemax='100' style='width:" + ratio + "%'>" + a + "</div></div>";
    span.innerHTML = bar;
    console.log("done");
}

function classDOMManipulation(a, b){
    buildGradient(a, b);
}

function domAddition(a, b, c){
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
    classDOMManipulation(b, c);
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
        domAddition(b1, c.breath, i);
    }
}

//Splits paragraph and array of sentences
function segment(a){
  //split each sentence by periods.
  let b = a.split(". ");
  package(b);
}

function startCount(){
    //Grab paragraph
    let paragraphToProcess = document.getElementById('inputPlace').value;
    //Segment paragraph
    segment(paragraphToProcess.toString());
    //Run statistics
    statistics();

}
