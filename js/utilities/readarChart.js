
function updateBreathUnitChart(chart, breaths){
    for (let i = 0; i < breaths.length; i++) {
        chart.data.datasets[0].data[i] = breaths[i];
        chart.update();
    }

}

function updateSyllableChart(chart, syllables){
    for (let i = 0; i < syllables.length; i++) {
        chart.data.datasets[0].data[i] = syllables[i];
        chart.update();
    }

}

function updateWordChart(chart, words){
    for (let i = 0; i < words.length; i++) {
        chart.data.labels[i] = "" + (i+1).toString() + "";
        chart.data.datasets[0].data[i] = words[i];
        chart.update();
    }

}

function updateReadarChart(myChart, words, syllables, breaths){
    console.log("inside reader chart");
    updateWordChart(myChart, words);
    console.log("outside word part");
    updateSyllableChart(myChart, syllables);
    console.log("outside syllable part");
    updateBreathUnitChart(myChart, breaths);
    console.log("Finished");
}

function initalizeReadarChart(words, syllables, breaths){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Sentence 1', '2', '3', '4', '5', '6'],
          datasets: [{
              label: 'Words',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          },{
              label: 'Syllables',
              data: [14, 22, 6, 8, 5, 6],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
          },{
            label: 'Breath Units',
            data: [6, 15, 2, 5],
            // Changes this dataset to become a line
            type: 'line'
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
    });
    //Then update with new information
    console.log("updatereaderChart");
    updateReadarChart(myChart, words, syllables, breaths);
}
