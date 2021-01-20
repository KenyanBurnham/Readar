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
    }
}
