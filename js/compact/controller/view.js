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
};

// initializes the nexicon column invisble
document.getElementById('nexiconColumn').style.visibility = "hidden";
