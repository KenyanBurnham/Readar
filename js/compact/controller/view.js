/**
  Going to need to create a separate settings object at some point
**/
View = {
  initiateView: function(){
      //hide the bottom nav
      document.getElementById('bottomNav').visibility = "hidden";
      //set the input opacity low
      document.getElementById('inputTarget').opacity = .5;
      //show spinner
      document.getElementById("spinnerContainer").visibility = "visible";
      //disable the buttons
      document.getElementById('analyzeButton').disabled = true;
      document.getElementById('defineButton').disabled = true;
      document.getElementById('settingButton').disabled = true;

  },
  completeView: function(){
      //hide the bottom nav
      document.getElementById('bottomNav').visibility = "visible";
      //set the input opacity low
      document.getElementById('inputTarget').opacity = 1;
      //show spinner
      document.getElementById("spinnerContainer").visibility = "hidden";
      //disable the buttons
      document.getElementById('analyzeButton').disabled = false;
      document.getElementById('defineButton').disabled = false;
      document.getElementById('settingButton').disabled = false;
  },
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
  toggleNexiconManageListItems: function(identity, toggle){
      let tab = document.getElementById(identity);
      //grab id of list item tab clicked and add the active class
      //tab.classList.add("active");
      //then add the add Nexicon functionality again
      let image = tab.getAttribute("data-image");
      let interpretation = tab.getAttribute("data-interpretation");
      let syllables = tab.getAttribute("data-syllables");
      console.log("image: " + image + ", interpretation: " + interpretation + ", syllables: " + syllables);
      //unhide the save button
      //document.getElementById("nexiconSave" + identity).style.visibility = "visible";
      //document.getElementById("nexiconCancel" + identity).style.visibility = "visible";
  },
  createNexiconListItem:function(identity, image, interpretation){
      let syllables = getSyllableCount(interpretation);
      let newTab = document.createElement("a");
      newTab.setAttribute("id", "listItem" + identity + "");
      newTab.classList.add("list-group-item");
      newTab.classList.add("list-group-item-action");
      newTab.setAttribute("aria-current", "true");
      newTab.setAttribute("data-interpretation", "" + interpretation + "");
      newTab.setAttribute("data-image", "" + image + "");
      newTab.setAttribute("data-syllables", "" + syllables + "");
      let p = document.createElement("p");
      let small = document.createElement("small");
      let br = document.createElement("br");
      p.classList.add("mb-1");
      p.innerHTML = "" + image + "";
      small.innerHTML = "Interpreted as: '<i>" + interpretation + "</i>', Syllables: " + syllables + "";
      let save = document.createElement("button");
      save.setAttribute("id", "nexiconSavelistItem" + identity + "");
      let cancelBtn = document.createElement("button");
      cancelBtn.setAttribute("id", "nexiconCancellistItem" + identity + "");
      save.setAttribute("style", "visibility: hidden; margin-right: 5px;");
      cancelBtn.setAttribute("style", "visibility: hidden;");
      save.setAttribute("value", "Save");
      save.innerText = "Save";
      cancelBtn.setAttribute("value", "Cancel");
      cancelBtn.innerText = "Cancel";
      save.classList.add("btn");
      save.classList.add("btn-primary");
      save.classList.add("btn-sm");
      cancelBtn.classList.add("btn");
      cancelBtn.classList.add("btn-secondary");
      cancelBtn.classList.add("btn-sm");
      newTab.append(p);
      newTab.append(small);
      newTab.append(br);
      newTab.append(save);
      newTab.append(cancelBtn);
      newTab.addEventListener("click", function(){
          View.toggleNexiconManageListItems(newTab.id, "open");
      });
      document.getElementById("manageTabListItemGroup").append(newTab);
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
    setDensityDisplay: function(){
        // Density display settings
        let on = document.getElementById('customRadioInline3');
        let off = document.getElementById('customRadioInline4');
        let densityDisplay = document.getElementById("bottomNav");
        if (on.checked == true) {
            densityDisplay.style.visibility = "visible";
        }
        if (off.checked == true) {
            densityDisplay.style.visibility = "hidden";
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

        //set the density display
        this.setDensityDisplay();

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
