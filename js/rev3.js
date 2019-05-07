let Document = {
    text: [],
    eventLog: [],
    textLog: [],

    debugText: function(){
        console.log(this.text);
    },
    debugTextLog: function(){
        console.log(this.textLog);
    },
    debugEventLog: function(){
        console.log(this.eventLog);
    },
    updateKeyboard: function(){
        //this.textLog.forEach(function(){
        //https://codepen.io/gschier/pen/VKgyaY
        //    console.log("I'll use this to create a heat map of keys later.");
        //});
    }
}

function Record(eventObject, objectData, objectEventType, objectTimeStamp){
    this.recorded = eventObject;
    this.text = objectData;
    this.event = objectEventType;
    this.timeStamp = objectTimeStamp;
}

let Sentences = {
    sentences: [],
    splitFragments: function(sentence){
        //Create a copy of sentence to filter common punctuation for fragments
        let mutableSentence = sentence;
        //replace commas with tag
        mutableSentence = mutableSentence.replace(/\,/g, "$");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\(/g, "$");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\)/g, "$");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\[/g, "$");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\]/g, "$");
        //replace colon with tag
        mutableSentence = mutableSentence.replace(/\:/g, "$");
        //replace semicolon with tag
        mutableSentence = mutableSentence.replace(/\;/g, "$");
        //return array of fragments
        return mutableSentence.split("$");
    },
    splitPunctuation: function(paragraph){
        //Remove some simple cases of punctuation
        paragraph = paragraph.replace("!", ".");
        paragraph = paragraph.replace("?", ".");
        paragraph = paragraph.replace("...", ".");
        //Split paragraph by "SPACE + ." pairs
        let sentences = paragraph.split(". ");
        //return sentences without punctuations
        return sentences;
    },
    splitSentences: function(paragraph){
        let paragraphSentences = [];
        //remove common punctuation and split sentence by ". " pairs
        let sentences = Sentences.splitPunctuation(paragraph);
        //For each sentence, remove any edge cases and push to larger object
        sentences.forEach(function(sentence){
            //Make random spaces filter out
            if(sentence.length > 0){
                //create Sentence Object to save in sentences array of Sentences Object
                let Sentence = new Object;
                //Add an empty string of sentence to Sentence Object
                Sentence.sentence = "";
                //Push current sentence into into sentence object
                Sentence.sentence = sentence;
                //Set fragments to Sentence Object
                Sentence.fragments = Sentences.splitFragments(sentence);
                //Save a copy to the sentences object
                Sentences.sentences.push(Sentence);
                //Save a copy to return to paragraph
                paragraphSentences.push(Sentence);
            }
        });
        return paragraphSentences;
    },
    filterHonora: function(paragraph){
        //create a mutable copy
        let mutableParagraph = paragraph;
        //initialize a count variable to access replacement words for various honorifics
        let corpCount = 0;
        //Find honora
        Corpora.honora.forEach(function(acronyma){
              //Increment the count
              corpCount = corpCount + 1;
              //look for words that match in the paragraph
              let match = paragraph.match(acronyma + ".");
              //If one is found, replace with full word
              if(match){
                  mutableParagraph = mutableParagraph.replace("" + match[0] + "", Corpora.replacement[corpCount - 1]);
              }
        });
        return mutableParagraph;
    },
}

let Paragraphs = {
    paragraphs: [],
    strings: [],
    count: 0,
    process: function(target){
        //get text from input
        let text = document.getElementById("" + target + "").value;
        //split text by spaces
        let newlined = text.split("\n");
        //Number of paragraphs
        let paragraphCount = newlined.length;
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
                let sentencesWithoutHonora = Sentences.filterHonora(paragraph);
                //Split Sentences
                let splitSentences = Sentences.splitSentences(paragraph);
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
    },

    processDebug: function(){
        console.log(this.paragraphs);
        console.log(this.count);
    },
    sentenceDebug: function(){
        Paragraphs.paragraphs.forEach(function(paragraph){
            paragraph.sentences.forEach(function(sentence){
                console.log(sentence);
            });
        });
    },
    fragmentDebug: function(){
      Paragraphs.paragraphs.forEach(function(paragraph){
          paragraph.sentences.forEach(function(sentence){
              console.log(sentence.fragments);
          });
      });
    },
};

let Observer = {
    record: [],
    text: [],
    event: [],
    timeStamp: [],
    keyTimeStamp: [],
    observe: function(object){
        //updates the record log of texts, events, and the time they occured
        this.record.push(object.recorded);
        this.text.push(object.text);
        this.event.push(object.event);
        this.timeStamp.push(object.timeStamp);
        //For typing speed were only interested in key event
        if(object.event == "typed"){
            this.keyTimeStamp.push(object.timeStamp);
        }
    },
    reveal: function(){
        for (let i = 0; i < this.record.length; i++) {
            console.log("------- Record " + i + "--------");
            console.log(this.record[i]);
            console.log(this.text[i]);
            console.log(this.event[i]);
            console.log(this.timeStamp[i]);
        }
    }
}

let Mediator = {
    update: function(element){
        // get the id of the element were getting data from
        let src = document.getElementById("" + element + "");
        //Only update the current state of chars
        //Keep values of textLog
        Document.text = src.value.split("");
    },
    handleNewPaste: function(event){
        // Stop data actually being pasted
        event.stopPropagation();
        event.preventDefault();
        // Get pasted data via clipboard API
        let clipboardData = event.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('Text');
        //split datat into characters
        let splitData = pastedData.split("");
        //Add a new record into observer
        let newRecord = new Record(event, splitData, "pasted", event.timeStamp);
        Observer.observe(newRecord);
        //get element id from event
        let src = event.srcElement.id;
        //Paste text as if past event had completed
        insertAtCaret(src, pastedData);
        this.update(src);
    },
    handleNewKey: function(event){
        // Specific character
        key = event.key;
        //Time stamp when entered
        timeStamp = event.timeStamp;
        Document.eventLog.push(event);
        Document.text.push(event.key);
        Document.textLog.push(event.key);
        // get the id of the original src element
        let src = event.srcElement.id;
        //Add a new record into observer
        let newRecord = new Record(event, event.key, "typed", event.timeStamp);
        Observer.observe(newRecord);
        this.update(src);
        Document.updateKeyboard();
    }
}

//.split("\n"); paragraphs
function words(target){
    //get text from input
    let text = document.getElementById("" + target + "").value;
    //split text by spaces
    let spaced = text.split(" ");
    //Create variable for sentences to be packaged
    let sentences = [];
    //Create a variable for sentence fragments
    let fragment = [];
    //for each split
    spaced.forEach(function(word){
        //create a blank sentence variable
        let sentence = [];
        //Split the word in to characters
        characters = word.split("");
        characters.forEach(function(character){
          if (character == character.toUpperCase()) {
              //Character is uppercase string
          }
          else{
              //If it's anything else
              if(character == "."){
                  console.log("period");
              }if(character == ","){
                  console.log("comma");
              }if(character == ":"){
                  console.log("colon");
              }if(character == ";"){
                  console.log("semicolon");
              }else{
                  //it's either a lower case character or a character that doesn't matter.
              }
          }
        });
    });
    //Finding all of the words
}

/*
  Combinations of special characters I am looking for (where "_" is a SPACE)

  1. Abc.!?_                          Simple sentence is this.
  2. Abc,;:_ + ANY + abc._              Complex Sentence, coul look like: this.
  3. Abc,;:_ + Abr._ + ANY + abc._

  4. + ab'c +                         Contraction: ignored.
  5. + Abc... +                       Ellipses: Could be end of sentence or part of sentence fragment
*/

/*
highlighting syntax
https://markjs.io/
*/
