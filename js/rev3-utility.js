/*
SOURCE: http://web.archive.org/web/20110102112946/http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
*/
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