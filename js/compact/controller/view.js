View = {
  toggleNexicon: function(state){
      nexiconColumn = document.getElementById('nexiconColumn');
      if(state == true){
          nexiconColumn.style.visibility = "hidden";
      }
      if( state == false){
          nexiconColumn.style.visibility = "visible";
      }
  },
  resetNexicon: function(){
      //hide the nexicon
      this.toggleNexicon(true);
      //reset the span that shows users the word
      document.getElementById('nexiconAddition').innerText = "Word";
      //reset the nexicon input
      document.getElementById('nexiconInput').value = "Type Here";
  },
  clearNexiconInput: function(){
      document.getElementById("nexiconInput").value = "";
  },
  initializePreview: function(){
      // get preview element and set to blank
      let preview = document.getElementById("sentencePreview").innerHTML = "";
  },
  updatePreview: function(sentence){
      document.getElementById("sentencePreview").innerHTML = "" + sentence + "";
  },
};

// initializes the nexicon column invisble
document.getElementById('nexiconColumn').style.visibility = "hidden";
//intialize the sentence preview tab
View.initializePreview();