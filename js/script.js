
(($) => {
  var ctx = $('#graph').getContext('2d');
  var table = $('#metadata');
  let chart = null;

  const config = {
    type: 'line',
    data: {
      datasets: []
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax: 20,
            stepSize: 1
          },
          stacked: true,
          major: {
            enabled: true
          }
        }]
      },
      aspectRatio: 3
    }
  }

  const templateSets = [{
    backgroundColor: 'hsl(120, 30%, 90%)',
    borderColor: 'hsl(120, 30%, 70%)',
    pointBackgroundColor: 'hsl(120, 30%, 70%)',
    pointHighlightStroke: 'hsl(120, 30%, 70%)',
    borderCapStyle: 'butt',
  },{
    backgroundColor: 'hsl(0, 30%, 90%)',
    borderColor: 'hsl(0, 30%, 70%)',
    pointBackgroundColor: 'hsl(0, 30%, 70%)',
    pointHighlightStroke: 'hsl(0, 30%, 70%)',
    borderCapStyle: 'butt',
  },{
    backgroundColor: 'hsl(300, 30%, 90%)',
    borderColor: 'hsl(300, 30%, 70%)',
    pointBackgroundColor: 'hsl(300, 30%, 70%)',
    pointHighlightStroke: 'hsl(300, 30%, 70%)',
    borderCapStyle: 'butt',
  },{
    backgroundColor: 'hsl(180, 30%, 90%)',
    borderColor: 'hsl(180, 30%, 70%)',
    pointBackgroundColor: 'hsl(180, 30%, 70%)',
    pointHighlightStroke: 'hsl(180, 30%, 70%)',
    borderCapStyle: 'butt',
  },{
    backgroundColor: 'hsl(240, 30%, 90%)',
    borderColor: 'hsl(240, 30%, 70%)',
    pointBackgroundColor: 'hsl(240, 30%, 70%)',
    pointHighlightStroke: 'hsl(240, 30%, 70%)',
    borderCapStyle: 'butt',
  },{
    backgroundColor: 'hsl(60, 30%, 90%)',
    borderColor: 'hsl(60, 30%, 70%)',
    pointBackgroundColor: 'hsl(60, 30%, 70%)',
    pointHighlightStroke: 'hsl(60, 30%, 70%)',
    borderCapStyle: 'butt',
  }]

  window.addEventListener("hashchange", () => {
    update(parseHash(location.hash));
  });

  update(parseHash(location.hash));
  
  function parseHash(s) {
    try {
      return JSON.parse(decodeURIComponent(s.substring(1)));
    } catch (e) {
      return null;
    }
  }

  function update(settings) {
    if (!settings) return;

    table.innerHTML = '';
    
    var headers = document.createElement('tr');
    headers.attributes.class = "header";
    var boddtd = document.createElement('tr');
    for (prop in settings.meta) {
      var name = document.createElement('td');
      var value = document.createElement('td');
      name.textContent = prop;
      value.textContent = settings.meta[prop];
      headers.appendChild(name);
      boddtd.appendChild(value);
      table.appendChild(headers);
      table.appendChild(boddtd);
    }
    if (chart) {
      chart.data.labels = settings.labels;
      if (settings.stacked) {
        chart.data.datasets = templateSets.slice(0, settings.stacked.length);
        settings.stacked.forEach((data, i) => {
          chart.data.datasets[i].data = data;
          chart.data.datasets[i].label = settings.legend[i];
        })
      } else {
        chart.data.datasets = templateSets.slice(0, 1);
        chart.data.datasets[0].data = settings.data;
        chart.data.datasets[0].label = settings.legend;
      }
      chart.update();
    } else {
      config.data.labels = settings.labels;
      if (settings.stacked) {
        config.data.datasets = templateSets.slice(0, settings.stacked.length);
        settings.stacked.forEach((data, i) => {
          config.data.datasets[i].data = data;
          config.data.datasets[i].label = settings.legend[i];
        });
      } else {
        config.data.datasets = templateSets.slice(0, 1);
        config.data.datasets[0].data = settings.data;
        config.data.datasets[0].label = settings.legend;
      }
      chart = new Chart(ctx, config);
    }
  }
})((s) => document.querySelector(s));