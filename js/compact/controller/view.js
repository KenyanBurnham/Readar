View = {
  toggleNexiconDisplay: function(state){
      // get element
      let alertBody = document.getElementById('nexiconStateDisplay');

      if(state == true){
          alertBody.innerHTML = '';
      }
      if(state == false){
          //reset the div before adding the alert
          alertBody.innerHTML = '';
          let alert = '<div id="nexiconAlertDisplay" class="alert alert-secondary" role="alert">No words need to be interpreted at this moment.</div>';
          alertBody.innerHTML = alert;
      }
  },
  resetNexicon: function(){
      //this removes the alert that says there isn't anything
      View.toggleNexiconDisplay(false);
      //reset the span that shows users the word
      document.getElementById('nexiconAddition').innerText = "Word";
      //reset the nexicon input
      document.getElementById('nexiconInput').value = "Type Here";
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
