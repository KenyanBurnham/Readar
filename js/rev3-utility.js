/** ============================================================================
        Gets syllable count using regular expression
=============================================================================**/
function filterWithRegEx(a){
    if(a != null){
        a = a.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        // Removes capital Y's
        a = a.replace(/^y/, '');
        //Produces a length that accounts for dipthongs
        a = a.match(/[aeiouy]{1,2}/g).length;
    }else{
        console.log(a);
    }
    return a;
}

/** ============================================================================
        Gets count of syllables by calling filterWithReqEx
=============================================================================**/
function getSyllableCount(a){
    if (a.length <= 3) {
        // If the word is less or equal to three,
        // then it assumes it is only one syllable long
        return 1;
    }else if(a.length == 0){
        // If the word isn't a word, returns zero
        return 0;
    }else {
        // For any word that is more than three characters
        // Get a count using filterWithExpression
        a = filterWithRegEx(a);
        return a;
    }
}

/*==============================================================================
    Inserts text where the cursor caret is.

    Originator: Scott Klarr
    Source: http://web.archive.org/web/20110102112946/http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
==============================================================================*/
function insertAtCaret(areaId,text) {
  	var txtarea = document.getElementById(areaId);
  	var scrollPos = txtarea.scrollTop;
  	var strPos = 0;
  	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
  		"ff" : (document.selection ? "ie" : false ) );
  	if (br == "ie") {
  		txtarea.focus();
  		var range = document.selection.createRange();
  		range.moveStart ('character', -txtarea.value.length);
  		strPos = range.text.length;
  	}
  	else if (br == "ff") strPos = txtarea.selectionStart;

  	var front = (txtarea.value).substring(0,strPos);
  	var back = (txtarea.value).substring(strPos,txtarea.value.length);
  	txtarea.value=front+text+back;
  	strPos = strPos + text.length;
  	if (br == "ie") {
  		txtarea.focus();
  		var range = document.selection.createRange();
  		range.moveStart ('character', -txtarea.value.length);
  		range.moveStart ('character', strPos);
  		range.moveEnd ('character', 0);
  		range.select();
  	}
  	else if (br == "ff") {
  		txtarea.selectionStart = strPos;
  		txtarea.selectionEnd = strPos;
  		txtarea.focus();
  	}
  	txtarea.scrollTop = scrollPos;
}

/**============================================================================
      Creates random ID

      Originator: Simon Breiter
      Source: https://codepen.io/simonbreiter/pen/gRpRJj
=============================================================================**/
function createKey(){
      // Random number from 0 to length
      const randomNumber = (length) => {
          return Math.floor(Math.random() * length)
      }
      // Generate Pseudo Random String
      const generateID = (length) => {
          const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let text = "";
          for (let i = 0; i < length; i++) {
              text += possible.charAt(randomNumber(possible.length));
          }
          return text;
      }
      return generateID(20);
}
