/*==============================================================================
      Decoupler modifies the original text before processing
      Remove any representation that is not just text from an html source
==============================================================================*/
let Decoupler = {
      decouplerParagraphs: function(input){
          //Usefull for removing IE/Opera insertions
          return input.replace(/<p>/g, "").replace(/<\/div>/g, "");
      },
      decouplerDivs: function(input){
          //Usefull for removing Chrome/Safari insertions
          return input.replace(/<div>/g, "").replace(/<\/div>/g, "");
      },
      decouplerEscapedSpaces: function(input){
          return input.replace(/&nbsp;/g, " ");
      },
      decouplerBreaks: function(input){
          //Usefull for removing FireFox insertions
          return input.replace(/<br>/g, "\n");
      },
      decouplerTrim: function(input){
          return input.replace(/^\s+|\s+$/gm,'');
      },
      decouple: function(target){
          // get the id of the element were getting data from
          let source = document.getElementById("" + target + "").innerHTML;
          //Explicitly type as string
          source = source.toString();
          //Resolve all interpretations
          source = Decoupler.decoupleInterpretations(source);
          //Trim whitespace
          source = Decoupler.decouplerTrim(source);
          //Remove example breaks
          source = Decoupler.decouplerBreaks(source);
          //Remove nbsp
          source = Decoupler.decouplerEscapedSpaces(source);
          //remove divs caused by article
          source = Decoupler.decouplerDivs(source);
          //remove divs caused by article
          source = Decoupler.decouplerParagraphs(source);
          //return filtered innerHTML
          return source;
      },

}
