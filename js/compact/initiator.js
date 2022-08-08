
//Initiator Function calls the first instance of Readar
//Target specifies the DOM Object to target
function initiatorFunction(target){

//Stage 0:

/*
    When server functionality is added,
    1. preferences will be saved and will need to be set on load
    2. projects and current work will need to be set and saved
*/
      //Acts as a default for now, this sets things based on the current settings
      //View.resolveVisuals();

//Stage 1: pre-process and removing errors
      //hides elements and makes loading indicators visible
      View.initiateView();

      //this is a patch to help recursion, does remove whitespace
      //console.log(document.getElementById("inputTarget").innerText);
      //let newData = document.getElementById("inputTarget").innerText;
      //document.getElementById("inputTarget").innerHTML = newData;

      //Get snapshot of document
      Document.updateDataState(target);

      //Clear previous spans
      Decoupler.removeAllSpans(target);



      //Grab source element and decouple text from DOM object.
      let decoupledSource = Decoupler.decouple(target);

      //Send to the processor object.
      Paragraphs.process(decoupledSource);

          //Return the output TESTING ONLY
          Debugger.debugBody();

      //Begin to package output
      Packager.package(target);

      //Recouple target
      Decoupler.recouple(target);

//Stage 2: outputting a visual

      //this assigns the color pattern to the paper
      //this is the main visual feedback
      if(Nexicon.unresolved.length == 0){
           Chartographer.initiate();
      }

      //debrief all errors
      Debugger.debriefErrors();
      //Debugger.debugWordsAndSyllables();
      //Debugger.debriefChartographer();

      //hides loading elements and reveals displays
      View.completeView();

}
/**
  current issues
  some of the spans are never making it to the DOM, but on ly in a different test file
**/

// TODO: Make a config that allows customization
// TODO: Make a greyscale version for accesibility purposes
// TODO: make an option to highlight the top and bottom _% of sentences
// TODO: Consider making an ignore highlighting too that will exhempt selections from analysis
// TODO: figure out why the sentence below breaks Decoupler.spanFactorySentences()
  /* This sentence was resolved by removing the "!":
  "In response to increased close-source programming, Stallman created the GNU "GNU's Not Linux!".""*/

/**
The following are a list of changes that can readily be deployed:
• Add an animated loading icon to the top of the screen when an analysis is run.
• Keep the horizontal orientation of the density bar.
The following are a list of behaviors and mechanics that need further testing and expanded user involvement:
• Concurrent analysis triggered by a character, word, or sentence change.
• Interaction of sentence to density bar.
o Identify a preference for hovering versus clicking among target group for this kind of behavior.
• How Readar will scale highlighting and distribution with larger documents.
• Behavior of density bar as it highlights sentences.
• Behavior of sentence highlighting, generally.
• Behavior of sentence highlighting when clicked for editing purposes.

**/
