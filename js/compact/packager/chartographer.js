/*==============================================================================
      Chartographer, this will be a DOM function
==============================================================================*/

let Chartographer = {
    spanToSort: [],
    breathsGlobal: [],
    storedGradient: [],
    gradientSetting: ["#007bff", "00A6A6", "#000000"],
    reset: function(){
      //this will reset the chartographer object after assign
      //clear breaths global and spanToSort
      this.spanToSort.splice(0, this.spanToSort.length);
      this.breathsGlobal.splice(0, this.breathsGlobal.length);
      //splice the whole array until empty
      this.storedGradient.splice(0, this.storedGradient.length);
    },
    gradient: function(spanNumber){
        //don't mind the language used in this function, the "teal" and "blue"
        //is all just dummy variables to pass values
        let gradientBlue;
        let gradientTeal;
        let leftColor = this.gradientSetting[0];
        let rightColor = this.gradientSetting[1];
        let transitionColor = this.gradientSetting[2];
        //check whether the number of span-covered sentences are even
        if(Ariths.isEven(spanNumber) == true){
            //make an even gradient between the two colors
            gradientBlue = generateColor(transitionColor,leftColor, (spanNumber)/2);
            gradientTeal = generateColor(rightColor,transitionColor, (spanNumber)/2);
        } else if (Ariths.isEven(spanNumber) == false) {
            gradientBlue = generateColor(transitionColor,leftColor, Math.floor(spanNumber)/2);
            gradientTeal = generateColor(rightColor,transitionColor, Math.floor(spanNumber)/2);
            gradientTeal.push(transitionColor);
        }
        //push the gradient together
        for (var j = 0; j < gradientTeal.length; j++) {
            //add the teal graident to the blue one
            gradientBlue.push(gradientTeal[j]);
        }
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
    },
    assign: function(){
        //this is where the gradient will be assigned
        let gradient = this.gradient(this.spanToSort.length);

        //now to check the settings to see what a good percentage is
        //get the current value in the settings
        //somehow limit which spans get gradients applied to them
        //I could just mess with the gradient to do it
        let gradientSettings = document.getElementById("gradientDensitySelect");
        //this is the percentage I want to show
        let percentageToShow = gradientSettings.value;
        //this is the percentage I don't want to show
        let difference = (100 - percentageToShow)*.01;
        console.log("length: " + gradient.length + ", percentage to exclude: " + difference + "");
        let numberOfExcluded = Math.round(difference * gradient.length);
        let newGradient = [];
        //if odOrEven is true then it is even
        let gradientOddOrEven = (gradient.length % 2  == 0);
        let excludedOddOrEven = (numberOfExcluded.length % 2  == 0);
        //console.log("Odd or even?: " + oddOrEven + "");

        //if ((gradientOddOrEven == true) && ()) {
            //then we must treat everything using even rules
            //let evenLeftExclusionIndex = numberOfExcluded - 1;
            //let evenRightExclusionIndex = gradient.length - numberOfExcluded - 1;
        //}
        //if (gradientOddOrEven == false) {
            //then we must treat everything using odd rules
            //let padding = Math.round((gradient.length - numberOfExcluded)/2);
      //  }


        //console.log("padding: " + padding + "");
        //for (var j = 0; j < gradient.length; j++) {}

        /**
          Everything before this line is added to apply custom settings
        **/
        //assign gradient to the text
        for (var i = 0; i < this.spanToSort.length; i++) {
            try {
                let identity = this.spanToSort[i].identity;
                let span = document.getElementById(identity);
        console.log(span);
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
    },
    initiate: function(){
        //reset all the variables in case of concurrent use
        this.reset();
        //ensure that the state is up-to-date
        Document.updateDataState('inputTarget');
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

        this.sort();
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
