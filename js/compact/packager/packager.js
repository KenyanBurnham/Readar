
//Packer create the output model
//then redirects the building functions to View.js
let Packager = {
    wrapper: function(body){
        //This separates the paragraphs
        for (var i = 0; i < body.length; i++) {
            //console.log("paragraph:" + i);
            let bodySpan = document.createElement("span");
            //grab the specific paragraph
            let paragraph = body[i];
            //For each sentence in the paragraph create a span that is a a certain color
            for (var j = 0; j < paragraph.sentences.length; j++) {
                //console.log("sentence: " + j);
                //Get individual sentence
                let sentence = paragraph.sentences[j];
                //console each sentence text
                //console.log("sentence: " + sentence.sentence);
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
    package: function(){
        //Gets the body from document
        let body = Document.body;
        //Assembles the chartograph in Packager.wrapper
        let chartograph = Packager.wrapper(body);
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
