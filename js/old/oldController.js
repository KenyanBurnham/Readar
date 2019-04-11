/**=============================================================================
          Separates data for dom elements and passes data to dom factories
=============================================================================**/
function domManipulation(body){
      // Generate senetence statistics elements
      for (let i = 0; i < body.sentences; i++) {
          /**  ------- buildSentenceCharacteristicsTable ------
              for each sentence
              get value of breath, sumWords, sumSyllables
              get copy of sentence for display
              get unique name for ID
          **/
          buildSentenceCharacteristicsTable(
                body.sentences[i].source,
                body.sentences[i].identity,
                body.sentences[i].sumWords,
                body.sentences[i].sumSyllables,
                i
          );

          // Separated so table will already be generated

          /** ------build Gradient----------
              for each sentence
              get unique id
              get body max of words, syllables, and breaths
          **/
          buildGradient(
                body.sentences[i].identity,
                body.sentences[i].sumWords.value,
                body.sentences[i].sumSyllables,
                body.sentences[i].breath,
                body.bodyStatistics.wordMax,
                body.bodyStatistics.syllableMax,
                body.bodyStatistics.breathMax,
          );
      }

      // Generate body Statistics elements
      buildBodyStatisticsTable(body.bodyStatistics);

      /** ------- getDataReady ------
          for the body
          get the max of words, syllables, and breaths
      **/
      //getDataReady(body, wordMax, syllableMax, breathMax);
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

/**=============================================================================
          Splits body source into sentences by periods + "SPACE" pairs.
=============================================================================**/
function segment(bodySource){
    //Breaks body into sentences by period SPACE pairs
    let splitSource = bodySource.split(". ");
    //creates the body object and gets sentence information
    let body = package(splitSource);
    return body;
}

/**=============================================================================
          Begins the data processing step
          This file handles the data to DOM management
=============================================================================**/
function startCount(){
    //Grab paragraph from DOM
    let bodyData = grabStringFromDOM("inputPlace");
    //Segment paragraph
    let bodyObject = segment(bodyData.toString());
    bodyObject.bodyStatistics = bodyStatistics(bodyObject);
    console.log(bodyObject.bodyStatistics);
    domManipulation(bodyObject);

    //switches desktop index content and results content visibility
    //desktopDomResults();
}
