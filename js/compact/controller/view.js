/**
  Going to need to create a separate settings object at some point
**/
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
          let alert = '</br><div id="nexiconAlertDisplay" class="alert alert-secondary" role="alert">No words need to be interpreted at this moment.</br><small>Run analysis to discover words that need internal definitions.</small></div>';
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
      let nexiconAddBadge = document.getElementById("nexiconAddBadge");
      //updates in the case that their are some
      if (unresolvedLength > 0) {
          //display the number of unresolved
          nexiconBadge.innerHTML = "";
          nexiconBadge.innerHTML = "" + unresolvedLength + "";
          nexiconBadge.style.visibility = "visible";
          //change the badge inside the modal too
          nexiconAddBadge.innerHTML = "";
          nexiconAddBadge.innerHTML = "" + unresolvedLength + "";
          nexiconAddBadge.style.visibility = "visible";
      }
      // updates in the case that there are none
      if (unresolvedLength == 0) {
          nexiconBadge.innerHTML = "";
          nexiconBadge.style.visibility = "hidden";
          //change the badge inside the modal too
          nexiconAddBadge.innerHTML = "";
          nexiconAddBadge.style.visibility = "hidden";
      }
  },
  resetNexicon: function(){
      //this removes the alert that says there isn't anything
      View.toggleNexiconDisplay(false);
      //reset the span that shows users the word
      document.getElementById('nexiconAddition').innerText = "Word";
      //reset the nexicon input
      document.getElementById('nexiconInput').value = "";
      document.getElementById("nexiconInput").placeholder = "Type here.";
      //This updates the badge icon; only included in this function since this
      //is part of the cancel operation of the modal
      View.updateNexiconBadge(Interpreter.unresolved.length);
  },
  clearNexiconInput: function(){
      document.getElementById("nexiconInput").value = "";
  },
  createNexiconListItem:function(identity, image, interpretation){
      let syllables = getSyllableCount(interpretation);
      let newTab = "<a id='listItem" + identity + "' class='list-group-item list-group-item-action' aria-current='true' onclick='View.toggleNexiconManageListItems(this.id);'><p class='mb-1'>" + image + "</p><small>Interpreted as: '<i>" + interpretation + "</i>', Syllables: " + syllables + "</small></a>";
      document.getElementById("manageTabListItemGroup").innerHTML += newTab;
  },
  toggleNexiconManageListItems: function(identity){
      //grab id of list item tab clicked and add the active class
      document.getElementById(identity).classList.add("active");
      //then add the add Nexicon functionality again
  },
  updateNexiconManageTab: function(){
      //clear the modal group
      document.getElementById("manageTabListItemGroup").innerHTML = "</br><small style='color: gray;'>Click on saved words to edit.</small></br>";
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
  sanitizeNexiconInput: function(interpretation){
      //remove whitespace and then run through
      //standardize into lower case
      let modifiedInterpretation = interpretation.toLowerCase();
      //remove other white space
      modifiedInterpretation += modifiedInterpretation.trim();
      //remove spaces
      modifiedInterpretation += modifiedInterpretation.replace(/\s/g, '');
      //test for numbers and other non word characters
      let testResults = Interpreter.testForNumber(modifiedInterpretation);
      //if not odd characters are returned "false" then it'll return true
      if (testResults == false) {
          return true;
      } else {
          return false;
      }
  },
  runNexiconInputCheck: function(){
        let textArea = document.getElementById('nexiconInput');
        let updateButton = document.getElementById('nexiconUpdateButton');
        if (textArea.length > 1) {
            updatedButton.disabled = false;
        }
  },
  disableNexiconInputButton: function(){
      document.getElementById('nexiconUpdateButton').disabled = true;
  },
  runNexiconSantitizationCheck: function(){
      //set update button to disabled
      document.getElementById("nexiconUpdateButton").disabled = true;
      console.log("is this happening?");
      let test = this.sanitizeNexiconInput(document.getElementById('nexiconInput').value);
      console.log(test);
      if (test == false) {
          document.getElementById('sanitizeWarning').style.visibility = "hidden";
          document.getElementById("nexiconUpdateButton").disabled = false;
      } else {
          document.getElementById('sanitizeWarning').style.visibility = "visible";
          document.getElementById("nexiconUpdateButton").disabled = true;
      }
  },
  addNewInterpretationCallback: function(identity){
      this.toggleNexiconManageListItems(identity);
      this.toggleNexiconDisplay(true);
      //remove image hidden in element id, which was destroyed
      let image = identity.replace("listItemAdd", '');
      //call nexicon Addfunction
      document.getElementById("nexiconAddition").innerHTML = image;
  },
  updateNexiconAddTab: function(){
      //reset the add items tab
      let unresolved = Interpreter.getUnresolved();
      if (unresolved.length > 0) {
          //hide the alert
          document.getElementById('nexiconAlertDisplay').style.visibility = "hidden";
          for (var i = 0; i < unresolved.length; i++) {
              let image = unresolved[i];
              let newTab = "<a id='listItemAdd" + image + "' data-image='" + image + "' class='list-group-item list-group-item-action' aria-current='true' onclick='View.addNewInterpretationCallback(this.id);'><p class='mb-1'>" + image + "</p></a>";
              document.getElementById("nexiconStateDisplay").innerHTML += newTab;
          }
      } else {
          document.getElementById('nexiconAlertDisplay').style.visibility = "visible";
      }
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
    setGradientDisplaySettings: function(){
        let display = document.getElementById('percentageDensityFeedback');
        let select = document.getElementById('gradientDensitySelect');
        display.innerHTML = "" + select.value + "%";
    },
    toggleDensityDisplay: function(selected){
        //this just turn the density display on and off
        let on = document.getElementById('customRadioInline3');
        let off = document.getElementById('customRadioInline4');
        switch (selected) {
          case 'on':
            on.checked = true;
            off.checked = false;
            break;
          case 'off':
            on.checked = false;
            off.checked = true;
            break;
          default:
            on.checked = true;
            off.checked = false;
        }
    },
    setUnresolvedAppearance: function(){
        let lexiconSpans = document.getElementsByClassName('unresolved');
        for (var i = 0; i < lexiconSpans.length; i++) {
          lexiconSpans[i].style.color = document.getElementById('nexiconTextColor').value;
          lexiconSpans[i].style.backgroundColor = document.getElementById('nexiconHighlightColor').value;
        }
    },
    setDisplaySettings: function(){
        //Will need to expand this to other settings options, for now,
        //we'll just change some dispaly setting

        //show a setting changed icon
        document.getElementById('settingConfirmation').style.visibility = "visible";
        setTimeout(() => { document.getElementById('settingConfirmation').style.visibility = "hidden"; }, 5000);
        //set gradientSetting 0, 1, 2
        Chartographer.gradientSetting[0] = document.getElementById('densityHighColor').value;
        Chartographer.gradientSetting[1] = document.getElementById('densityLowColor').value;
        Chartographer.gradientSetting[2] = document.getElementById('baseTextColor').value;

        // Density display settings
        let on = document.getElementById('customRadioInline3');
        let off = document.getElementById('customRadioInline4');
        let densityDisplay = document.getElementById("visualKey");
        if (on.checked == true) {
            densityDisplay.style.visibility = "visible";
        }
        if (off.checked == true) {
            densityDisplay.style.visibility = "hidden";
        }

        //get all the unresolved class items, and set their color and highlight
        this.setUnresolvedAppearance();
    },
    toggleDefineState: function(){
        //disable the analyze button until unresolved = zero
    },
    toggleEditingState: function(){
        //find all the spans,
        //turn them off
    },
};
