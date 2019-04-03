

//Begins the process of building the model
function instantiateModel(){
    let sourceString = collectSource("inputPlace");
    //buildModel(sourceString);
}

/**
  let Sentence = new Object [
      words: [word0, word1, word2, ...],
      syllables: [syllable0, syllable1, syllable2, ...],
      breaths: [(word0 / syllable0), (word1 / syllable1), (word2 / syllable2), ... ],
  };
**/

/**
  let Paragraph = new Object;
  Paragraph = [
    sentences: [Sentence0, Sentence1, Sentence2, ...],
    breaths: [breath0, breath1, breath2, ...],
    words: [word0, word2, word1, ...],
    syllables: [number0, number 1, number2, ...],

    commas: [index0, index1, index2, index3, ...],
    parenthesis: [index0, index1, index2, index3, ...],
    abbreviations[index0, index1, index2, ...],

    sumOfSentences: number,
    sumWords: sum(WordsInWholeThing),
    sumSyllables: sum(SyllablesInWholeThing),

    wordsPerSentence: [numberOfWordsInSentence],
    syllablesPerSentence: [numberOfSyllablesPerSentence],
    sentenceBreathUnits: [numberOfBreathUnitsPerSentence],

    averageWords: (sumOfWords / sumOfSentences),
    averageSyllables: (sumOfSyllables / sumOfSentences),
    averageBreathUnits: (sumOfBreathUnits / sumOfSentences),
  };

  let Document = new Object;
  Document = [
      source: originalString,
      Paragraphs: [Paragraph0, Paragraph1, Paragraph2],

      averageWordsPerParagraph: (sumOfWordsPerParagraph / 2 ),
      averageSyllablesPerParagraph: (sumOfSyllablesPerParagraph / 2),
      averageBreathUnitsPerParagraph: (sumOfBreathUnitsPerParagraph / 2),

      mostRepeatedWordPairs: (modeOfWordNeigborPairs),
      mostRepeatedWord: (modeOfWords),
  };
**/
