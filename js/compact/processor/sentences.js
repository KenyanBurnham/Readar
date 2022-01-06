let Sentences = {
    sentences: [],
    sentenceCount: 0,
    fragmentCount: 0,
    reset: function(){
        // Set all global data to empty
        this.sentences = [];
        this.sentenceCount = 0;
        this.fragmentCount = 0;
    },
    splitFragments: function(sentence){
        //Create a copy of sentence to filter common punctuation for fragments
        let mutableSentence = sentence;
        //replace commas with tag
        mutableSentence = mutableSentence.replace(/\,/g, "$*");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\(/g, "$*");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\)/g, "$*");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\[/g, "$*");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\]/g, "$*");
        //replace colon with tag
        mutableSentence = mutableSentence.replace(/\:/g, "$*");
        //replace semicolon with tag
        mutableSentence = mutableSentence.replace(/\;/g, "$*");
        //I originally replaced alll apostrophes with tag
        //but that doesn't make sense for this function
        //mutableSentence = mutableSentence.replace(/.*["'].*/, "$*");
        //return array of fragments
        return mutableSentence.split("$*");
    },
    splitPunctuation: function(paragraph){
    // TODO: need to fix tha punctuation bug
    //sentences with the "?" punctuation are replaced with "." and that leads
    //to a decoupling problem later on
        let Paragraph = {
            sentences: [],
            punctuations: [],
        };
        //this function splits several know punctuation endings using a long regexp
        paragraph = paragraph.split(/(\.+\')|(\?+\')|(\!+\')|(\u2026+\')|(\.+\")|(\?+\")|(\!+\")|(\u2026+\")|(\.+\s)|(\?+\s)|(\!+\s)|(\u2026+\s)|(\:+\s)/);
      /**
          This explains the breakdown of the regexp below
          /(\.+\')|(\?+\')|(\!+\')|(\u2026+\')|(\.+\")|(\?+\")|(\!+\")|(\u2026+\")|(\.+\s)|(\?+\s)|(\!+\s)|(\u2026+\s)|(\:+\s)/

          this regular expression is broken down in the following way
          (\.+\")| = "a period followed by a double quote OR"
          (\.+\')| = "a period followed by a single quote OR"
          (\u2026+\')|  = "ellipsis followed by a single quote OR"
          (\.+\s)| = "a period followed by whitespace"
        **/
        let sentences = [];
        let punctuations = [];
        //separate the results that are undefined, sentences, or puntuations
        for (var i = 0; i < paragraph.length; i++) {
            //then it is an undefined artifect from the splitting process
            if (paragraph[i] == undefined) {
                //do nothing
            }
            //then it is a punctuation mark by itself
            else if (paragraph[i].length == 2) {
                //add the punctuation to the punctuation array
                Paragraph.punctuations.push(paragraph[i]);
            }
            //then it must be a sentence that may or may not
            //have a lingering punctuation mark
            else if (paragraph[i].length > 2) {
                let sentence = paragraph[i];
                // special case for ellipsis, since it uses three char spaces
                if (sentence.endsWith("...")) {
                    //this is the sentence which we split for that last punctuation mark
                    let splitSentence = sentence.split("");
                    //remove the last three characters
                    splitSentence.splice((splitSentence.length - 3), 3);
                    // then put the string back together using join()
                    let finalSentence = splitSentence.join("");
                    //push the punctuation free sentence to the sentence array
                    Paragraph.sentences.push(finalSentence);
                    //push the punctuation mark to the punctuation array
                    Paragraph.punctuations.push("...");
                }
                //this detects if there is a lingering punctuation mark (which happens sometimes)
                //then it removes the punctuation mark and adds the sentence
                //and punctuation to their respective arrays
                else if ((sentence.endsWith(".")) || (sentence.endsWith("!")) || (sentence.endsWith("?")) || (sentence.endsWith(":"))){
                    //this is the sentence which we split for that last punctuation mark
                    let splitSentence = sentence.split("");
                    //remove the last character, which we know is a punctuation mark
                    let lonePunctuation = splitSentence.pop();
                    // then put the string back together using join()
                    let finalSentence = splitSentence.join("");
                    //push the punctuation free sentence to the sentence array
                    Paragraph.sentences.push(finalSentence);
                    //push the punctuation mark to the punctuation array
                    Paragraph.punctuations.push(lonePunctuation);
                }
                //we assume that the sentence is punctuation-less and can be added
                else {
                    Paragraph.sentences.push(paragraph[i]);
                }
            }
        }
        return Paragraph;
    },
    process: function(paragraph){
        //Reset global sentence storage
        this.reset();
        //Initialize empty variable to store sentences in each pararaph
        let paragraphSentences = [];
        //remove common punctuation and split sentence by ". " pairs
        let sentences = this.splitPunctuation(paragraph);
        /**
          The sentences object above has two attributes:
            sentences: an array of sentences with punctuation removed
            punctuations: an array of the punctuations that belong to the sentences

            A future goal will be to use the punctuations that belong to the
            sentences to negate the span-decoupling issues that are constantly happening
        **/
        //For each sentence, remove any edge cases and push to larger object
        sentences.sentences.forEach(function(sentence, i){
            console.log(i);
            //Make random spaces filter out
            if((sentence != undefined) || (sentence.length > 0)){
                //Increment the sentenceCount variable
                this.sentenceCount = this.sentenceCount + 1;
                //create Sentence Object to save in sentences array of Sentences Object
                let Sentence = new Object;
                //Add an empty string of sentence to Sentence Object
                Sentence.sentence = "";
                //Add an attribute that will contain punctuation that belongs
                //to each sentence
                Sentence.punctuation = sentences.punctuations[i];
                //Push current sentence into into sentence object
                sentence = sentence.trim();
                //removes excess whitespace to ensure there isn't any sort of error
                Sentence.sentence = sentence;
                //get word data for sentence
                Sentence.words = Words.processWords(sentence, "sentence");
                //Add an empty array for fragments
                Sentence.fragments = [];
                //Initialize the fragment count at 0
                Sentence.fragmentCount = 0;
                //create a space where the sentence spanIdentity can be placed
                Sentence.spanIdentity = "";
                //Create a variable from sentence split by in-sentence punctuation
                let fragments = Sentences.splitFragments(sentence);
                //Filter out the empty fragments casused by splitting
                fragments.forEach(function(fragment){
                    if(fragment.length > 0){
                        //Increase the count of total fragments
                        Sentence.fragmentCount = Sentence.fragmentCount + 1;
                        //save the "Word" object to a variable
                        let fragmentWordObject = Words.processWords(fragment, "fragment");
                        //Add original fragment to the Word object
                        fragmentWordObject.original = fragment;
                        //Set fragments to Sentence Object
                        Sentence.fragments.push(fragmentWordObject);
                    }
                });
                //Save a copy to the sentences object
                Sentences.sentences.push(Sentence);
                //Save a copy to return to paragraph
                paragraphSentences.push(Sentence);
            }
        });
        return paragraphSentences;
    },
};
