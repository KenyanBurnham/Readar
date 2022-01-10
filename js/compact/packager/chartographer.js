/*==============================================================================
      Chartographer, this will be a DOM function
==============================================================================*/

let Chartographer = {
    spanToSort: [],
    breathsGlobal: [],
    storedGradient: [],
    gradientSetting: ["#007bff", "#00A6A6", "000000"],
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
            //need to push the transition color first
            gradientBlue.push(transitionColor);
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
    canvasGradient: function(gradient, instructions, percent){
        //this is for the new density key
        let container = document.getElementById("canvasContainer");
        //need to remove the children in here
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        let newCanvas = document.createElement("canvas");
        newCanvas.setAttribute("id", "keyCanvas");
        newCanvas.setAttribute("width", "" + container.clientWidth + "");
        newCanvas.setAttribute("height", "" + container.clientHeight + "");
        container.append(newCanvas);
        let canvas = document.getElementById('keyCanvas');
        let ctx = canvas.getContext("2d");
        //this ensures that no matter the size of the gradient that it is evenly distributed
        let colorStopFrequency = (1/gradient.length);
        // Create gradient
        //createLinearGradient(x,y,x1,y1)
        var grd = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);

        for (var i = 0; i < gradient.length; i++) {
            if(gradient[i].search(/#/g) == -1){
                grd.addColorStop((i*colorStopFrequency), "#" + gradient[i] + "");
            } else{
                grd.addColorStop((i*colorStopFrequency), "" + gradient[i] + "");
            }
        }

        /**
          original source code is at
          https://www.kirupa.com/canvas/follow_mouse_cursor.htm
        **/

        function getPosition(el) {
          var xPosition = 0;
          var yPosition = 0;

          while (el) {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
          }
          return {
            x: xPosition,
            y: yPosition
          };
        }

        var canvasPos = getPosition(canvas);
        var mouseX = 0;
        var mouseY = 0;

        function setMousePosition(e) {
          mouseX = e.clientX - canvasPos.x;
          mouseY = e.clientY - canvasPos.y;
        }

        canvas.addEventListener("mousemove", setMousePosition, false);

        function setMousePosition(e) {
          mouseX = e.clientX - canvasPos.x;
          mouseY = e.clientY - canvasPos.y;
        }

        function getPosition(el) {
          var xPosition = 0;
          var yPosition = 0;

          while (el) {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            el = el.offsetParent;
          }
          return {
            x: xPosition,
            y: yPosition
          };
        }

        switch (instructions) {
          case "map":
                //this is generated the first time the density display is called
                function update() {
                    // Fill with gradient
                    ctx.fillStyle = grd;
                    //fillRect(x,y,width,height)
                    ctx.fillRect(0, 0, canvas.clientWidth, 50);
                    ctx.beginPath();
                    ctx.moveTo(mouseX, 0);
                    ctx.lineTo(mouseX, 100);
                    ctx.strokeStyle = "#FFFFFF";
                    if ((colorStopFrequency*100)< 3) {
                        ctx.lineWidth = 3;
                    } else {
                        ctx.lineWidth = (canvas.width)/Chartographer.spanToSort.length;
                    }
                    ctx.stroke();
                    requestAnimationFrame(update);
                }
                update();
                // TODO: fix this exit animation
                //curently does not work
                canvas.addEventListener("mouseout", function(){
                    Chartographer.canvasGradient(gradient, "map");
                });
            break;
          case "reference":
              //this is used when the user uses a sentence to figure out the density
              //this is generated the first time the density display is called
              function reupdate() {
                  //this is the
                  let position = (canvas.width)*(1-percent);
                  // Fill with gradient
                  ctx.fillStyle = grd;
                  //fillRect(x,y,width,height)
                  ctx.fillRect(0, 0, canvas.clientWidth, 50);
                  ctx.beginPath();
                  if (position > 3) {
                      ctx.moveTo(position, 0);
                      ctx.lineTo(position, 100);
                  } if (position == canvas.clientWidth) {
                      ctx.moveTo((position-1), 0);
                      ctx.lineTo((position-1), 100);
                  }
                  else {
                      ctx.moveTo(3, 0);
                      ctx.lineTo(3, 100);
                  }
                  ctx.strokeStyle = "#FFFFFF";
                  if ((colorStopFrequency*100)< 3) {
                      ctx.lineWidth = 3;
                  } else {
                      ctx.lineWidth = (canvas.width)/Chartographer.spanToSort.length;
                  }
                  ctx.stroke();
                  requestAnimationFrame(reupdate);
              }
              reupdate();
              setTimeout(function(){
                  Chartographer.canvasGradient(gradient, "map");
              },2500);
          break;
        }

        //this adds a listerner that makes sure that when the canvas is clicked
        //the sentence that matches the spectrum is revealed
        //I'm thinking about leaving this active, even when the display is hidden
        canvas.addEventListener("click", function(){
            let currentPosition = mouseX;
            //the number of pixels per sentence;
            let divisions = (canvas.width)/Chartographer.spanToSort.length;
            //for each sentence
            for (var l = 0; l < Chartographer.spanToSort.length; l++) {
                let leftBoundary = ((l * divisions));
                let rightBoundary = ((l * divisions) + divisions);
                if ((mouseX >= leftBoundary) && (mouseX <= rightBoundary)) {
                    let spanToHighlight = document.getElementById("" + Chartographer.spanToSort[l].identity + "");
                    let spanColor = spanToHighlight.getAttribute("data-color")
                    console.log(spanToHighlight.getAttribute("data-color"));

                    spanToHighlight.style.removeProperty('background-color');
                    spanToHighlight.style.removeProperty('color');
                    spanToHighlight.setAttribute("style", "background-color: #" + spanColor + "; color: white;");
                    setTimeout(function(){
                        spanToHighlight.style.removeProperty('background-color');
                        spanToHighlight.style.removeProperty('color');
                        spanToHighlight.setAttribute("style", "background-color: white; color: #" + spanColor + ";");
                    },3000);
                }
            }
        });

    },
    gradientMount: function(gradient){

        Chartographer.canvasGradient(gradient, "map");
        for (var k = 0; k < Chartographer.spanToSort.length; k++) {
            let span = document.getElementById("" + Chartographer.spanToSort[k].identity + "");
            span.setAttribute("data-color", "" + gradient[k] + "");
            span.addEventListener("click", function(){
                let percent = span.getAttribute("data-percentile");
                Chartographer.canvasGradient(gradient, "reference", percent);
            });
        }
        //This decides whether the density display should be on
        View.setDisplaySettings();
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
        // This feature is not accurate in the slightest bit
        // TODO: Clean up this function so that the results are more accurate
        //check to determine that there will be a cange at all
        let newGradient = [];
        if (percentageToShow != 100) {
            //console.log("show: " + percentageToShow + ", exclude: " + difference);
            //console.log("length: " + gradient.length + ", percentage to exclude: " + difference + "");
            let numberOfExcluded = Math.round(difference * gradient.length);
            let middleIndexPre = Math.round(gradient.length/2);
            let middleIndexPost = Math.round(gradient.length/2) - 1;
            let leftExclusionIndex = middleIndexPost - Math.round(numberOfExcluded/2);
            let rightExclusionIndex = middleIndexPost + Math.round(numberOfExcluded/2);
            //console.log("left: " + leftExclusionIndex + ", middle: " + middleIndexPost  + ", actual middle:" + middleIndexPre +", right: " + rightExclusionIndex + "");
            //get the neutral color from chartographer
            let neutralColor = this.gradientSetting[2];
            for (var j = 0; j < gradient.length; j++) {
              if ((j >= leftExclusionIndex) && (j<= rightExclusionIndex)) {
                  newGradient.push(neutralColor);
              } else {
                  newGradient.push(gradient[j]);
              }
            }
            // this ensures that at least the first and last gradient percentile
            // is shown since it wouldn't make sense otherwise
            newGradient[0] = gradient[0];
            newGradient[(gradient.length - 1)] = gradient[gradient.length - 1];
            console.log(newGradient);
        }
        /**
          Everything before this line is added to apply custom settings
        **/
        //assigns the altered gradient
        if (newGradient.length > 0) {
            for (var i = 0; i < this.spanToSort.length; i++) {
                try {
                    let identity = this.spanToSort[i].identity;
                    let span = document.getElementById(identity);
                    span.classList.add("key-span");
                    span.style.color = "#" + newGradient[i] + "";
                    //for some reason there is a mismatch between the color in
                    //the text and the lowest value color on the density key
                    span.setAttribute("data-percentile", "" + this.spanToSort[i].percentile.toFixed(2) + "");
                } catch (e) {
                    let message = "In Chartographer.assign(), " + e + " which happened with: " + this.spanToSort[i].identity + "";
                    Debugger.submitErrorReport(message);
                }
            }
            this.gradientMount(newGradient);
        } //assigns the altered gradient
        else {
            for (var i = 0; i < this.spanToSort.length; i++) {
                try {
                    let identity = this.spanToSort[i].identity;
                    let span = document.getElementById(identity);
                    span.style.color = "#" + gradient[i] + "";
                    span.setAttribute("data-percentile", "" + this.spanToSort[i].percentile.toFixed(2) + "");
                } catch (e) {
                    let message = "In Chartographer.assign(), " + e + " which happened with: " + this.spanToSort[i].identity + "";
                    Debugger.submitErrorReport(message);
                }
            }
            this.gradientMount(gradient);
        }
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
