/*==============================================================================
      Decoupler modifies the original text before processing
      Remove any representation that is not just text from an html source
==============================================================================*/

let Decoupler = {
      sentencesPrior: [],
      remount: function(element, target, replacement ){
          //Generalized method for replacing elements and text
          //get a current version of the text and HTML
          let state = Document.fetchDOMState(element);
          //replace the text/element with something else
          state = state.replace(target, replacement);
          //get the target again
          let inputTarget = document.getElementById(element);
          //replace the content
          inputTarget = inputTarget.innerHTML = state;
      },
      spanEvent: function(that){
          //that is the id for the span itself
          let span = document.getElementById("" + that + "");
          let sentence = span.innerText;
          let word = Interpreter.getUnresolvedFromIdentity(that);
          //gets the span that the nexicon uses to displays
          //the word to be interpreted, then sets it
          document.getElementById("nexiconAddition").innerHTML = word;
          //this removes the alert that says there isn't anything
          View.toggleNexiconDisplay(true);
          //this turns the nexicon tab to the right place
          View.toggleNexiconTab("addTab");
      },
      spanFactoryInterpretations: function(unresolved){
          // This is for uninterpreted words
          let spans = [];
          for (var i = 0; i < unresolved.length; i++) {
              //create a unique id for the array
              let spanKey = createKey();
              //create the span and add it to the returned array
              spans[i] = '<span id="' + spanKey + '" class="unresolved" onclick="Decoupler.spanEvent(this.id)" data-toggle="modal" data-target="#nexiconModal">' + unresolved[i] +  " </span>";
              //Add the key to the unresolved span key array
              Interpreter.addUnresolvedSpanKey(spanKey);
          }
          return spans;
      },
      decouple: function(target){
          // This function tries to resolve words that might have an interpretation
          // then it decouples the text from the DOM and returns it as a string
          // Resolve span Id's
          Interpreter.resolveSpans(target);
          // get the id of the element were getting data from
          let source = document.getElementById("" + target + "").innerText;
          //Explicitly type as string
          source = source.toString();
          return source;
      },
      recouple: function(target){
          // This is for uninterpreted words
          //get a current version of the text and HTML
          let state = Document.fetchDOMState(target);
          //get all of the unresolved words
          let unresolved = Interpreter.getUnresolved();
          //for every unresolved word, create a span
          let spans = this.spanFactoryInterpretations(unresolved);
          //for every span
          for (let i = 0; i < unresolved.length; i++) {
              //replace the unresolved word with the span
              this.remount(target, unresolved[i], spans[i]);
          }
          //set the color of the spans based on the current value of the settings tab
          View.setUnresolvedAppearance();
      },
      remove: function(target, image){
          //provide the id and it will remove and replace with the word
          let toBeRemoved = document.getElementById(target);
          try {
              //and then resolve spans
              toBeRemoved.replaceWith(image);
          } catch (e) {
              let message = "In Decoupler.remove(), " + e + " which happened trying to replace : " + toBeRemoved + " with " + image + "";
              Debugger.submitErrorReport(message);
          }
      },
      decoupleSentenceSpans: function(){
          //for all sentence spans, remove them
          for (var i = 0; i < Packager.packagedSpans.length; i++) {
              //the id's of each sentence
              let target = Packager.packagedSpans[i];
              //get the element associated with that id
              let element = document.getElementById("" + target + "");
              try {
                  // This is here because sometimes there is an error replacing
                  //the text
                  let text = element.innerText;
                  element.replaceWith(text);
              } catch (e) {
                  let message = "In Decoupler.decoupleSentenceSpans(), " + e + " which happened trying decouple a span with id: " + target + "";
                  Debugger.submitErrorReport(message);
              }
          }
      },
      unproxify: function(state){
          //This method removes proxy expressions placed in text for the prupose
          // of avoiding TypeErrors with String.replace()
          let proxies = [/\~\#\*\&\$\^/g, /\#\*\&\$\^\~/g, /\*\&\$\^\~\#/g, /\&\$\^\~\#\*/g, /\$\^\~\#\*\&/g, /\^\~\#\*\&\$/g, /\^\#\~\*\&\$/g, /\^\#\*\~\&\$/g, /\^\#\*\&\~\$/g];
          let expressions = ["(", ")", "[", "]", "-", ":", ";", '"', "'"];
          for (var i = 0; i < proxies.length; i++) {
              //might have to specifically typecast as a regExp
              state = state.replace(proxies[i], expressions[i]);
          }
          return state;
      },
      proxify: function(state){
          //This method adds proxy expressions in text for the purpose
          // of avoiding TypeErrors with String.replace()
          // this function actually will proxify the state, sentence, and
          //replacement sentence of this.spanFactorySentences
          let proxies = ["~#*&$^", "#*&$^~", "*&$^~#", "&$^~#*", "$^~#*&", "^~#*&$", "^#~*&$", "^#*~&$", "^#*&~$"];
          let expressions = [/\(/g, /\)/g, /\[/g, /\]/g, /\-/g, /\:/g, /\;/g, /\"/g, /\'/g];
          for (var i = 0; i < proxies.length; i++) {
              //might have to specifically typecast as a regExp
              state = state.replace(expressions[i], proxies[i]);
          }
          return state;
      },
      spanFactorySentences: function(sentence, target){
        // TODO: Rectify their being multiple sentences with the same id

          //this asks the document state for the exact splice where a sentence occurs
          //and then splices it and puts a span around it
          /* let proceed = true;
          for (var i = 0; i < this.sentencesPrior.length; i++) {
            if (sentence == sentencesPrior[i]) {
                proceed = false;
            }
          }
          */

          // This is here because in the test data their were repeat sentences
          // which could be a real probelm
          //if (proceed == true) {
              //console.log("proceed true.");
              //state is the actual text on the DOM
              let state = Document.fetchDOMState(target);
              //explicitly typing in case there is a regExp error
              state = state.toString();
              sentence = sentence.toString();
              //create a unique id for the array
              let spanKey = createKey();
              //Create the span
              let replacement = "<span id='" + spanKey + "' onclick='Packager.spanEvent(this.id)'>" + sentence + "</span>";
              //maybe it just needs to be explicitly type-casted
              replacement = replacement.toString();

  // TODO: This proxifying step does not seems to affect the output: consider removing
              //First we have to sort through the state string replace the
              //original sentence with a span-wrapped sentence
              try {
                  // this means that there is some non-word character that
                  //is influencing String.replace()
                  //state = this.proxify(state);
                //  sentence = this.proxify(sentence);
                  //why am i proxifying the replacement?
                  //replacement = this.proxify(replacement);
          //console.log("State:" + state);
                  newState = state.replace(sentence, replacement);
          //console.log("Replacement" + replacement);
          //console.log("Replaced State:" + newState);
                  //this removes all the unique proxies placed to avoid TypeErrors
                  //with String.replace()
                  //state = this.unproxify(state);
                  //console.log(state);
              } catch (e) {
                  let message = "In Decoupler.spanFactorySentences(), " + e + " which happened with trying to replace: " + sentence + " with span ID: " + spanKey + "";
                  Debugger.submitErrorReport(message);
              }
              //Then we have to take the current DOM contetn and replace it with
              // our modified version with the new span
              try {
                  //tried emptying the target element first, but that still
                  //doesn't seem to change the result
                  document.getElementById(target).innerHTML = "";
                  //put the HTML back on the DOM
                  document.getElementById(target).innerHTML = newState;
                  //ensure the document object is being updated properly
                  Document.updateDataState(target);
              } catch (e) {
                  let message = "In Decoupler.spanFactorySentences(), " + e + "when happened when trying to remount the modified state with span onto the DOM.";
                  Debugger.submitErrorReport(message);
              }
              //return spanKey to be updated into sentence.spanIdenity
              //for each sentence
              return spanKey;
          //}
      },
      removeAllSpans: function(target){
          //function gets called at the beginning to remove artifacts
          //from the previous analysis
          //for spans specifically related to interpretations

          let spanIdenitities = Interpreter.spanIdentities;
          let images = Interpreter.image;

          // removes all of the span ids stored for the purpose of internal
          // word representation
          if(spanIdenitities > 0){
              for (var i = 0; i < spanIdenitities.length; i++) {
                  this.remove(spanIdenitities[i], images[i]);
              }
          }

          // Clean the original packaged span array
          Packager.packagedSpans.splice(0, Packager.packagedSpans.length);

          //for all remaining spans left on the DOM
          elementList = document.getElementById(target).querySelectorAll("span");

          for (var j = 0; j < elementList.length; j++) {
              this.remove(elementList[j].id, elementList[j].innerText);
          }
      },
};
