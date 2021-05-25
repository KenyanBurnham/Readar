
//Edit global to be "global" object
let Words = {
    globalWords: [],
    words: [],
    wordCount: 0,
    wordLengths: [],
    syllables:[],
    breaths: [],
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
    processWords: function(sentence, caller){
        //remove all non-word characters
        sentence = sentence.replace(/[\W_]+/g," ");
        //turn sentences to non-capitalized
        sentence = sentence.toLowerCase();
        //Split words from sentence by spaces
        let words = sentence.split(" ");
        //Initialize a wordCount variable
        let wordCount = 0;

        //New object that represents all the word-related info for each sentence
        let Bank = new Object;
        Bank.lengths = [];
        Bank.count = 0;
        Bank.words = [];
        Bank.syllables = [];
        Bank.breaths = [];

        //For each of the words generated by the split
        words.forEach(function(word){
              //Run throrough test on word to determine what action needs to happen
              let testResults = Interpreter.testWord(word);
              //calculate word length
              let wordLength = word.length;

              //Begin Decision Tree
              //If there is a known interpretation for the word
              if((testResults.containsInterpretation == true)){
                  //Then the word is already known
                  //console.log("Contains Interpretation: " + word);
                  //Go ahead and get the interpretation
                  let interpretation = Interpreter.getInterpretation(word);
                  //And the syllable count for the interpretation
                  let syllablesForInterpretation = getSyllableCount(interpretation);
                  //Update the wordcount variable
                  wordCount = wordCount + 1;
                      //word.length stays the same
                      //Add the wordlength to the bank, put here in case there's a random space
                      Bank.lengths.push(wordLength);
                      //syllables is counted on Interpreter.abstract[word]
                      Bank.syllables.push(syllablesForInterpretation);
                      //get breath unit
                      Bank.breaths.push(Words.calculateBreathUnit(wordLength, syllablesForInterpretation));
                      //save abstract as word
                      Bank.words.push(interpretation);

              //If there is no KNOWN interpretation, is it a regular word
              // or a word with a known UNRESOLVED Interpretation?
              }else if((testResults.containsInterpretation == false) && (testResults.containsNumber != true)){
                  //Then there is no interpretation
                  if((testResults.containsUnresolved == true)){
                      //Is there a known unresolved word?
                      //CAVEAT: THIS WILL CREATE A DIP IN THE representation
                      // DEFAULT BEHAVIOR IS TO ASSIGN SYLLABLES TO 1
                      //console.log("Contains Known Unresolved: " + word);
                      wordCount = wordCount + 1;
                          //This creates a spike in the representation of the word
                          //Add the wordlength to the bank,
                          //wordlength stays the same
                          Bank.lengths.push(wordLength);
                          //set syllables to a default value
                          Bank.syllables.push(1);
                          // breath = length/1
                          //set breath unit to a default value
                          Bank.breaths.push(1);
                          //save the known unresolved as word
                          Bank.words.push(word);

                  //If it's not a KNOWN UNRESOLVED word,
                  //the it is an UNKNOWN UNRESOLVED word
                  //Adds to the unresolved object
                  }else if((testResults.containsUnresolved == false) && (testResults.containsNumber != true)){
                      //If there is no unresolved, add to unresolved
                      //console.log("Contains New Unresolved:" + word);
                      wordCount = wordCount + 1;
                          //This creates a spike in the representation of the word
                          //Add the wordlength to the bank,
                          //wordlength stays the same
                          Bank.lengths.push(wordLength);
                          //set syllables to a default value
                          Bank.syllables.push(1);
                          // breath = length/1
                          //set breath unit to a default value
                          Bank.breaths.push(1);
                          //save the known unresolved as word
                          Bank.words.push(word);

                          //Adds word to unresolved
                          Interpreter.addUnresolved(word);
                  }

              // If it has no known/unknown unresolved or interpretation
              // then word undergoes regular process
              } else{
                    //Filters any additional whitespaces that made it through
                    // if containsNumber is true then the word DOES NOT HAVE a number
                    if((wordLength > 0) && (testResults.containsNumber == true)){
                          //Increases the word count
                          wordCount = wordCount + 1;
                          //get a syllable count
                          let syllableCount = getSyllableCount(word);

                          //wordlength pushed into Bank
                          Bank.lengths.push(wordLength);
                          //set syllables to a default value
                          Bank.syllables.push(syllableCount);
                          // breath = length/1
                          //set breath unit to a default value
                          Bank.breaths.push(Words.calculateBreathUnit(wordLength, syllableCount));
                          //save the known unresolved as word
                          Bank.words.push(word);
                  }
              }

              //Push word into Document word bank
              // Doesn't add the words if it is a fragment function that calls this function
              //No need to repeat
              if(caller == "sentence"){
                    //Push words to Document word bank
                    Document.words.push(word);
                    //Push reference key to word
                    Document.wordKeys.push(createKey());
              }
        });

        //Add the number of words to the Bank
        Bank.count = wordCount;
        //This adds all of the breaths to a central repository
        // Used for calculating the global breaths
        for (var k = 0; k < Bank.breaths.length; k++) {
            Document.breaths.push(Bank.breaths[k]);
        }
        //Push copy of word bank into global word bank
        this.wordCount = wordCount;
        //Return local to Sentences
        return Bank;
    },
};
