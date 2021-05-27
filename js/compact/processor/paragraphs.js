let Paragraphs = {
    paragraphs: [],
    strings: [],
    count: 0,
    reset: function(){
        // Set all global data to empty
        this.paragraphs = [];
        this.strings = [];
        this.count = 0;
    },
    process: function(text){
        // Reset paragraph global data
        this.reset();
        //split text by new lines / carriage returns
        let newlined = text.split("\n");
        //Number of paragraphs
        let paragraphCount = newlined.length;
        //For each paragraph
        newlined.forEach(function(paragraph){
            //Deals with spurious return carriages.
            paragraphCount = paragraphCount - 1;
            //If the paragraph is greater than zero (not just a line-break)
            if(paragraph.length > 0){
                //Increment paragraph counter for this.count
                paragraphCount = paragraphCount + 1;
                //Add paragraphs to Paragraph Object
                Paragraphs.strings.push(paragraph);
                //Begin sentence filtering
                          //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Filtering Like Honora/Corpora
                //Split Sentences
                let splitSentences = Sentences.process(paragraph);
                //Create Paragraph object to store sentences
                let Paragraph = new Object;
                //Set original text to Paragraph object
                Paragraph.originText = paragraph;
                //Set split sentences with honora replaced in Paragraph Object
                Paragraph.sentences = splitSentences;
                //push Paragraph object into paragraphs array of Paragraphs object
                Paragraphs.paragraphs.push(Paragraph);
            }
        });
        //Update the paragraph count
        this.count = paragraphCount;
        Document.body = this.paragraphs;
    },
};
