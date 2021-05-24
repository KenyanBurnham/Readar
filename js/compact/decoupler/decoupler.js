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
          console.log(that);
          let span = document.getElementById("" + that + "");
          let sentence = span.innerText;
          console.log(sentence);
          let word = Interpreter.getUnresolvedFromIdentity(that);
          //gets the span that the nexicon uses to displays
          //the word to be interpreted, then sets it
          document.getElementById("nexiconAddition").innerHTML = word;
          // Togglet the visibility to FALSE which is visible
          View.toggleNexicon(false);
      },
      spanFactoryInterpretations: function(unresolved){
          // TODO: Add callback function
          let spans = [];
          for (var i = 0; i < unresolved.length; i++) {
              //create a unique id for the array
              let spanKey = createKey();
              //create the span and add it to the returned array
              spans[i] = '<span id="' + spanKey + '" class="unresolved" onclick="Decoupler.spanEvent(this.id)">' + unresolved[i] +  " </span>";
              //Add the key to the unresolved span key array
              Interpreter.addUnresolvedSpanKey(spanKey);
          }
          return spans;
      },
      decouple: function(target){
          // Decouple gets the word from the unresolved span
          // Resolve span Id's
          Interpreter.resolveSpans(target);
          // get the id of the element were getting data from
          let source = document.getElementById("" + target + "").innerText;
          //Explicitly type as string
          source = source.toString();
          return source;
      },
      recouple: function(target){
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
      },
      remove: function(target, image){
          //provide the id and it will remove and replace with the word
          let toBeRemoved = document.getElementById(target);
          try {
              //and then resolve spans
              toBeRemoved.replaceWith(image);
          } catch (e) {
              console.log("Error trying to replace: " + toBeRemoved + " with: " + image);
          } finally {
              console.log("Carried on anyways.");
          }

      },
      decoupleSentenceSpans: function(){
          //for all sentence spans, remove them
          for (var i = 0; i < Packager.packagedSpans.length; i++) {
              //the id's of each sentence
              let target = Packager.packagedSpans[i];
              let element = document.getElementById("" + target + "");
              try {
                  // This is here because there sometimes are duplicates
                  // of sentences and they get removed in previous steps
                  let text = element.innerText;
                  element.replaceWith(text);
              } catch (e) {
                  console.log("An error happened decoupling a span with id: " + target + "");
              }
          }
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
              let state = Document.fetchDOMState(target);
              //create a unique id for the array
              let spanKey = createKey();
              //Create the span
              let replacement = "<span id='" + spanKey + "' onclick='Packager.spanEvent(this.id)'>" + sentence + "</span>";
              //convert sentence into a regular expression
              try {
                state = state.replace(sentence, replacement);
              } catch (e) {
                //console.log("error replacing sentence with span: " + e);
              } finally {
                //console.log(state);
              }
              //put the HTML back on the DOM
              document.getElementById(target).innerHTML = state;
              // add the span id to the packed spans list
              Packager.packagedSpans.push(spanKey);
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
