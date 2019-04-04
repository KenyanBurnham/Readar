/*
Source:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
*/
function getMaximum(source){
    let local = [];
    for (var i = 0; i < source.length; i++) {
      local[i] = Number(source[i]);
    }
    return Math.max(...local);
}

/*
Source:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
*/
function getMinimum(source){
    let local = [];
    for (var i = 0; i < source.length; i++) {
      local[i] = Number(source[i]);
    }
    return Math.min(...local);
}

/**
Source:
https://www.jstips.co/en/javascript/array-average-and-median/
**/
function getMedian(source){
    let targetSorted = source.sort((a, b) => a - b);
    let lowMiddle = Math.floor((source.length - 1) / 2);
    let highMiddle = Math.ceil((source.length - 1) / 2);
    let median = (Number(targetSorted[lowMiddle]) + Number(targetSorted[highMiddle])) / 2;
    return median;
}

/**
Source:
https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
**/
function getAverageDeviation(source, average){
    let avgDev = [];
    for (var i = 0; i < source.length; i++) {
        avgDev[i] = Math.pow(Math.abs(average - Number(source[i])), 2);
    }
    let avgDeviation = getAverage(avgDev);
    let rootedDeviation = Math.sqrt(avgDeviation);
    return rootedDeviation;
}

function getAverage(source){
  let sum = 0;
  for(let i = 0; i < source.length; i++){
      sum = sum + Number(source[i]);
  }
  let average = (sum/source.length);
  return average;
}

function syllableStatistics(){
    //console.log("%c ---- Syllable Statistics ----", 'background: #222; color: #fd7e14');
    //Get the sum
    let averageSyllable = getAverage(breathSyllables);
    //console.log("Average: " + averageSyllable);

    //Get the standard deviation
    let averageDeviation = getAverageDeviation(breathSyllables, averageSyllable);
    //console.log("Standard Deviation: " + averageDeviation);

    //Get Median
    let median = getMedian(breathSyllables);
    //console.log("Median Value: " + median);

    //Get Minimum
    let minimum = getMinimum(breathSyllables);
    //console.log("Minimum: " + minimum);

    //Get Maximum
    let maximum = getMaximum(breathSyllables);
    //console.log("Maximum: " + maximum);
}

function wordStatistics(){
    //console.log("%c ---- Word Statistics ----", 'background: #222; color: #bada55');
    //Get the sum
    let averageWord = getAverage(breathWords);
    //console.log("Average: " + averageWord);

    //Get the standard deviation
    let averageDeviation = getAverageDeviation(breathWords, averageWord);
    //console.log("Standard Deviation: " + averageDeviation);

    //Get Median
    let median = getMedian(breathWords);
    //console.log("Median Value: " + median);

    //Get Minimum
    let minimum = getMinimum(breathWords);
    //console.log("Minimum: " + minimum);

    //Get Maximum
    let maximum = getMaximum(breathWords);
    //console.log("Maximum: " + maximum);
}

function breathUnitsStatistics(){
    //console.log("%c ---- Breath Statistics ----", 'background: #222; color: #007bff');
    //Get the sum
    let averageBreath = getAverage(breathUnits);
    //console.log("Average: " + averageBreath);

    //Get the standard deviation
    let averageDeviation = getAverageDeviation(breathUnits, averageBreath);
    //console.log("Standard Deviation: " + averageDeviation);

    //Get Median
    let median = getMedian(breathUnits);
    //console.log("Median Value: " + median);

    //Get Minimum
    let minimum = getMinimum(breathUnits);
    //console.log("Minimum: " + minimum);

    //Get Maximum
    let maximum = getMaximum(breathUnits);
    //console.log("Maximum: " + maximum);
}

//Begins forming the statistics for the page.
function statistics(){
    breathUnitsStatistics();
    wordStatistics();
    syllableStatistics();
}
