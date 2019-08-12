/*==============================================================================
      Decoupler modifies the original text before processing
      Remove any representation that is not just text from an html source
==============================================================================*/

let Decoupler = {
      decouple: function(target){
          // Resolve span Id's
          Interpreter.resolveSpans(target);

          // get the id of the element were getting data from
          let source = document.getElementById("" + target + "").innerText;
          //Explicitly type as string
          source = source.toString();
          return source;
      },
}
