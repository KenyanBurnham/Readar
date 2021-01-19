
//Initiator Function calls the first instance of Readar
//Target specifies the DOM Object to target
function initiatorFunction(target){

      //Get snapshot of document
      Document.updateDataState(target);

      //Grab source element and decouple text from DOM object.
      let decoupledSource = Decoupler.decouple(target);

      //Send to the processor object.
      Paragraphs.process(decoupledSource);

      //Return the output
      Debugger.debugBody();
      Debugger.debriefInterpreter();

      //Begin to package output
      Packager.package();

      //Recouple target
      Decoupler.recouple(target);

}

//Sets a display message for the console
function log() {
    setTimeout(console.log.bind(console, "%c Hello, I see you're interested in my code. If you would like to contact the developer feel free to contact me at: kenyan@kenyanburnham.com %c", "background: #007bff;color:#FFF;padding:5px;border-radius: 5px;line-height: 26px;", ""));
}
log();
