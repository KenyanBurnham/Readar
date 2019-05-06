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
    process: function(paragraph){
        console.log(paragraph);
        //Find corpora and honora
        //Corpora.abbreviations.forEach();
        /*If it's a fragment that has a coma and no space before it, then call that a sentence fragment*/

    },
}

let Paragraphs = {
    paragraphs: [],
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
            if(paragraph.length > 0){
                paragraphCount = paragraphCount + 1;
                Paragraphs.paragraphs.push(paragraph);
                Sentences.process(paragraph);
            }
        });
        this.count = paragraphCount;
    },

    processDebug: function(){
        console.log(this.paragraphs);
        console.log(this.count);
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
