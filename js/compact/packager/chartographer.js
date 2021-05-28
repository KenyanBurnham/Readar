/*==============================================================================
      Chartographer, this will be a DOM function
==============================================================================*/

let Chartographer = {
    spanToSort: [],
    breathsGlobal: [],
    storedGradient: [],
    reset: function(){
      //this will reset the chartographer object after assign
      //clear breaths global and spanToSort
      this.spanToSort.splice(0, this.spanToSort.length);
      this.breathsGlobal.splice(0, this.breathsGlobal.length);
    },
    gradient: function(spanNumber){
        let gradientBlue;
        let gradientTeal;
        //check whether the number of span-covered sentences are even
        if(Ariths.isEven(spanNumber) == true){
            //make an even gradient between the two colors
            gradientBlue = generateColor('#000000','#007bff', (spanNumber)/2);
            gradientTeal = generateColor('#00A6A6','#000000', (spanNumber)/2);
        } else if (Ariths.isEven(spanNumber) == false) {
            gradientBlue = generateColor('#000000','#007bff', Math.floor(spanNumber)/2);
            gradientTeal = generateColor('#00A6A6','#000000', Math.floor(spanNumber)/2);
            gradientTeal.push("#000000");
        }
        //push the gradient together
        for (var j = 0; j < gradientTeal.length; j++) {
            //add the teal graident to the blue one
            gradientBlue.push(gradientTeal[j]);
        }
        //splice the whole array until empty
        this.storedGradient.splice(0, this.storedGradient.length);
        //then add the new gradient
        this.storedGradient = gradientBlue;
        // then return this gradient to the function that called it
        return gradientBlue;
    },
    gradientMount: function(gradient){
        //clear tr
        let tr = document.getElementById("visualKeyTable");
        //remove all child nodes (td)
        while (tr.hasChildNodes()) {
            tr.removeChild(tr.firstChild);
        }
        // add td elements the size of the gradient
        for (var i = 0; i < gradient.length; i++) {
            let td = document.createElement("td");
            //give the child a gradient color
            td.style.background = "#" + gradient[i] + "";
            let space = document.createTextNode(" ");
            td.appendChild(space);
            //add the new child node
            tr.appendChild(td);
        }
        //indicates sentences that are very dense
        let dense = document.createTextNode("-");
        //indicates sentences that are too light
        let lessDense = document.createTextNode("+");
        tr.firstChild.appendChild(dense);
        tr.lastChild.appendChild(lessDense);
        console.log(tr.hasChildNodes());
    },
    assign: function(){
        //this is where the gradient will be assigned
        let gradient = this.gradient(this.spanToSort.length);
        //assign gradient to the text
        for (var i = 0; i < this.spanToSort.length; i++) {
            let span = document.getElementById(this.spanToSort[i].identity);
            try {
                span.style.color = "#" + gradient[i] + "";
                span.setAttribute("data-percentile", "" + this.spanToSort[i].percentile.toFixed(2) + "");
            } catch (e) {
                let message = "In Chartographer.assign(), " + e + " which happened with: " + this.spanToSort[i].identity + "";
                Debugger.submitErrorReport(message);
            }

        }
        this.gradientMount(gradient);
    },
    sort: function(){
        //this sorts the spans into the highest and lowest breath unit
        // this array will sort in descending order (first is highest)
        this.spanToSort.sort((a,b) =>(a.percentile < b.percentile) ? 1 : -1);
        this.assign();
        //A problem I forsee is that if there are equivalent percentage values
        // although unlikely, this could cause issues
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
