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
  createNexiconListItem:function(identity, image, interpretation){
      let newTab = "<a id='listItem" + identity + "' href='#' class='list-group-item list-group-item-action' aria-current='true' onclick='View.toggleNexiconManageListItems(this.id);'><p class='mb-1'>" + image + "</p><small>Interpreted as: <i>'" + interpretation + "</i>'</small></a>";
      document.getElementById("manageTabListItemGroup").innerHTML += newTab;
  },
  toggleNexiconManageListItems: function(identity){
      //grab id of list item tab clicked and add the active class
      document.getElementById(identity).classList.add("active");
      //then add the add Nexicon functionality again
  },
  updateNexiconManageTab: function(){
      //clear the modal group
      document.getElementById("manageTabListItemGroup").innerHTML = "</br>";
      //then add the images and items
      let images = Interpreter.getImages();
      let abstracts = Interpreter.getAbstracts();
      //if there are any images, the let's build a few list items
      if(images.length > 0){
          for (var i = 0; i < images.length; i++) {
              this.createNexiconListItem(i, images[i], abstracts[i]);
          }
      } else{
          //add a thing that displays "will go here"
      }
  },
  updateNexiconAddTab: function(){


      //get unresolved
      //display them
      //add a callback that calls
      //Decoupler.spanEvent("spanidentity");
      //call this.updateNexiconManageTab();
  },
  toggleNexiconTab: function(identity){
      //this method essentially tries to replicte the bootstrap tabs functions
      //that for some reason are not working correctly
      let nexManageTab = document.getElementById("nexiconManageTab");
      let nexAddTab = document.getElementById("nexiconAddTab");
      let manageButton = document.getElementById("manageTab");
      let addButton = document.getElementById("addTab");
      switch (identity) {
          case "manageTab":
              //manage tab selected
              //make sure the right tab is being shown
              nexAddTab.classList.remove("active");
              nexManageTab.classList.add("active");
              nexAddTab.classList.remove("show");
              nexManageTab.classList.add("show");
              //make sure the tab looks the same
              addButton.classList.remove("active");
              manageButton.classList.add("active");
              //Add functionality for resetting
              this.updateNexiconManageTab();
            break;
          case "addTab":
              // add tab selected
              //make sure the right tab is being shown
              nexManageTab.classList.remove("active");
              nexAddTab.classList.add("active");
              nexManageTab.classList.remove("show");
              nexAddTab.classList.add("show");
              //make sure the tab looks the same
              manageButton.classList.remove("active");
              addButton.classList.add("active");
              //add functionality for resetting
              this.updateNexiconAddTab();
            break;
        }
    },
};
