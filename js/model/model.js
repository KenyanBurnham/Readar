/**|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

        NAME: model.js
        DESCRIPTION: Contains methods for to the 'body' object and it's sub-objects

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
    let arrayOfBreathsPerWord = [];
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
        // Build breath unit per word array
        arrayOfBreathsPerWord.push(arrayOfSyllables[i]/arrayOfWordLengths[i]).toFixed(2);
    }
    let sentence = new Sentence(
        createSentenceKey(),
        source,
        arrayOfWords,
        arrayOfSyllables,
        arrayOfSyllables.reduce(getSum),
        arrayOfWordsFromSource.length,
        arrayOfWordLengths,
        ((arrayOfSyllables.reduce(getSum))/(arrayOfWordsFromSource.length)).toFixed(2),
        arrayOfBreathsPerWord
    );
    return sentence;
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
        console.log(Body.sentences[i].breathPerWord);
    }
    return Body;
}
