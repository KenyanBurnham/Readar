
//Packer tracks and adds spans to the DOM, does not deal with the final output
let Packager = {
    packagedSpans: [],
    spanEvent: function(identity){
        // get the element
        let span = document.getElementById(identity);
        let sentence = span.innerText;
        let percentile = span.getAttribute("data-percentile");
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
          //I suspect our problem is here
                this.packagedSpans.push(spanIdentity);
                //give the sentence an identity that can be refered to
                //based on the span it belongs to
                paragraph.sentences[j].spanIdentity = spanIdentity;
                try {
                    let test = document.getElementById(spanIdentity);
                    if (test == null) {
                        //this means that the span-wrapped sentence never made
                        //it to the DOM
                        let message = "In Packer.wrapper(); it was noted that the span with identity: " + spanIdentity + " was never remounted to the DOM.";
                        Debugger.submitErrorReport(message);
                    }
                } catch (e) {
                    console.log("Test for element on the dom failed: " + e);
                }
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
        //now it is
        //located in Decoupler.spanfactorysentences
    },
};
