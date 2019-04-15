/**=============================================================================
        Word - Class Constructor

        ------------------------------------------------------------------------
            Properties:
        ------------------------------------------------------------------------
        word:         the literal string for a word
        syllable:     syllable count of the word based on the word length
        size:         the word length
        breath:       the syllable count divided by the word length
        ------------------------------------------------------------------------
=============================================================================**/

function Word(wordIdentity, word, syllable, size, breath) {
        this.wordIdentity = wordIdentity;
        this.word = word;
        this.syllable = syllable;
        this.size = length;
        this.breath = breath;
}

/**=============================================================================
        Sentence - Class Constructor

        ------------------------------------------------------------------------
            Properties:
        ------------------------------------------------------------------------
        identity:       Unique key for the sentence
        source:         The original string
        words:          Array of Word objects
        sumSyllables:   A sum of all syllables in the sentence
        sumWords:       A sum of all word lengths in sentence
        breath:         sum of all breath units in sentence
        breathPerWord:  Array of breaths per word in sentence
        mapOfWords:     Each key of words in order
        ------------------------------------------------------------------------
=============================================================================**/

function Sentence(sentenceIdentity, sentenceSource, words, syllables, sumSyllables, sumWords, sizes, breath, breathPerWord){
        this.sentenceIdentity = sentenceIdentity;
        this.sentenceSource = source;
        this.words = words;
        this.sumSyllables = sumSyllables;
        this.sumWords = sumWords;
        this.breath = breath;
        this.breathPerWord = breathPerWord;
        this.mapOfWords = mapOfWords;
}

/**=============================================================================
        Paragraph - Class Constructor

        ------------------------------------------------------------------------
            Properties:
        ------------------------------------------------------------------------
        identity:       Unique key for the Paragraph
        source:         The original string
        sentences:      All of the Sentence Objects
        sumSyllables:   A sum of all syllables in the paragraph
        sumWords:       A sum of all word lengths in paragraph
        breath:         sum of all breath units in the paragraph
        mapOfSentences: Each key of sentences in order
        ------------------------------------------------------------------------
=============================================================================**/

function Paragraph(paragraphIdentity, paragraphSource, sentences, sumSyllables, sumWords, breath, breathPerSentence, mapOfSentences){
        this.paragraphIdentity = paragraphIdentity;
        this.paragraphSource = paragraphSource;
        this.sentences = sentences;
        this.sumSyllables = sumSyllables;
        this.sumWords = sumWords;
        this.breath = breath;
        this.breathPerSentence = breathPerSentence;
        this.mapOfSentences = mapOfSentences;
}

/**=============================================================================
        Body - Class Constructor

        ------------------------------------------------------------------------
            Properties:
        ------------------------------------------------------------------------
        bodySource:           Copy of original string input
        paragraphs:           Array of all paragraphs in the Body
        mapOfStringElements:  Each key of each Paragraph and Header in order
        headers:              Array of all header strings in the Body
        sumSyllables:         sum of all syllables in the Body
        sumWords:             sum of all word length in the Body
        breath:               Breath unit of the whole Body
        breathWithoutHeader:  Breath unit of whole Body without headers, sets average
        breathPerParagraph:   Breath unit of each Paragraph in order
        ------------------------------------------------------------------------
=============================================================================**/

function Body(bodySource, paragraphs, mapOfStringElements, headers, sumSyllables, sumWords, breath, breathWithoutHeader, breathPerParagraph){
        this.bodySource = bodySource;
        this.paragraphs = paragraphs;
        this.mapOfStringElements = mapOfStringElements;
        this.headers = headers;
        this.sumSyllables = sumSyllables;
        this.sumWords = sumWords;
        this.breath = breath;
        this.breathWithoutHeader = breathWithoutHeader;
        this.breathPerParagraph = breathPerParagraph;

}
