/**|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        NAME: model.js
        DESCRIPTION: Contains methods for to the 'body' object and it's sub-objects

        ------------------------------------------------------------------------
        "Body" Object Properties
        ------------------------------------------------------------------------
            sentences:      Array of split sentence strings
        ------------------------------------------------------------------------

        ------------------------------------------------------------------------
        "Sentence" Object Properties
        ------------------------------------------------------------------------
            identity:       Random sentence key to identify the unique sentence
            source:         Original sentence
            words:          Array of all the words that were in the sentence
            syllables:      Array of syllable counts for each word
            sumSyllables:   The total number of syllables in the sentence
            sumWords:       The total number of words in the sentence
            sizes:          Array of word lengths in sentence
            breath:         breath unit of the sentence
        ------------------------------------------------------------------------

        ------------------------------------------------------------------------
        "BodyStatistics" Object
        ------------------------------------------------------------------------
        sentences:          number of sentences in body

        wordMax:            maximum value of words in body
        syllableMax:        maximum value of syllables in body
        breathMax:          maximum value of breath units in body

        wordMin:            minimum value of words in body
                            (ASSUMPTION) minimum value should be one in most cases
        syllableMin:        minimum value of syllables in body
                            (ASSUMPTION) minimum value should be one in most cases
        breathMax:          minimum value of breath units in body

        wordAverage:        average number of words in body
        syllableAverage:    average number of syllables in body
        breathAverage:      average of breath units in body

        wordMedian:         median number of words in body
        syllableMedian:     median number of sylables in body
        breathMedian:       median value of breath units in body

        wordDeviation:      standard deviation of the words in the body
        syllableDeviation:  standard deviation of the syllables in the body
        breathDeviation:    standard deviation of the breath units in the body
        ------------------------------------------------------------------------

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||**/


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

/**==============================================================================
      Gets body statistics and adds BodyStatistics object to body object
=============================================================================**/
function bodyStatistics(body){
    // All wordSums in the body
    let bodyWordsSum = [];
    // All syllableSums in the body
    let bodySyllablesSum = [];
    //All breath units in the body
    let bodyBreathsSum = [];
    //Copy of sentence objects
    let sentences = body.sentences;

    for (let i = 0; i < sentences.length; i++) {
        //gather all wordSum counts
        bodyWordsSum[i] = sentences[i].sumWords;
        //gather all syllableSum counts
        bodySyllablesSum[i] = sentences[i].sumSyllables;
        //gather all breath counts
        bodyBreathsSum[i] = sentences[i].breath;
    }

    let BodyStatistics = {
          original:          sentences.length,

          wordMax:            getMaximum(bodyWordsSum),
          syllableMax:        getMaximum(bodySyllablesSum),
          breathMax:          getMaximum(bodyBreathsSum),

          wordMin:            getMinimum(bodyWordsSum),
          syllableMin:        getMinimum(bodySyllablesSum),
          breathMin:          getMinimum(bodyBreathsSum),

          wordAverage:        getAverage(bodyWordsSum),
          syllableAverage:    getAverage(bodySyllablesSum),
          breathAverage:      getAverage(bodyBreathsSum),

          wordMedian:         getMedian(bodyWordsSum),
          syllableMedian:     getMedian(bodySyllablesSum),
          breathMedian:       getMedian(bodyBreathsSum),

          wordDeviation:      getStandardDeviation(bodyWordsSum),
          syllableDeviation:  getStandardDeviation(bodySyllablesSum),
          breathDeviation:    getStandardDeviation(bodyBreathsSum),
    }
    return BodyStatistics;
}

/**=============================================================================
          Creates body object
=============================================================================**/
function package(sentenceSource){
    // Create body object, initailize with empty sentence array
    let Body = {
        sentences: [],
    };
    for (let i = 0; i < sentenceSource.length; i++) {
        //mutableSource is a temporary storage variable that will be altered
        let mutableSource = sentenceSource[i];
        //mutableCopy is a copy of the original sentences that will not be altered
        let mutableCopy = mutableSource;
        // Filters copy of text for processing
        mutableSource = filterMutableSource(mutableSource);
        //Gets word count, syllables, and all the words in the sentence
        let sentence = processSentence(mutableSource);
        //Adds sentence to Body ojbject
        Body.sentences[i] = sentence;
    }
    return Body;
}
