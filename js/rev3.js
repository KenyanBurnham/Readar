let Document = {
    text: [],
    eventLog: [],
    textLog: [],
    body: [],
    edges: [],
    errorLog: [],
    words: [],
    wordKeys: [],
    interpretations: ["Revolution360"],
    interpretedAs: ["Revolution Three Sixty"],
    ignoredInterpretations: [],
    createTimeStamp: function(){
        //creates a timeStamp
        let date = new Date();
        return date.getTime();
    },
    createEdge: function(edgeValue, edgeMessage){
        //Creates a list of all edge cases accounted for
        let Edge = {
            id: createKey(),
            value: edgeValue,
            timeStamp: Document.createTimeStamp,
            message: edgeMessage,
        }
        Document.edges.push(Edge);
    },
    errorRecord: function(name, message, location){
        let CustomError = {
            customeMessage: "Error occured at: " + Document.createTimeStamp() + " in " + location + ".",
            errorName: name,
            errorRecord: message,
        }
        Document.errorLog.push(CustomError);
    },
    debugText: function(){
        console.log(this.text);
    },
    debugTextLog: function(){
        console.log(this.textLog);
    },
    debugEventLog: function(){
        console.log(this.eventLog);
    },
    debugError: function(){
        if(Document.errorLog.length > 0){
            Document.errorLog.forEach(function(error){
                console.log(error);
            });
        }else{
            console.log("No errors.");
        }
    },
    bodyDebug: function(){
        console.log(Document.body);
    },
    wordsDebug: function(){
        console.log(Document.words);
        console.log(Document.wordKeys);
    }
}
// TODO: Separate Resolver's functionality from the model
let Resolver = {
      exceptions: [],
      interpretations: [],
      resolveInterpretation: function(word){
          //get user input (replacement)
          //Add to definitions, rerun program
          let interpretAs = document.getElementById("interpretation").value;
          if((interpretAs == null) || (interpretAs.length == 0)){
              //create edge, don't do anything?
          }else{
              return Document.interpretedAs;
          }
      },
      mark: function(item){
          // TODO: Separate mark functions from the model
          //https://markjs.io/
          // Create an instance of mark.js and pass an argument containing
          // the DOM object of the context (where to search for matches)
          var markInstance = new Mark(document.querySelector("#inputTarget"));

          function performMark() {

              // Read the keyword
              var keyword = item;

              // Remove previous marked elements and mark
              // the new keyword inside the context
              markInstance.unmark({
                  done: function(){
                    markInstance.mark(keyword);
                  }
              });
          };
          performMark();
      },
      markMultiple: function(){
      // TODO: Separate from model
      //Adds CSS and listerner to words selected by Resolver exceptions
          var options = {
            "element": "span",
            "className": "marked tool",
            "exclude": [],
            "iframes": false,
            "iframesTimeout": 5000,
            "done": function(){},
            "each": function(node, range){
                node.addEventListener("dblclick", function(){
                    document.getElementById("toInterpret").innerHTML = this.innerHTML;
                    $('#interpretationModal').modal();
                });
            },
            "debug": false,
            "log": window.console
          };
          let instance = new Mark(document.querySelector("#inputTarget"));
          Resolver.exceptions.forEach(function(item){
              instance.mark(item, options);
          });
      },
      askForInterpretation: function(word){
          let index = 0;
          let interpretationToReturn = new Object;
          Document.interpretations.forEach(function(value){
              console.log(value + " + " + word);
              if(value == word){
                  interpretationToReturn.determiner = true;
                  interpretationToReturn.interpretedAs = Document.interpretedAs[index];
                  return interpretationToReturn;
              }else{
                  interpretationToReturn.determiner = false;
              }
              index = index + 1;
          });
          return interpretationToReturn;
      },
      getInterpretation: function(command){
          let toInterpret = document.getElementById("toInterpret").innerHTML;
          let interpretation = document.getElementById("interpretation").value;
          if(command == "ignore"){
              //Then skip this word and don't count it
              // Add to the "unmark list" to have it ignored
              console.log("Ignore: " + toInterpret);
          }if(command == "save"){
              //Then add to definitions and rerun
              console.log("Save '" + toInterpret + "' as '" + interpretation + "'");
              //Add word to interpret to list of interpretations
              Document.interpretations.push(toInterpret);
              //Add actual interpretation of word to interpretAs
              Document.interpretedAs.push(interpretation);
          }
          //Need to set a timeout, display a message and close

          //Need to close out of modal
          $('#interpretationModal').modal('hide');
      },
}

/*==============================================================================
      Decoupler modifies the original text before processing
      Remove any representation that is not just text from an html source
==============================================================================*/
let Decoupler = {
      decoupleInterpretations: function(input){
          /*
            [WARNING INTRODUCES ERROR]
            This function creates a disconnect between the input
            and the abstract representation of the input

            Example: Replacing Revolution360 will increase the abstract's word count
            Revolution360 is one word
            "Revolution three sixty" is three words
            This also affects the syllable per word and syllable count for the sentence
          */

          //This function replaces all intepretations with their 'interpretedAs' replacements
          let index = 0;
          Document.interpretations.forEach(function(interpretation){
              // if an interpretation is found in the body
              // Replace it with the interpretAs variable that matches
              let search = input.search(interpretation);
              if(search != -1){
                  //The match is assumed to exist and it should be replaced
                  //with interpretAs of the same index
                  let regularExpression = new RegExp(interpretation,"g");
                  input = input.replace(regularExpression, Document.interpretedAs[index]);
              }
              //Increment the index variable
              index = index + 1;
          });
          console.log(input);
          //Return modified input with interpretations
          return input;
      },
      decouplerParagraphs: function(input){
          //Usefull for removing IE/Opera insertions
          return input.replace(/<p>/g, "").replace(/<\/div>/g, "");
      },
      decouplerDivs: function(input){
          //Usefull for removing Chrome/Safari insertions
          return input.replace(/<div>/g, "").replace(/<\/div>/g, "");
      },
      decouplerEscapedSpaces: function(input){
          return input.replace(/&nbsp;/g, " ");
      },
      decouplerBreaks: function(input){
          //Usefull for removing FireFox insertions
          return input.replace(/<br>/g, "\n");
      },
      decouplerTrim: function(input){
          return input.replace(/^\s+|\s+$/gm,'');
      },
      decouple: function(target){
          // get the id of the element were getting data from
          let source = document.getElementById("" + target + "").innerHTML;
          //Explicitly type as string
          source = source.toString();
          //Resolve all interpretations
          source = Decoupler.decoupleInterpretations(source);
          //Trim whitespace
          source = Decoupler.decouplerTrim(source);
          //Remove example breaks
          source = Decoupler.decouplerBreaks(source);
          //Remove nbsp
          source = Decoupler.decouplerEscapedSpaces(source);
          //remove divs caused by article
          source = Decoupler.decouplerDivs(source);
          //remove divs caused by article
          source = Decoupler.decouplerParagraphs(source);
          //return filtered innerHTML
          return source;
      },

}

function Record(eventObject, objectData, objectEventType, objectTimeStamp){
    this.recorded = eventObject;
    this.text = objectData;
    this.event = objectEventType;
    this.timeStamp = objectTimeStamp;
}

let Words = {
    globalWords: [],
    words: [],
    wordCount: 0,
    wordLengths: [],
    syllables:[],
    breaths: [],
    reset: function(){
        // Set all global data to empty
        this.globalWords = [];
        this.words = [];
        this.wordCount = 0;
        this.wordLengths = [];
        this.syllables = [];
        this.breaths = [];
    },
    checkWordValidity: function (word){
        let areNumbers = word.match(/\d+/g);
        if(areNumbers != null){
            Document.errorRecord("TypeError", "Word contains a number.", "processWords()");
            return false;
        }else{
            return true;
        }
        //Remove word from sentence and write an error log globally and locally
    },
    checkForInterpretation: function(word){
        /*
        let wordInterpreted = word;
        let interpretation = Resolver.askForInterpretation(word);
        if(interpretation.determiner == true){
            wordInterpreted = interpretation.interpretedAs;
        }
        */
    },
    processWords: function(sentence, caller){
        //remove all non-word characters
        sentence = sentence.replace(/[\W_]+/g," ");
        //Split words from sentence by spaces
        let words = sentence.split(" ");
        //Define a new Word Bank
        let Bank = new Object;
        //Initailize empty arrays for word lengths, how many, and the words themselves
        Bank.lengths = [];
        Bank.count = 0;
        Bank.words = [];
        Bank.syllables = [];
        Bank.breaths = [];
        //Initialize a wordCount variable
        let wordCount = 0;
        //For each of the words generated by the split
        words.forEach(function(word){
                //Continue if normal
                if(Words.checkWordValidity(word) == true){
                    if(word.length > 0){

                        wordCount = wordCount + 1;
                        let syllableCount = getSyllableCount(word);
                        Bank.syllables.push(syllableCount);
                        //Add a copy of the word in the word Bank
                        Bank.words.push(word);
                        //Add word lengths to the word Bank
                        Bank.lengths.push(word.length);
                        //Create breath unit variable
                        let breath = (word.length/syllableCount).toFixed(2);
                        //Add breath units to word Bank
                        Bank.breaths.push(breath);
                        //Add syllable counts to global Words
                        Words.syllables.push(syllableCount);
                        //Add word to the global Words
                        Words.globalWords.push(word);
                        //Add length to the global Words
                        Words.wordLengths.push(word.length);
                        //Add breath unit to global Words
                        Words.breaths.push(breath);
                        //Push word into Document word bank
                        if(caller == "sentence"){
                            //Push words to Document word bank
                            Document.words.push(word);
                            //Push reference key to word
                            Document.wordKeys.push(createKey());
                        }
                    }else{
                        //Creates and edge case for word filtering, should output spaces and whitespace.
                        if(caller == "sentence"){
                            Document.createEdge(word, "Created during word filtering.");
                        }
                    }
                //Do not add word to word bank, putword in special case bank
                }else{
                    if(caller == "sentence"){
                        // There's still a word here, so it counts, but can't be processed
                        wordCount = wordCount + 1;
                        // we still want to keep track of the exceptions
                        Resolver.exceptions.push(word);
                    }
                }
        });
        //Add the number of words to the Bank
        Bank.count = wordCount;
        //Push copy of word bank into global word bank
        Words.wordCount = wordCount;
        //Return Bank to Sentences
        return Bank;
    },
}

let Sentences = {
    sentences: [],
    sentenceCount: 0,
    fragmentCount: 0,
    reset: function(){
        // Set all global data to empty
        this.sentences = [];
        this.sentenceCount = 0;
        this.fragmentCount = 0;
    },
    splitFragments: function(sentence){
        //Create a copy of sentence to filter common punctuation for fragments
        let mutableSentence = sentence;
        //replace commas with tag
        mutableSentence = mutableSentence.replace(/\,/g, "$*");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\(/g, "$*");
        //replace parethesis with tag
        mutableSentence = mutableSentence.replace(/\)/g, "$*");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\[/g, "$*");
        //replace brackets with tag
        mutableSentence = mutableSentence.replace(/\]/g, "$*");
        //replace colon with tag
        mutableSentence = mutableSentence.replace(/\:/g, "$*");
        //replace semicolon with tag
        mutableSentence = mutableSentence.replace(/\;/g, "$*");
        //return array of fragments
        return mutableSentence.split("$*");
    },
    splitPunctuation: function(paragraph){
        //Remove some simple cases of punctuation
        paragraph = paragraph.replace("!", ".");
        paragraph = paragraph.replace("?", ".");
        paragraph = paragraph.replace("...", ".");
        //Remove apostrophes (’) and replace with nothing to preserve words
        paragraph = paragraph.replace(/’/g,"");
        //Split paragraph by "SPACE + ." pairs
        //return sentences without punctuations or apostrophes
        return paragraph.split(". ");;
    },
    process: function(paragraph){
        //Reset global sentence storage
        Sentences.reset();
        //Initialize empty variable to store sentences in each pararaph
        let paragraphSentences = [];
        //remove common punctuation and split sentence by ". " pairs
        let sentences = Sentences.splitPunctuation(paragraph);
        //For each sentence, remove any edge cases and push to larger object
        sentences.forEach(function(sentence){
            //Make random spaces filter out
            if(sentence.length > 0){
                //Increment the sentenceCount variable
                Sentences.sentenceCount = Sentences.sentenceCount + 1;
                //create Sentence Object to save in sentences array of Sentences Object
                let Sentence = new Object;
                //Add an empty string of sentence to Sentence Object
                Sentence.sentence = "";
                //Push current sentence into into sentence object
                Sentence.sentence = sentence;
                //get word data for sentence
                Sentence.words = Words.processWords(sentence, "sentence");
                //Add an empty array for fragments
                Sentence.fragments = [];
                //Initialize the fragment count at 0
                Sentence.fragmentCount = 0;
                //Create a variable from sentence split by in-sentence punctuation
                let fragments = Sentences.splitFragments(sentence);
                //Filter out the empty fragments casused by splitting
                fragments.forEach(function(fragment){
                    if(fragment.length > 0){
                        //Increase the count of total fragments
                        Sentence.fragmentCount = Sentence.fragmentCount + 1;
                        //save the "Word" object to a variable
                        let fragmentWordObject = Words.processWords(fragment, "fragment");
                        //Add original fragment to the Word object
                        fragmentWordObject.original = fragment;
                        //Set fragments to Sentence Object
                        Sentence.fragments.push(fragmentWordObject);
                    }else{
                        Document.createEdge(fragment, "Created during fragment filtering.");
                    }
                });

                //Save a copy to the sentences object
                Sentences.sentences.push(Sentence);
                //Save a copy to return to paragraph
                paragraphSentences.push(Sentence);
            }else{
                // Creates edge case for sentences, should output spaces and whitespace
                Document.createEdge(sentence, "Created during sentence filtering.");
            }
        });
        return paragraphSentences;
    },
    filterHonora: function(paragraph){
        // TODO: This can probably be handled by a library, but it's still necessary
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
              //Edge function not placed here because the edge results would not be useful
        });
        return mutableParagraph;
    },
}

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
        Paragraphs.reset();
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
                let splitSentences = Sentences.process(paragraph);
                //Create Paragraph object to store sentences
                let Paragraph = new Object;
                //Set original text to Paragraph object
                Paragraph.originText = paragraph;
                //Set split sentences with honora replaced in Paragraph Object
                Paragraph.sentences = splitSentences;
                //push Paragraph object into paragraphs array of Paragraphs object
                Paragraphs.paragraphs.push(Paragraph);
            }else{
                //Records edge cases for paragraph creation, result should be return carriages
                Document.createEdge(paragraph, "Created during paragraph filtering.");
            }
        });
        //Update the paragraph count
        this.count = paragraphCount;
        Document.body = Paragraphs.paragraphs;
    },
};

// TODO: ensure Observer is only local
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
        //Edge not created here because data would not be useful
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

// TODO: Ensire that mediator never makes it to the main function
let Mediator = {
    update: function(element){
        // get the id of the element were getting data from
        let src = document.getElementById("" + element + "");
        //Only update the current state of chars
        //Keep values of textLog
        Document.text = src.innerHTML.split("");
    },
    handleNewPaste: function(event){
        // Get pasted data via clipboard API
        let clipboardData = event.clipboardData || window.clipboardData;
        let pastedData = clipboardData.getData('Text');
        //split data into characters
        let splitData = pastedData.split("");
        //Add a new record into observer
        let newRecord = new Record(event, splitData, "pasted", event.timeStamp);
        Observer.observe(newRecord);
        //http://jsfiddle.net/SJR3H/7/
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

//DOM Interactions calls the first instance of Readar
function domInteraction(target){
      let decoupledSource = Decoupler.decouple(target);
      Paragraphs.process(decoupledSource);
      /*
        [WARNING THE INTERPETATIOn from decoupledSource is not even working]
      */
      Document.bodyDebug();
      /*
        [WARNING ABSTRACTION HAS INTERPETATIONS NOT THE SOURCE]
        The mark.io functions in Resolver complicate processing
      */
      if(Resolver.exceptions.length > 0){
          Resolver.markMultiple();
      }

}





/*
To dos
- Impliment timestamps throughout objects to track processing speed
- Add Qwerty and Dvorac options to the typing Characteristics
- Make keys on typing characteristics respond when keypress event happens, but only when visible
- Use observer to calculate typing speed
- Use observer and document.textlog to give typing statistics

*/

/*
highlighting syntax
https://markjs.io/
*/
