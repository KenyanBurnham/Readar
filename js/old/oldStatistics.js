/**=============================================================================
      Gets the maximum value of a dataset

      Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
=============================================================================**/
function getMaximum(dataset){
    let local = [];
    for (var i = 0; i < dataset.length; i++) {
      local[i] = Number(dataset[i]);
    }
    return Math.max(...local);
}

/**=============================================================================
      Gets the minimum value of a dataset

      Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
=============================================================================**/
function getMinimum(dataset){
    let local = [];
    for (var i = 0; i < dataset.length; i++) {
      local[i] = Number(dataset[i]);
    }
    return Math.min(...local);
}

/**=============================================================================
      Get's the median value (mode) of a dataset

      Source: https://www.jstips.co/en/javascript/array-average-and-median/
=============================================================================**/
function getMedian(dataset){
    let targetSorted = dataset.sort((a, b) => a - b);
    let lowMiddle = Math.floor((dataset.length - 1) / 2);
    let highMiddle = Math.ceil((dataset.length - 1) / 2);
    let median = (Number(targetSorted[lowMiddle]) + Number(targetSorted[highMiddle])) / 2;
    return median;
}

/*==============================================================================
      Returns average of dataset
=============================================================================**/
function getAverage(dataset){
  let sum = 0;
  for(let i = 0; i < dataset.length; i++){
      sum = sum + Number(dataset[i]);
  }
  let average = (sum/dataset.length);
  return average;
}

/**=============================================================================
      Returns standard deviation of a dataset

      Source: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
=============================================================================**/
function getStandardDeviation(dataset){
    let average = getAverage(dataset);
    let avgDev = [];
    for (var i = 0; i < dataset.length; i++) {
        avgDev[i] = Math.pow(Math.abs(average - Number(dataset[i])), 2);
    }
    let avgDeviation = getAverage(avgDev);
    let standardDeviation = Math.sqrt(avgDeviation);
    return standardDeviation;
}

/*==============================================================================
      Returns a new value between 0 and 1 based on the dataset

      Source:  https://www.statisticshowto.datasciencecentral.com/normalized/
=============================================================================**/
function normalizeBetweenZeroAndOne(datapoint, dataset){
    return (datapoint - getAverage(dataset))/(getMaximum(dataset)-(getMinimum(dataset)));
}

/*==============================================================================
      Returns a new z score for a given datset

      Source:  https://www.statisticshowto.datasciencecentral.com/normalized/
=============================================================================**/
function standardizeDatasets(datapoint, dataset){
    return ((datapoint - getAverage(dataset))/getStandardDeviation(dataset));
}

/*==============================================================================
      Gets body statistics and adds BodyStatistics object to body object
=============================================================================**/
function bodyStatistics(body){
    // All wordSums in the body
    let bodyWordsSum = [];
    // All syllableSums in the body
    let bodySyllablesSum = [];
    //All breath units in the body
    let bodyBreathsSum = [];
    //Copy of sentence objects
    let sentences = body.sentences;

    for (let i = 0; i < sentences.length; i++) {
        //gather all wordSum counts
        bodyWordsSum[i] = sentences[i].sumWords;
        //gather all syllableSum counts
        bodySyllablesSum[i] = sentences[i].sumSyllables;
        //gather all breath counts
        bodyBreathsSum[i] = sentences[i].breath;
    }

    /**
        sentences:          number of sentences in body

        wordMax:            maximum value of words in body
        syllableMax:        maximum value of syllables in body
        breathMax:          maximum value of breath units in body

        wordMin:            minimum value of words in body
                            (ASSUMPTION) minimum value should be one in most cases
        syllableMin:        minimum value of syllables in body
                            (ASSUMPTION) minimum value should be one in most cases
        breathMax:          minimum value of breath units in body

        wordAverage:        average number of words in body
        syllableAverage:    average number of syllables in body
        breathAverage:      average of breath units in body

        wordMedian:         median number of words in body
        syllableMedian:     median number of sylables in body
        breathMedian:       median value of breath units in body

        wordDeviation:      standard deviation of the words in the body
        syllableDeviation:  standard deviation of the syllables in the body
        breathDeviation:    standard deviation of the breath units in the body
    **/

    let BodyStatistics = {
          original:          sentences.length,

          wordMax:            getMaximum(bodyWordsSum),
          syllableMax:        getMaximum(bodySyllablesSum),
          breathMax:          getMaximum(bodyBreathsSum),

          wordMin:            getMinimum(bodyWordsSum),
          syllableMin:        getMinimum(bodySyllablesSum),
          breathMin:          getMinimum(bodyBreathsSum),

          wordAverage:        getAverage(bodyWordsSum),
          syllableAverage:    getAverage(bodySyllablesSum),
          breathAverage:      getAverage(bodyBreathsSum),

          wordMedian:         getMedian(bodyWordsSum),
          syllableMedian:     getMedian(bodySyllablesSum),
          breathMedian:       getMedian(bodyBreathsSum),

          wordDeviation:      getStandardDeviation(bodyWordsSum),
          syllableDeviation:  getStandardDeviation(bodySyllablesSum),
          breathDeviation:    getStandardDeviation(bodyBreathsSum),
    }
    return BodyStatistics;

}
