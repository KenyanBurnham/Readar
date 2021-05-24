/*==============================================================================
      Chartographer
==============================================================================*/

let Chartographer = {
    assign: function(){
        //this is where the gradient will be assigned
        let positiveGradient = generateColor('#000000','#00A6A6', this.packagedSpans.length);
        let negativeGradient = generateColor('#000000','#007bff', this.packagedSpans.length);

        for (var i = 0; i < this.packagedSpans.length; i++) {
          //console.log(positiveGradient[i]);
          document.getElementById(this.packagedSpans[i]).style.color = "#" + positiveGradient[i] + "";
        }
    },
    initiate: function(){
        //starts the process
        let mean = Document.averageBreath;
        let observation = Document.breaths[0];
        let sigma = Ariths.deviation(Document.breaths);
        let z = Ariths.z(observation, mean, sigma);
        let p = Ariths.p(z);
        console.log("mU: " + mean + ", x: " + observation + ", sig: " + sigma + ", z: " + z + ", p: " + p);

        //need to assign the breath unit for the sentence to the span
        let body = Document.body;
        //console.log(body);
        for (var i = 0; i < body.length; i++) {
            //By paragraph
            //console.log(body[i]);
            let paragraph = body[i];
            for (var j = 0; j < paragraph.length; j++) {
                //By sentences
                let sentences = paragraph[j];
                console.log("paragraph: " + j);
                for (var k = 0; k < sentences.length; k++) {
                    //By sentence
                    console.log("sentence: " + k);
                    console.log(sentences[k]);
                }
            }
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
