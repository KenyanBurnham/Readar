

// Finds non-word characters
// Returns an object with location, character, action code
function findNonWordCharacters(bodySource){

}

function Body(bodySource){
        // Save a copy of the original
        this.bodySource = bodySource;
        this.nonWordIndex = findNonWordCharacters(bodySource);
}

//Start button
function processBody(){
          //get string input, toString added for assurance
      let bodySource = document.getElementByID("bodyInput").value.toString();
          // create new body instance
      let body = new Body(bodySource);
          //find non-word characters
      //let nonWordIndex = findNonWordCharacters(bodySource);
          // save nonWordIndex to body
      // body.nonWordIndex = nonWordIndex;
          // Ask if it is a break, parenthsis, commas, periods
      // let mapOfStringElements = segmentBodyIntoElements(bodySource, nonWordIndex);
          // Save Elements where they belong
      // body.headers = mapOfStringElements.headers;
          // Include method that gets header info
      // body.paragraphs = mapOfStringElements.paragraphs;
          //Include method that gets paragraph info
          // Include Method within paragraph that gets Sentence info
          // Include method within Sentence to get word info
}
