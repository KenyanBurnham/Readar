function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

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
              label: 'Breath Units',
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
        addData(breathChart, "Sentence " + i, breaths[i]);
    }
}

function sylGraph(syllables){
    var ctx1 = document.getElementById('sylChart').getContext('2d');
    var sylChart = new Chart(ctx1, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Syllables',
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
        addData(sylChart, "Sentence " + i, syllables[i]);
    }
}

function wordGraph(words){
    var ctx0 = document.getElementById('wordChart').getContext('2d');
    var wordChart = new Chart(ctx0, {
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
        addData(wordChart, "Sentence " + i, words[i]);
    }
}

function getDataReady(words, syllables, breaths){
      console.log(words);
      wordGraph(words);
      console.log(syllables);
      sylGraph(syllables);
      console.log(breaths);
      breathGraph(breaths);

}
