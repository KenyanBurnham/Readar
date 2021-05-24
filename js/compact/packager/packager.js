
//Packer create the output model
//then redirects the building functions to View.js
let Packager = {
    packagedSpans: [],
    spanEvent: function(identity){
        //parrots the id
        console.log(identity);
        // get the element
        let span = document.getElementById(identity);
        let sentence = span.innerText;
        //send the sentence to the sentence preview
        // disabled for now
        // TODO: Descide if this needs to be a feature
        //View.updatePreview(sentence);
    },
    wrapper: function(body, target){
        //This separates the paragraphs
        for (var i = 0; i < body.length; i++) {
            //console.log("paragraph:" + i);
            // TODO: Make a body wrapper
            //let bodySpan = document.createElement("span");
            //grab the specific paragraphs
            let paragraph = body[i];
            //For each sentence in the paragraph create a span that is a a certain color
            for (var j = 0; j < paragraph.sentences.length; j++) {
                //Get individual sentence
                let sentence = paragraph.sentences[j];
                //Adds a span wrapper on the sentence
                let spanIdentity = Decoupler.spanFactorySentences(sentence.sentence, target);
                //give the sentence an idenity that can be refered to
                //based on the span it belongs to
                paragraph.sentences[j].spanIdentity = spanIdentity;
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
        // originally envisioned mounting function going here
        //located in Decoupler.spanfactorysentences

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
};
