/**
  Going to need to create a separate settings object at some point
**/
// TODO: Add a search and filter for the nexicon manage tab
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
      View.updateNexiconBadge(Nexicon.unresolved.length);
  },
  clearNexiconInput: function(){
      document.getElementById("nexiconInput").value = "";
  },
  createInterpretationfromEdit: function(){
      //at the moment this does not account from syllables
      let image = document.getElementById('nexiconWordToEdit').innerHTML;
      let newAbstract = document.getElementById('editInterpretationInput').value;
      //need to get the image and replace the abstract at that index
      Nexicon.replaceInterpretation(image, newAbstract);
      // TODO: ensure that the abstract eventually get's a custom syllable count
      View.toggleNexiconTab('manageTab');
  },
  toggleNexiconManageListItems: function(identity, toggle){
      //get the right elements showing
      this.toggleNexiconTab("editTab");
      document.getElementById("nexiconEditGroup").style.visibility = "visible";
      //grad the data from the source element
      //this is the source element that contains the data
      let tab = document.getElementById(identity);
      //grab id of list item tab clicked and add the active class
      //then add the add Nexicon functionality again
      let image = tab.getAttribute("data-image");
      let interpretation = tab.getAttribute("data-interpretation");
      let syllables = tab.getAttribute("data-syllables");
      //enter the data into the input and placeholder values
      document.getElementById('nexiconWordToEdit').innerHTML = image;
      document.getElementById('editInterpretationInput').value = "" + interpretation + "";
      document.getElementById('editSyllablesInput').value = "" + syllables + "";
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
      newTab.append(p);
      newTab.append(small);
      newTab.append(br);
      newTab.addEventListener("click", function(){
          View.toggleNexiconManageListItems(newTab.id, "open");
      });
      document.getElementById("manageTabListItemGroup").append(newTab);
  },
  updateNexiconManageTab: function(){
      //clear the modal group
      document.getElementById("manageTabListItemGroup").innerHTML = "</br><small style='color: gray;'>Click on saved words to edit.</small></br>";
      //then add the images and items
      let images = Nexicon.useImages();
      let abstracts = Nexicon.useAbstracts();
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
      let testResults = Nexicon.testForNumber(modifiedInterpretation);
      //if not odd characters are returned "false" then it'll return true
      if (testResults == false) {
          return true;
      } else {
          return false;
      }
  },
  runNexiconInputCheck: function(source){
        switch (source) {
            case "add":
                let textArea = document.getElementById('nexiconInput');
                let updateButton = document.getElementById('nexiconUpdateButton');
                if (textArea.length > 1) {
                    updatedButton.disabled = false;
                }
                break;
            case "edit":
                let interpretationInput = document.getElementById('editInterpretationInput');
                let editButton = document.getElementById('nexiconEditButton');
                if (interpretationInput.length > 1) {
                    editButton.disabled = false;
                }
                break;
        }
  },
  disableNexiconInputButton: function(){
      document.getElementById('nexiconUpdateButton').disabled = true;
  },
  runNexiconSantitizationCheck: function(source){
      switch (source) {
              case "add":
              //set update button to disabled
              document.getElementById("nexiconUpdateButton").disabled = true;
              let test = this.sanitizeNexiconInput(document.getElementById('nexiconInput').value);
              if (test == false) {
                  document.getElementById('sanitizeWarning').style.visibility = "hidden";
                  document.getElementById("nexiconUpdateButton").disabled = false;
              } else {
                  document.getElementById('sanitizeWarning').style.visibility = "visible";
                  document.getElementById("nexiconUpdateButton").disabled = true;
              }
              break;
          case "edit":
              //set update button to disabled
              document.getElementById("nexiconEditButton").disabled = true;
              let secondTest = this.sanitizeNexiconInput(document.getElementById('editInterpretationInput').value);
              if (secondTest == false) {
                  document.getElementById('sanitizeWarning').style.visibility = "hidden";
                  document.getElementById("nexiconEditButton").disabled = false;
              } else {
                  document.getElementById('sanitizeWarning').style.visibility = "visible";
                  document.getElementById("nexiconEditButton").disabled = true;
              }
              break;
      }
  },
  addNewInterpretationCallback: function(identity){
      this.toggleNexiconManageListItems(identity);
      this.toggleNexiconDisplay(true);
      //remove image hidden in element id, which was destroyed
      let image = identity.replace("listItemAdd", '');
      //call nexicon Addfunction
      document.getElementById("nexiconAddition").innerHTML = image;
      this.toggleNexiconTab('addTab');
  },
  updateNexiconAddTab: function(){
      //reset the add items tab
      let unresolved = Nexicon.useUnresolved();
      if (unresolved.length > 0) {
          //document.getElementById('nexiconAddWordsList').innerHTML = "";
          //hide the alert
          document.getElementById('nexiconAlertDisplay').style.visibility = "hidden";
          //unhide the prompt
          document.getElementById('createInterpretationPrompt').style.visibility = "visible";
          for (var i = 0; i < unresolved.length; i++) {
              let image = unresolved[i];
              let newTab = "<a id='listItemAdd" + image + "' data-image='" + image + "' class='list-group-item list-group-item-action' aria-current='true' onclick='View.addNewInterpretationCallback(this.id);'><p class='mb-1'>" + image + "</p></a>";
              document.getElementById("nexiconAddWordsList").innerHTML += newTab;
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
      let nexEditTab = document.getElementById('nexiconEditTab');
      let editButton = document.getElementById('nexiconEditButton');
      let editTab = document.getElementById('editTab');
      switch (identity) {
          case "manageTab":
              //manage tab selected
              //make sure the right tab is being shown
              nexAddTab.classList.remove("active");
              nexManageTab.classList.add("active");
              nexAddTab.classList.remove("show");
              nexManageTab.classList.add("show");
              //nexEditTab.style.visibility = "hidden";
              nexEditTab.classList.remove("show");
              nexEditTab.classList.remove("active");
              editTab.style.visibility = "hidden";
              editTab.classList.remove("show");
              editTab.classList.remove("active");
              //make sure the tab looks the same
              addButton.classList.remove("active");
              manageButton.classList.add("active");
              document.getElementById('createInterpretationPrompt').style.visibility = "hidden";
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
              nexEditTab.classList.remove("show");
              nexEditTab.classList.remove("active");
              editTab.style.visibility = "hidden";
              editTab.classList.remove("show");
              editTab.classList.remove("active");
              //make sure the tab looks the same
              manageButton.classList.remove("active");
              addButton.classList.add("active");
              //add functionality for resetting
              this.updateNexiconAddTab();
            break;
            case "editTab":
                // edit tab selected
                //make sure the right tab is being shown
                nexManageTab.classList.remove("active");
                nexAddTab.classList.remove("active");
                nexEditTab.classList.add("active");
                nexManageTab.classList.remove("show");
                nexAddTab.classList.remove("show");
                nexEditTab.classList.add("show");
                editTab.style.visibility = "visible";
                editTab.classList.add("show");
                editTab.classList.add("active");
                document.getElementById('createInterpretationPrompt').style.visibility = "hidden";
                //editTab.classList.add("show");
                //editTab.classList.add("active");
                //make sure the tab looks the same
                manageButton.classList.remove("active");
                addButton.classList.remove("active");
                editButton.classList.add("active");
                //add functionality for resetting
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
