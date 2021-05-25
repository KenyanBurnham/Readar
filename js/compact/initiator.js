
//Initiator Function calls the first instance of Readar
//Target specifies the DOM Object to target
function initiatorFunction(target){

//Stage 1: pre-process and removing errors
      //Clear previous spans
      Decoupler.removeAllSpans(target);

      //Get snapshot of document
      Document.updateDataState(target);

      //Grab source element and decouple text from DOM object.
      let decoupledSource = Decoupler.decouple(target);

      //Send to the processor object.
      Paragraphs.process(decoupledSource);

          //Return the output
          Debugger.debugBody();

      //Begin to package output
      Packager.package(target);

      //Recouple target
      Decoupler.recouple(target);

//Stage 2: outputting a visual

      //this assigns the color pattern to the paper
      if(Interpreter.unresolved.length == 0){
           Chartographer.initiate();
      }

      //debrief all errors
      Debugger.debriefErrors();
}
