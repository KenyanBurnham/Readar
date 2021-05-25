/** ============================================================================
        Gets syllable count using regular expression
=============================================================================**/
function filterWithRegEx(a){
    try {
        if(a != null){
            a = a.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
            // Removes capital Y's
            a = a.replace(/^y/, '');
            //Produces a length that accounts for dipthongs
            a = a.match(/[aeiouy]{1,2}/g).length;
        }
        return a;
    } catch (e) {
        let message = "In Phonemetrics.filterWithRegEx(), " + e + " which happened with: " + a + "";
        Debugger.submitErrorReport(message);
    }
}

/** ============================================================================
        Gets count of syllables by calling filterWithReqEx
=============================================================================**/
function getSyllableCount(a){
    try {
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
    } catch (e) {
        let message = "In Phonemetrics.getSyllableCount(), " + e + " which happened with: " + a + "";
        Debugger.submitErrorReport(message);
    }
}

/** ============================================================================
      Color generator for graphing

      Source:
      https://stackoverflow.com/questions/3080421/javascript-color-gradient
=============================================================================**/

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function generateColor(colorStart,colorEnd,colorCount){

	// The beginning of your gradient
	var start = convertToRGB (colorStart);

	// The end of your gradient
	var end   = convertToRGB (colorEnd);
	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;
	var saida = [];
	for (i = 0; i < len; i++) {
		var c = [];
		alpha += (1.0/len);
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];
		saida.push(convertToHex (c));
	}
	return saida;
}
