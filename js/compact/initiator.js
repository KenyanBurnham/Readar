
//Initiator Function calls the first instance of Readar
//Target specifies the DOM Object to target
function initiatorFunction(target){

      //Clear previous spans
      Decoupler.removeAllSpans(target);

      //Get snapshot of document
      Document.updateDataState(target);

      //Grab source element and decouple text from DOM object.
      let decoupledSource = Decoupler.decouple(target);

      //Send to the processor object.
      Paragraphs.process(decoupledSource);

      //Calculate the global breath
      getGlobalBreath();

          //Return the output
          Debugger.debugBody();

      //Begin to package output
      Packager.package(target);

      Chartographer.initiate();

      //Recouple target
      Decoupler.recouple(target);

        //Debug the spanFactoryInterpretations
        //Debugger.debriefInterpreter();
        //console.log(Packager.packagedSpans);
}
