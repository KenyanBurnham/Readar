/*
  Interpreter handles the internal representation of words and symbols
  "Image": The word or set of characters to be internally represented
  "Abstract": The internal representation of a word or set of characters
*/
let Interpreter = {
    image: ["1950s", "1945", "1948", "1950", "423", "10", "48", "60", "60th", "2008", "360", "1979", "2004", "2006", "300", "08", "5000", "1000", "2010", "2011", "1960s", "1980s", "9:00 PM"],
    abstract: ["nineteen fifties", "nineteen forty five", "nineteen forty eight", "nineteen fifty", "four hundred twenty three", "ten", "fourty eight", "sixty", "sixtieth", "two thousand eight", "three hundred sixty", "nineteen seventy nine", "two thousand four", "two thousand six", "three hundred", "eight", "five thousand", "one thousand", "twenty ten", "twenty eleven", "nineteen sixties", "nineteen eighties", "nine oclock pe em"],
    spanIdentities: [],
    unresolved: [],
    getImages: function(){
        return this.image;
    },
    getAbstracts: function(){
        return this.abstract;
    },
    addInterpretation: function(image, abstract){
        // This method appends and image abstraction pair to
        //Interpreter's internal storage
        this.image.push(image);
        this.abstract.push(abstract);
    },
    addUnresolved: function(image){
        // This method appends an unresolved word to the unresolved array
        this.unresolved.push(image);
    },
    addUnresolvedSpanKey: function(key){
        //This method pushes span keys to the spanIdentities array
        this.spanIdentities.push(key);
    },
    removeInterpretation: function(image){
        //This method removes an image/abstract pair
        // from Interpretations internal storage
        let imageIndex = this.image.indexOf(image);
        if(imageIndex != -1){
            //Then the image/abstraction pair does exist
            //and needs to be removed
            this.image.splice(imageIndex, 1);
            this.abstract.splice(imageIndex, 1);
        }
        //If the image/abstraction pair doesn't exist, then we don't care
    },
    removeUnresolved: function(resolved){
        //This method removes an unresolved/spanIdentity pair
        // from Interpretations internal storage
        let unresolvedIndex = this.unresolved.indexOf(resolved);
        if(unresolvedIndex != -1){
            //Then the unresolved/spanIdentities pair does exist
            //and needs to be removed
            this.unresolved.splice(unresolvedIndex, 1);
            this.spanIdentities.splice(unresolvedIndex, 1);
        }
    },
    testForNumber: function (word){
        //Looks for numbers
        let areNumbers = word.match(/\d+/g);
        //Looks for numbers attached/inside to words
        let areNumbersAttached = word.match(/\d+\B/g);
        //Any symbol you can find on a standard keyboard
        let areStandardKeyboardSymbols = word.match(/(?:[\d\#\%\&\^\@\!\-\_\=\+\+\(\)\[\]\`\~\;\:\,\.\<\>\/\\\|\'\"\{\}\*\$\^\?\\])/g);
        //If any of these are true then they will return a value other than null
        if((areNumbers != null) || (areNumbersAttached != null) || (areStandardKeyboardSymbols != null)){
            return false;
        }else{
            return true;
        }
    },
    testForInterpretation: function(image){
        //Returns true if interpretation exists
        //Returns false if interpretation does not exist
        return this.image.includes(image);
    },
    testForUnresolved: function(word){
        //Returns true if an unresolved word exists
        //Returns false if an unresolved word does not exist
        return this.unresolved.includes(word);
    },
    testWord: function(word){
        //Returns results from word tests to see if it's a number
        //or a word that can be processed
        let TestResults = {
            containsNumber: this.testForNumber(word),
            containsInterpretation: this.testForInterpretation(word),
            containsUnresolved: this.testForUnresolved(word),
        };
        return TestResults;
    },
    getInterpretation: function(image){
        if(this.testForInterpretation(image) == true){
            //The index of the image should be the same as the abstraction
            let indexOfImage = this.image.indexOf(image);
            //Returns the abstraction of an image that is already defined
            return this.abstract[indexOfImage];
        }else{
           return -1;
        }
    },
    getUnresolvedFromIdentity: function(identity){
        //get index of name and use it to get the word itself
        let locationOfUnresolved = this.spanIdentities.indexOf(identity);
        return this.unresolved[locationOfUnresolved];
    },
    getIdentityFromUnresolved: function(unresolved){
        //use unresolved word to get idenity
        let identityPosition = this.unresolved.indexOf(unresolved);
        //return idenity
        return this.spanIdentities[identityPosition];
    },
    getUnresolved: function(){
        //looking for the right place to update this
        View.updateNexiconBadge(this.unresolved.length);
        return this.unresolved;
    },
    resolveSpans: function(target){
        //get all of the spans in the target
        let spans = document.getElementById(target).getElementsByTagName("SPAN");
        //For each of the spans
        for (let i = 0; i < spans.length; i++) {
            let span = spans[i];
            //search in Interpretation
            let interpretation = this.testForInterpretation(span.innerText);
            //If there is a real interpretation
            //replace the span with the innerText
            if(interpretation != false){
                //If this span contains an already resolved interpretation
                //Then remove the span 'processor' knows how to handle the word
                Decoupler.remount(target, span, span.innerText);
                //this.removeUnresolved(span.innerText);
            }else{
                //If this span contains unresolved words,
                //then save the word in unresolved
                this.unresolved.push(span.innerText);
                //and remove the span
            }
        }
    },
    getAbstractFromNexicon: function(){
        abstract = document.getElementById("nexiconInput").value;
        unresolved = document.getElementById("nexiconAddition").innerText;
        //get the unresolved spanIdentity
        let target = this.getIdentityFromUnresolved(unresolved);
        //Fetch the unresolved and remove it,
        this.removeUnresolved(unresolved);
        //Then add to the images and abstractions
        this.addInterpretation(unresolved, abstract);
        //Debugger.debriefInterpreter();
        // reset the nexicon modal
        View.resetNexicon();
        //remove the span
        Decoupler.remove(target, unresolved);
        //set the nexicon update button to disabled
        View.disableNexiconInputButton();
        //need to go back to the nexiconStateDisplay view
        View.toggleNexiconTab("addTab");
    },
}
