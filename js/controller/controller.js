/**=============================================================================
          Reloads page instead of managing input and button
=============================================================================**/
function switchBack(){
    location.reload();
}

/**=============================================================================
          Functionality needed to coordinate the modal, button,
          and input box to maintain the screen without reloading
=============================================================================**/
function disabledDomManagement(){
    let element = document.getElementById("inputPlace");
    let button = document.getElementById("submissionButton");
    if(element.value < 2){
        button.setAttribute("disabled", "disabled");
    }else{
        button.removeAttribute("disabled");
    }
}

/**=============================================================================
          Separates data for dom elements and passes data to dom factories
=============================================================================**/
function domManipulation(body){
      console.log(body.sentences);
      // Generate senetence statistics elements
      for (let i = 0; i < body.sentences.length; i++) {
          /**  ------- buildSentenceCharacteristicsTable ------
              for each sentence
              get value of breath, sumWords, sumSyllables
              get copy of sentence for display
              get unique name for ID
          **/
          buildSentenceCharacteristicsTable(
                body.sentences[i].source,
                body.sentences[i].breath,
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
                body.sentences[i].sumWords,
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
      getDataReady(body);
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
    domManipulation(bodyObject);
    //switches desktop index content and results content visibility
    desktopDomResults();
}

/**=============================================================================
          Begins the data processing step
          This file handles the data to DOM management
=============================================================================**/
function processBody(){

    //Grab paragraph from DOM
    let bodyData = grabStringFromDOM("bodyInput");

    //Segment paragraph
    let bodyObject = segment(bodyData.toString());
    bodyObject.bodyStatistics = bodyStatistics(bodyObject);
    domManipulation(bodyObject);
    //switches desktop index content and results content visibility
    desktopDomResults();
}



/**=============================================================================
          Listeners
=============================================================================**/
(function(){
      // Sets listener on desktop input
      // requires a certain number of characters before it will submit
      //document.getElementById("inputPlace").addEventListener("change", disabledDomManagement);
})();
