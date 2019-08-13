
//Initiator Function calls the first instance of Readar
//Target specifies the DOM Object to target
function initiatorFunction(target){

      //Get snapshot of document
      Document.updateDataState(target);

      //Grab source element and decouple text from DOM object.
      let decoupledSource = Decoupler.decouple(target);

      //Send to the processor object.
      Paragraphs.process(decoupledSource);

      //Begin to package output
      //Packager.package();

      //Recouple target
      Decoupler.recouple(target);

      //Return the output
      Debugger.debugBody();
      Debugger.debriefInterpreter();

}
