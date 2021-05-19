/*==============================================================================
      Provides mathematical methods
==============================================================================*/
let Ariths = {
    maxima: function(dataset){
        let local = [];
        for (var i = 0; i < dataset.length; i++) {
          local[i] = Number(dataset[i]);
        }
        return Math.max(...local);
    },
    minima: function(dataset){
        let local = [];
        for (var i = 0; i < dataset.length; i++) {
          local[i] = Number(dataset[i]);
        }
        return Math.min(...local);
    },
    median: function(dataset){
        let targetSorted = dataset.sort((a, b) => a - b);
        let lowMiddle = Math.floor((dataset.length - 1) / 2);
        let highMiddle = Math.ceil((dataset.length - 1) / 2);
        let median = (Number(targetSorted[lowMiddle]) + Number(targetSorted[highMiddle])) / 2;
        return median;
    },
    average: function(dataset){
        let sum = 0;
        for(let i = 0; i < dataset.length; i++){
            sum = sum + Number(dataset[i]);
        }
        let average = (sum/dataset.length);
        return average;
    },
    deviation: function(dataset){
        let average = this.average(dataset);
        let avgDev = [];
        for (var i = 0; i < dataset.length; i++) {
            avgDev[i] = Math.pow(Math.abs(average - Number(dataset[i])), 2);
        }
        let avgDeviation = this.average(avgDev);
        let standardDeviation = Math.sqrt(avgDeviation);
        return standardDeviation;
    },
    z: function(observation, mean, sigma){
        let z = (observation - mean)/sigma;
        return z;
    },
    p: function(z){
          /* This function is borrowed from:
            Source: https://stackoverflow.com/questions/16194730/seeking-a-statistical-javascript-function-to-return-p-value-from-a-z-score
            To clarify since this offers no explanation/citation whatsoever:
            this is based on a Taylor expansion of the integral of the normal
            standard distribution: math2.org/math/stat/distributions/z-dist.htm
            - the ambiguity of the operator precedence on the term =  line makes
            this very difficult to read. – Shane Hughes Dec 18 '18 at 17:25

          */
          //z == number of standard deviations from the mean

          //if z is greater than 6.5 standard deviations from the mean
          //the number of significant digits will be outside of a reasonable
          //range
          if ( z < -6.5)
            return 0.0;
          if( z > 6.5)
            return 1.0;

          var factK = 1;
          var sum = 0;
          var term = 1;
          var k = 0;
          var loopStop = Math.exp(-23);
          while(Math.abs(term) > loopStop)
          {
            term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
            sum += term;
            k++;
            factK *= k;

          }
          sum += 0.5;

          return sum;
    }
}
