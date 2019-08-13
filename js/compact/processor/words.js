let Words = {
    globalWords: [],
    words: [],
    wordCount: 0,
    wordLengths: [],
    syllables:[],
    breaths: [],
    local: {
        lengths: [],
        count: 0,
        words: [],
        syllables: 0,
        breaths: [],
    },
    reset: function(){
        // Set all global data to empty
        this.globalWords = [];
        this.words = [];
        this.wordCount = 0;
        this.wordLengths = [];
        this.syllables = [];
        this.breaths = [];
    },
    calculateBreathUnit: function(wordLength, syllableCount){
        //generalized method for breath units
        return (wordLength/syllableCount).toFixed(2);
    },
    updateLocalAndGlobal: function(length, words, syllables, breaths){
        //This generalizes adding global and local variables

        //Pushes local word length
        Words.local.lengths.push(length);
        //Pushes local words
        Words.local.words.push(words);
        //Increments total local syllables
        Words.local.syllables = Words.local.syllables + 1;
        //Pushes local breath units
        Words.local.breaths.push(breaths);

        //Add length to the global Words
        Words.wordLengths.push(length);
        //Add syllable counts to global Word Bank
        Words.syllables = Words.syllables + 1;
        //Add word to the global Words
        Words.globalWords.push(words);
        //Add breath unit to global Words
        Words.breaths.push(breaths);

        //Global word count is added at the end
    },
    resetLocal: function(){
        //Resets the local word metrics at every sentence
        Words.local.lengths = [];
        Words.local.count = 0;
        Words.local.words = [];
        Words.local.syllables = 0;
        Words.local.breaths = [];
    },
    processWords: function(sentence, caller){
        //remove all non-word characters
        sentence = sentence.replace(/[\W_]+/g," ");
        //Split words from sentence by spaces
        let words = sentence.split(" ");

        //Resets the local bank
        Words.resetLocal();
        //Initialize a wordCount variable
        let wordCount = 0;

        //For each of the words generated by the split
        words.forEach(function(word){
              //Run throrough test on word to determine what action needs to happen
              let testResults = Interpreter.testWord(word);
              //calculate word length
              let wordLength = word.length;

              //Begin Decision Tree
              if((testResults.containsInterpretation == true)){
                  //Then the word is already known
                  console.log("Contains Interpretation: " + word);
                  wordCount = wordCount + 1;
                      //word.length stays the same
                      //syllables is counted on Interpreter.abstract[word]
                      //get breath unit
                      //save abstract as word
                      //increase word count by one
                      //Update the local and global metrics for the word
                      let interpretation = Interpreter.getInterpretation(word);
                      let syllablesForInterpretation = getSyllableCount(interpretation);
                      Words.updateLocalAndGlobal(
                          wordLength,
                          interpretation,
                          syllablesForInterpretation,
                          Words.calculateBreathUnit(wordLength, syllablesForInterpretation)
                      );

              }else if((testResults.containsInterpretation == false) && (testResults.containsNumber != true)){
                  //Then there is no interpretation
                  if((testResults.containsUnresolved == true)){
                      //If there is no intepretation a known unresolved word?
                      console.log("Contains Known Unresolved: " + word);
                      wordCount = wordCount + 1;
                          //This creates a spike in the representation of the word
                          // length = same
                          // syllables = 1
                          // breath = length/1
                          Words.updateLocalAndGlobal(
                              wordLength,
                              word,
                              1,
                              Words.calculateBreathUnit(wordLength, 1)
                          );
                  }
                  if((testResults.containsUnresolved == false) && (testResults.containsNumber != true)){
                      //If there is no unresolved, add to unresolved
                      console.log("Contains New Unresolved:" + word);
                      wordCount = wordCount + 1;
                          //Add word to unresolved
                          // length = same
                          // syllables = 1
                          // breath = length over 1, causes a spike
                          Words.updateLocalAndGlobal(
                              wordLength,
                              word,
                              1,
                              Words.calculateBreathUnit(wordLength, 1)
                          );
                          //Adds word to unresolved
                          Interpreter.addUnresolved(word);

                  }

              // Word undergoes regular process
              } else{
                    //Filters any additional whitespaces that made it through
                    // if containsNumber is true then the word DOES NOT HAVE a number
                    if((wordLength > 0) && (testResults.containsNumber == true)){
                          //Increses the word count
                          wordCount = wordCount + 1;
                          let syllableCount = getSyllableCount(word);

                          //Update the local and global metrics for the word
                          Words.updateLocalAndGlobal(
                              wordLength,
                              word,
                              syllableCount,
                              Words.calculateBreathUnit(wordLength, syllableCount)
                          );
                  }
              }

              //Push word into Document word bank
              if(caller == "sentence"){
                    //Push words to Document word bank
                    Document.words.push(word);
                    //Push reference key to word
                    Document.wordKeys.push(createKey());
              }
        });
        //Add the number of words to the Bank
        Words.local.count = wordCount;
        //Bank.count = wordCount;
        //Push copy of word bank into global word bank
        Words.wordCount = wordCount;
        //Return Bank to Sentences
        return Words.local;
    },
}
