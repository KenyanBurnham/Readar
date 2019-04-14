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

function Word(word, syllable, size, breath) {
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
        syllable:       - Remove -
        sumSyllables:   A sum of all syllables in the sentence
        sumWords:       A sum of all word lengths in sentence
        sizes:          - Remove -
        breath:         - sum of all breath units in sentence
        breathPerWord:  - Remove -
        mapOfWords:     - To Add - Each key of words in order
        ------------------------------------------------------------------------
=============================================================================**/

function Sentence(identity, source, words, syllables, sumSyllables, sumWords, sizes, breath, breathPerWord){
        this.identity = identity;
        this.source = source;
        this.words = words;
        this.syllable = syllables;
        this.sumSyllables = sumSyllables;
        this.sumWords = sumWords;
        this.sizes = sizes;
        this.breath = breath;
        this.breathPerWord = breathPerWord;
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
        mapOfSentences: - To Add - Each key of sentences in order
        ------------------------------------------------------------------------
=============================================================================**/

function Paragraph(identity, source, sentences, sumSyllables, sumWords, breath, breathPerSentence, mapOfSentences){
        this.identity = identity;
        this.source = source;
        this.sentences = sentences;
        this.sumSyllables = sumSyllables;
        this.sumWords = sumWords;
        this.breath = breath;
        this.breathPerSentence = breathPerSentence;
        this.mapOfSentences = mapOfSentences;
}
