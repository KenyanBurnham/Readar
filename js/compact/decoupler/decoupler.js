/*==============================================================================
      Decoupler modifies the original text before processing
      Remove any representation that is not just text from an html source
==============================================================================*/

let Decoupler = {
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
      spanFactory: function(unresolved){
          // TODO: Add callback function
          let spans = [];
          for (var i = 0; i < unresolved.length; i++) {
              //create a unique id for the array
              let spanKey = createKey();
              //create the span and add it to the returned array
              spans[i] = '<span id="' + spanKey + '" class="unresolved">' + unresolved[i] +  "</span>";
              //Add the key to the unresolved span key array
              Interpreter.addUnresolvedSpanKey(spanKey);
          }
          return spans;
      },
      decouple: function(target){
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
          let spans = Decoupler.spanFactory(unresolved);
          //for every span
          console.log(unresolved.length);
          for (let i = 0; i < unresolved.length; i++) {
              //replace the unresolved word with the span
              Decoupler.remount(target, unresolved[i], spans[i]);
          }
      },
}
