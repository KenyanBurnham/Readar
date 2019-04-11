/**============================================================================
      filters sentence for processing

      Originator: Simon Breiter
      Source: https://codepen.io/simonbreiter/pen/gRpRJj
=============================================================================**/
function createSentenceKey(){
      // Random number from 0 to length
      const randomNumber = (length) => {
          return Math.floor(Math.random() * length)
      }
      // Generate Pseudo Random String
      const generateID = (length) => {
          const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let text = "";
          for (let i = 0; i < length; i++) {
              text += possible.charAt(randomNumber(possible.length));
          }
          return text;
      }
      return generateID(10);
}

/**============================================================================
      filters sentence for processing
=============================================================================**/
function filterMutableSource(a){
    a = a.toString();
    a = a.replace(/(\r\n|\n|\r)/gm,"");
    a = a.trim();
    return a;
}

/** ============================================================================
        method used with .reduce() to get a sum of all numbers
=============================================================================**/
function getSum(total, num) {
    return total + num;
}

/** ============================================================================
        Filters words into lowercase for Sentence object
=============================================================================**/
function filterToLowerCase(a){
    a = a.toLowerCase();
    return a;
}

/** ============================================================================
        Removes whitespace from words
=============================================================================**/
function removeWhiteSpace(a){
    a = a.replace(/[\W_]+/g," ");
    return a;
}

/** ============================================================================
        Gets syllable count using regular expression
=============================================================================**/
function filterWithRegEx(a){
    a = a.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    // Removes capital Y's
    a = a.replace(/^y/, '');
    //Produces a length that accounts for dipthongs
    a = a.match(/[aeiouy]{1,2}/g).length;
    return a;
}

/** ============================================================================
        Gets count of syllables by calling filterWithReqEx
=============================================================================**/
function getSyllableCount(a){
    if (a.length <= 3) {
        // If the word is less or equal to three,
        // then it assumes it is only one syllable long
        return 1;
    }else if(a.length == 0){
        // If the word isn't a word, returns zero
        return 0;
    }else {
        // For any word that is more than three characters
        // Get a count using filterWithExpression
        a = filterWithRegEx(a);
        return a;
    }
}

/** ============================================================================
        Provides method for getting a word length
=============================================================================**/
function getWordLength(a){
    a = a.length;
    return a;
}

/** ============================================================================
        Filters word into lowercase and removes whitespace
=============================================================================**/
function filterWordAdditional(a){
    a = filterToLowerCase(a);
    a = removeWhiteSpace(a);
    a = a.trim();
    return a;
}

/** ============================================================================
        Takes in split sentence and splits words
        Gets syllable count, builds word array, and array of word lengths
        Creates Sentence object, returns sentence
=============================================================================**/
function processSentence(source){
    let arrayOfWords = [];
    let arrayOfSyllables = [];
    let arrayOfWordLengths = [];
    let arrayOfWordsFromSource = source.split(" ");
    for (let i = 0; i < arrayOfWordsFromSource.length; i++) {
        //Filter Input
        let filteredWord = filterWordAdditional(arrayOfWordsFromSource[i]);
        //Build word array
        arrayOfWords[i] = filteredWord;
        //Build Syllable Array
        arrayOfSyllables[i] = getSyllableCount(filteredWord);
        //Build word length array
        arrayOfWordLengths[i] = getWordLength(filteredWord);
    }
    /**
        identity:        Random sentence key to identify the unique sentence
        source:         Original sentence
        words:          Array of all the words that were in the sentence
        syllables:      Array of syllable counts for each word
        sumSyllables:   The total number of syllables in the sentence
        sumWords:       The total number of words in the sentence
        sizes:          Array of word lengths in sentence
        breath:         breath unit of the sentence
    **/
    let Sentence = {
        identity: createSentenceKey(),
        source: source,
        words: arrayOfWords,
        syllables: arrayOfSyllables,
        sumSyllables: arrayOfSyllables.reduce(getSum),
        sumWords: arrayOfWordsFromSource.length,
        sizes: arrayOfWordLengths,
        breath: ((arrayOfSyllables.reduce(getSum))/(arrayOfWordsFromSource.length)).toFixed(2),
    };
    return Sentence;
}
