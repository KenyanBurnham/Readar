View = {
  toggleNexiconDisplay: function(state){
      // get element
      let alertBody = document.getElementById('nexiconStateDisplay');
      let inputBody = document.getElementById('nexiconInputDisplay');
      let nexiconButton = document.getElementById("nexiconUpdateButton");

      if(state == true){
          alertBody.innerHTML = '';
          inputBody.style.visibility = "visible";
          nexiconButton.style.visibility = "visible";

      }
      if(state == false){
          //reset the div before adding the alert
          alertBody.innerHTML = '';
          let alert = '<div id="nexiconAlertDisplay" class="alert alert-secondary" role="alert">No words need to be interpreted at this moment.</div>';
          alertBody.innerHTML = alert;
          inputBody.style.visibility = "hidden";
          nexiconButton.style.visibility = "hidden";
      }
  },
  updateNexiconBadge: function(unresolvedLength){
      //this function needs to be called every time the nuber of
      //unresolved is changed
      //needs to also be updated after the modal is closed
      let nexiconBadge = document.getElementById("nexiconBadge");
      //updates in the case that their are some
      if (unresolvedLength > 0) {
          //display the number of unresolved
          nexiconBadge.innerHTML = "";
          nexiconBadge.innerHTML = "" + unresolvedLength + "";
          nexiconBadge.style.visibility = "visible";
      }
      // updates in the case that there are none
      if (unresolvedLength == 0) {
          nexiconBadge.innerHTML = "";
          nexiconBadge.style.visibility = "hidden";
      }
  },
  resetNexicon: function(){
      //this removes the alert that says there isn't anything
      View.toggleNexiconDisplay(false);
      //reset the span that shows users the word
      document.getElementById('nexiconAddition').innerText = "Word";
      //reset the nexicon input
      document.getElementById('nexiconInput').value = "Type Here";
      //This updates the badge icon; only included in this function since this
      //is part of the cancel operation of the modal
      View.updateNexiconBadge(Interpreter.unresolved.length);
  },
  clearNexiconInput: function(){
      document.getElementById("nexiconInput").value = "";
  },
  toggleSentencePreview: function(selected){
      //controls the selection boxes
      let on = document.getElementById('sentencePreviewOn');
      let off = document.getElementById('sentencePreviewOff');
      if (selected == on.id) {
          if ((on.checked == true) && (off.checked == true)) {
              off.checked = false;
          }
      }
      if (selected == off.id) {
        if ((on.checked == true) && (off.checked == true)) {
            on.checked = false;
        }
      }
  },
  resolveVisuals: function(){

  },
};
