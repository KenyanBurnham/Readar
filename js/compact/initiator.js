
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

// TODO: Fix the nexicon functionality, isolate it to its own js
// Fix the Modal
// have the changed word be reflected in the lexicon
/*
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/
