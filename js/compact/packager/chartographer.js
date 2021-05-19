/*==============================================================================
      Chartographer
==============================================================================*/

let Chartographer = {
    assign: function(){

    },
    initiate: function(){
        //starts the process
        let mean = Document.averageBreath;
        let observation = Document.breaths[0];
        let sigma = Ariths.deviation(Document.breaths);
        let z = Ariths.z(observation, mean, sigma);
        let p = Ariths.p(z);
        //console.log("mU: " + mean + ", x: " + observation + ", sig: " + sigma + ", z: " + z + ", p: " + p);

    },

};
