/*==============================================================================
      Chartographer
==============================================================================*/

let Chartographer = {
    spanToSort: [],
    breathsGlobal: [],
    reset: function(){
      //this will reset the chartographer object after assign
      //clear breaths global and spanToSort
      this.spanToSort.splice(0, this.spanToSort.length);
      this.breathsGlobal.splice(0, this.breathsGlobal.length);
    },
    assign: function(spansInOrder, percentileInOrder){
        //this is where the gradient will be assigned
        let gradient = generateColor('#000000','#007bff', spansInOrder.length);
        //assign gradient to the text
        for (var i = 0; i < spansInOrder.length; i++) {
            let span = document.getElementById(spansInOrder[i]);
            try {
                span.style.color = "#" + gradient[i] + "";
                span.setAttribute("data-percentile", "" + percentileInOrder[i].toFixed(2) + "");
            } catch (e) {
                console.log("The error is: " + e);
                console.log("It happened at: " + spansInOrder[i]);
            }

        }
    },
    sort: function(){
        let spansInOrder = [];
        let percentileInOrder = [];
        //this sorts the spans into the highest and lowest breath unit
        // this array will sort in descending order (first is highest)
        let sortedArray = this.breathsGlobal.sort(function(a,b){return b-a});
        for (var j = 0; j < this.breathsGlobal.length; j++) {
            for (var i = 0; i < this.spanToSort.length; i++) {
                if ((this.spanToSort[i].breathAverage) == (this.breathsGlobal[j])) {
                    //push the correspinding span identity if it matches the highest
                    //to low order
                    spansInOrder.push(this.spanToSort[i].identity);
                    percentileInOrder.push(this.spanToSort[i].percentile);
                }
            }
        }
        this.assign(spansInOrder, percentileInOrder);
    },
    calculate: function(){
        //starts the process
        let mean = Ariths.average(this.breathsGlobal);
        let sigma = Ariths.deviation(this.breathsGlobal);
        for (var i = 0; i < this.spanToSort.length; i++) {
          //for each span to sort calculate it's p value
          let observation = this.spanToSort[i].breathAverage;
          let z = Ariths.z(observation, mean, sigma);
          let p = Ariths.p(z);
          this.spanToSort[i].percentile = p;
        }
        this.sort();
    },
    initiate: function(){
        //reset all the variables in case of concurrent use
        this.reset();
        //need to assign the breath unit for the sentence to the span
        let body = Document.body;
        for (var i = 0; i < body.length; i++) {
            //Each paragraph
            let paragraph = body[i];
            for (var j = 0; j < paragraph.sentences.length; j++) {
              //each sentence
              let sentence = paragraph.sentences[j];
              let SpanToSort = {
                  breathAverage: Ariths.average(sentence.words.breaths),
                  identity: sentence.spanIdentity,
                  percentile: 0,
              };
              this.spanToSort.push(SpanToSort);
              this.breathsGlobal.push(Ariths.average(sentence.words.breaths));
            }
            //after all sentences have been processed calculate the p values for all spans
            this.calculate();
        }


        //KEY
        //body[whichParagraph].sentences[whichSentence].words.breaths[whichBreaths]
        //body[whichParagraph].sentences[whichSentence].words.count;
        //body[whichParagraph].sentences[whichSentence].words.lengths[whichLengths]
        //body[whichParagraph].sentences[whichSentence].words.syllables[whichSylls]
        //body[whichParagraph].sentences[whichSentence].words.words[whichWords]
        //console.log(body[0].originText);
        //console.log(body[1].originText);
        //console.log(Document.state[0]);
    },

};
