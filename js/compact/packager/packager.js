
//Packer create the output model
//then redirects the building functions to View.js
let Packager = {
    packagedSpans: [],
    spanEvent: function(identity){
        console.log(identity);
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

                //Adds a span wrapper on the sentence
                Decoupler.spanFactorySentences(sentence.sentence, target);

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
        //Remove the sentences and replace with their pre-existing content
        Decoupler.decoupleSentenceSpans();
        //Gets the body from document
        let body = Document.body;
        //Assembles the chartograph in Packager.wrapper
        this.wrapper(body, target);
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
