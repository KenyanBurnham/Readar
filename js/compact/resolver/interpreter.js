/*
  Interpreter handles the internal representation of words and symbols
  "Image": The word or set of characters to be internally represented
  "Abstract": The internal representation of a word or set of characters
*/
let Interpreter = {
    image: ["rev360"],
    abstract: ["rev three sixty"],
    spanIdentities: [],
    unresolved: [],
    addInterpretation: function(image, abstract){
        // This method appends and image abstraction pair to
        //Interpreter's internal storage
        Interpreter.image.push(image);
        Interpreter.abstract.push(abstract);
    },
    addUnresolved: function(image){
        // This method appends an unresolved word to the unresolved array
        Interpreter.unresolved.push(image);
    },
    addUnresolvedSpanKey: function(key){
        //This method pushes span keys to the spanIdentities array
        Interpreter.spanIdentities.push(key);
    },
    removeInterpretation: function(image){
        //This method removes an image/abstract pair
        // from Interpretations internal storage
        let imageIndex = Interpreter.image.indexOf(image);
        if(imageIndex != -1){
            //Then the image/abstraction pair does exist
            //and needs to be removed
            Interpreter.image.splice(imageIndex, 1);
            Interpreter.abstract.splice(imageIndex, 1);
        }
        //If the image/abstraction pair doesn't exist, then we don't care
    },
    removeUnresolved: function(resolved){
        //This method removes an unresolved/spanIdentity pair
        // from Interpretations internal storage
        let unresolvedIndex = Interpreter.unresolved.indexOf(resolved);
        if(unresolvedIndex != -1){
            //Then the unresolved/spanIdentities pair does exist
            //and needs to be removed
            Interpreter.unresolved.splice(unresolvedIndex, 1);
            Interpreter.spanIdentities.splice(unresolvedIndex, 1);
        }
    },
    testForNumber: function (word){
        let areNumbers = word.match(/\d+/g);
        if(areNumbers != null){
            return false;
        }else{
            return true;
        }
    },
    testForInterpretation: function(image){
        //Returns true if interpretation exists
        //Returns false if interpretation does not exist
        return Interpreter.image.includes(image);
    },
    testForUnresolved: function(word){
        //Returns true if an unresolved word exists
        //Returns false if an unresolved word does not exist
        return Interpreter.unresolved.includes(word);
    },
    testWord: function(word){
        //Returns results from word tests to see if it's a number
        //or a word that can be processed
        let TestResults = {
            containsNumber: Interpreter.testForNumber(word),
            containsInterpretation: Interpreter.testForInterpretation(word),
            containsUnresolved: Interpreter.testForUnresolved(word),
        };
        return TestResults;
    },
    getInterpretation: function(image){
        if(Interpreter.testForInterpretation(image) == true){
            //The index of the image should be the same as the abstraction
            let indexOfImage = Interpreter.image.indexOf(image);
            //Returns the abstraction of an image that is already defined
            return Interpreter.abstract[indexOfImage];
        }else{
           return -1;
        }
    },
    getUnresolved: function(){
        return this.unresolved;
    },
    resolveSpans: function(target){
        //get all of the spans in the target
        let spans = document.getElementById(target).getElementsByTagName("SPAN");
        //For each of the spans
        for (let i = 0; i < spans.length; i++) {
            let span = spans[i];
            //search in Interpretation
            let interpretation = Interpreter.testForInterpretation(span.innerText);
            //If there is a real interpretation
            //replace the span with the innerText
            if(interpretation != false){
                console.log("resolved span: " + span.innerText + "");
                //If this span contains an already resolved interpretation
                //Then remove the span 'processor' knows how to handle the word
                Decoupler.remount(target, span, span.innerText);
                //Interpreter.removeUnresolved(span.innerText);

            }else{
                console.log("unresolved span: " + span.innerText + "");
                //If this span contains unresolved words,
                //then save the word in unresolved
                Interpreter.unresolved.push(span.innerText);
                //and remove the span

            }
        }
    },
}
