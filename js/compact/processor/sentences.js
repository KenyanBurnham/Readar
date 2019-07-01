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
        //return array of fragments
        return mutableSentence.split("$*");
    },
    splitPunctuation: function(paragraph){
        //Remove some simple cases of punctuation
        paragraph = paragraph.replace("!", ".");
        paragraph = paragraph.replace("?", ".");
        paragraph = paragraph.replace("...", ".");
        //Remove apostrophes (’) and replace with nothing to preserve words
        paragraph = paragraph.replace(/’/g,"");
        //Split paragraph by "SPACE + ." pairs
        //return sentences without punctuations or apostrophes
        return paragraph.split(". ");;
    },
    process: function(paragraph){
        //Reset global sentence storage
        Sentences.reset();
        //Initialize empty variable to store sentences in each pararaph
        let paragraphSentences = [];
        //remove common punctuation and split sentence by ". " pairs
        let sentences = Sentences.splitPunctuation(paragraph);
        //For each sentence, remove any edge cases and push to larger object
        sentences.forEach(function(sentence){
            //Make random spaces filter out
            if(sentence.length > 0){
                //Increment the sentenceCount variable
                Sentences.sentenceCount = Sentences.sentenceCount + 1;
                //create Sentence Object to save in sentences array of Sentences Object
                let Sentence = new Object;
                //Add an empty string of sentence to Sentence Object
                Sentence.sentence = "";
                //Push current sentence into into sentence object
                Sentence.sentence = sentence;
                //get word data for sentence
                Sentence.words = Words.processWords(sentence, "sentence");
                //Add an empty array for fragments
                Sentence.fragments = [];
                //Initialize the fragment count at 0
                Sentence.fragmentCount = 0;
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
}
