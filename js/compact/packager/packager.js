
//Packer create the output model
//then redirects the building functions to View.js
let Packager = {
    packagedSpans: [],
    spanEvent: function(identity){
        console.log(identity);
    },
    spanner: function(sentence, target){
      // TODO: Ensure parts of this functionality are moved to decoupler
        //this asks the document state for the exact splice where a sentence occurs
        //and then splices it and puts a span around it
        let state = Document.fetchDOMState(target);
        //create a unique id for the array
        let spanKey = createKey();
        //Create the span
        let replacement = "<span id='" + spanKey + "' onclick='Packager.spanEvent(this.id)'>" + sentence + "</span>";
        //console.log("Sentence in question: " + sentence);
        state = state.replace(sentence, replacement);
        //put the HTML back on the DOM
        document.getElementById(target).innerHTML = state;
        // add the span id to the packed spans list
        this.packagedSpans.push(spanKey);
        //Color solution?
        //https://stackoverflow.com/questions/3080421/javascript-color-gradient
        var tmp = generateColor('#000000','#ff0ff0',10);
        console.log(tmp.length);
    },
    wrapper: function(body, target){
        //This separates the paragraphs
        for (var i = 0; i < body.length; i++) {
            //console.log("paragraph:" + i);
            //let bodySpan = document.createElement("span");
            //grab the specific paragraphs
            let paragraph = body[i];
            //For each sentence in the paragraph create a span that is a a certain color
            for (var j = 0; j < paragraph.sentences.length; j++) {
                //Get individual sentence
                let sentence = paragraph.sentences[j];
                //console each sentence text
                //console.log("sentence: " + sentence.sentence);

                this.spanner(sentence.sentence, target);


                //get breaths in sentence
                let breaths = sentence.words.breaths;
                //Take the average of breath units in the sentence
                let averageBreath = Ariths.average(breaths);
                let minimumBreath = Ariths.minima(breaths);
                let maximumBreath = Ariths.maxima(breaths);
                //console.log("Average: " + averageBreath);
                //console.log("Minimum: " + minimumBreath);
                //console.log("Maximum: " + maximumBreath);
            }

        }//End of first for loop (paragraphs)
    },
    package: function(target){
        //Gets the body from document
        let body = Document.body;
        //Assembles the chartograph in Packager.wrapper
        let chartograph = Packager.wrapper(body, target);
        //Then mount to dom
        // mounting function goes here


        //KEY
        //body[whichParagraph].sentences[whichSentence].words.breaths[whichBreaths]
        //body[whichParagraph].sentences[whichSentence].words.count;
        //body[whichParagraph].sentences[whichSentence].words.lengths[whichLengths]
        //body[whichParagraph].sentences[whichSentence].words.syllables[whichSylls]
        //body[whichParagraph].sentences[whichSentence].words.words[whichWords]
        //console.log(body[0].originText);
        //console.log(body[1].originText);
        //console.log(Document.state[0]);
    },
}
