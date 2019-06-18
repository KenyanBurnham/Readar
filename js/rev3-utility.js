/*==============================================================================
      Provides mathematical methods
==============================================================================*/
let Ariths = {
    maxima: function(dataset){
        let local = [];
        for (var i = 0; i < dataset.length; i++) {
          local[i] = Number(dataset[i]);
        }
        return Math.max(...local);
    },
    minima: function(dataset){
        let local = [];
        for (var i = 0; i < dataset.length; i++) {
          local[i] = Number(dataset[i]);
        }
        return Math.min(...local);
    },
    median: function(dataset){
        let targetSorted = dataset.sort((a, b) => a - b);
        let lowMiddle = Math.floor((dataset.length - 1) / 2);
        let highMiddle = Math.ceil((dataset.length - 1) / 2);
        let median = (Number(targetSorted[lowMiddle]) + Number(targetSorted[highMiddle])) / 2;
        return median;
    },
    average: function(dataset){
        let sum = 0;
        for(let i = 0; i < dataset.length; i++){
            sum = sum + Number(dataset[i]);
        }
        let average = (sum/dataset.length);
        return average;
    },
    deviation: function(dataset){
        let average = getAverage(dataset);
        let avgDev = [];
        for (var i = 0; i < dataset.length; i++) {
            avgDev[i] = Math.pow(Math.abs(average - Number(dataset[i])), 2);
        }
        let avgDeviation = getAverage(avgDev);
        let standardDeviation = Math.sqrt(avgDeviation);
        return standardDeviation;
    }
}


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

// TODO: Replace numbers with interpretations of the syllables of numbers


/*
// Generated by CoffeeScript 1.7.1
(function() {
  this.NumberToWords = (function() {
    var ones, scales, tens;

    function NumberToWords() {}

    ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];

    NumberToWords.prototype.convert = function(num) {
      var n, number, numberPart, previousScale, previousScaleValue, remainder, scaleValue, word, _i, _ref;
      number = Math.abs(num);
      if (number < 100) {
        return this.check_negative(num, this.convert_less_than_hundred(number));
      }
      if (number < 1000) {
        return this.check_negative(num, this.convert_less_than_thousand(number));
      }
      for (n = _i = 0, _ref = scales.length; 0 <= _ref ? _i <= _ref : _i >= _ref; n = 0 <= _ref ? ++_i : --_i) {
        previousScale = n - 1;
        scaleValue = Math.pow(1000, n);
        if (scaleValue > number) {
          previousScaleValue = Math.pow(1000, previousScale);
          numberPart = parseInt(number / previousScaleValue, 10);
          remainder = number - (numberPart * previousScaleValue);
          word = this.convert_less_than_thousand(numberPart) + " " + scales[previousScale];
          if (remainder > 0) {
            word = word + ", " + this.convert(remainder);
          }
          return this.check_negative(num, word);
        }
      }
    };

    NumberToWords.prototype.convert_less_than_hundred = function(number) {
      var i, tempVal, _i, _ref;
      if (number < 20) {
        return ones[number];
      }
      for (i = _i = 0, _ref = tens.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        tempVal = 20 + 10 * i;
        if (tempVal + 10 > number) {
          if (number % 10 !== 0) {
            return tens[i] + " " + ones[number % 10];
          }
          return tens[i];
        }
      }
    };

    NumberToWords.prototype.convert_less_than_thousand = function(number) {
      var modulus, remainder, word;
      word = "";
      remainder = parseInt(number / 100, 10);
      modulus = parseInt(number % 100, 10);
      if (remainder > 0) {
        word = ones[remainder] + " hundred";
        if (modulus > 0) {
          word = word + " ";
        }
      }
      if (modulus > 0) {
        word = word + this.convert_less_than_hundred(modulus);
      }
      return word;
    };

    NumberToWords.prototype.check_negative = function(number, word) {
      if (number < 0) {
        return "negative " + word;
      } else {
        return word;
      }
    };

    return NumberToWords;

  })();

}).call(this);
*/
