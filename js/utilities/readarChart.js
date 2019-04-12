function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


/**=============================================================================
          Chart.JS prescribed method to remove data from graph
=============================================================================**/
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function breathGraph(breaths){
    var ctx2 = document.getElementById('breathChart').getContext('2d');
    var breathChart = new Chart(ctx2, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Breath Units Per Sentence',
              data: [breaths],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
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
    removeData(breathChart);
    for (var i = 0; i < breaths.length; i++) {
        addData(breathChart, i, breaths[i]);
    }
}

function sylGraph(syllables){
    var ctx1 = document.getElementById('sylChart').getContext('2d');
    var sylChart = new Chart(ctx1, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Syllables Per Sentence',
              data: [syllables],
              backgroundColor: [
                  'rgba(54, 162, 184, 0.2)',
              ],
              borderColor: [
                  'rgba(54, 162, 184, 1)',
              ],
              borderWidth: 1
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
    removeData(sylChart);
    for (var i = 0; i < syllables.length; i++) {
        addData(sylChart, i, syllables[i]);
    }
}

function wordGraph(words){
    var ctx0 = document.getElementById('wordChart').getContext('2d');
    var wordChart = new Chart(ctx0, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Words Per Sentence',
              data: [words],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.4)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1
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
    removeData(wordChart);
    for (var i = 0; i < words.length; i++) {
        addData(wordChart, i, words[i]);
    }
}

function bodyGraph(words, syllables, breaths){
      var ctx3 = document.getElementById('bodyChart').getContext('2d');
      var bodyChart = new Chart(ctx3, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Words',
                data: [words],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.4)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }, {
                label: 'Syllables',
                data: [syllables],
                backgroundColor: [
                    'rgba(54, 162, 184, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 184, 1)',
                ],
                borderWidth: 1
            }, {
                label: 'Breaths Per Sentence',
                data: [breaths],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.4)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
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
      bodyChart.update();
}

function getDataReady(body){
      let sumWords = [];
      let sumSyllables = [];
      let sumBreaths = [];
      for (var i = 0; i < body.sentences.length; i++) {
          sumWords[i] = body.sentences[i].sumWords;
          sumSyllables[i] = body.sentences[i].sumSyllables;
          sumBreaths[i] = body.sentences[i].breath;
      }
      wordGraph(sumWords);
      sylGraph(sumSyllables);
      breathGraph(sumBreaths);
      bodyGraph(sumWords, sumSyllables, sumBreaths);
}
