
(($) => {
  var ctx = $('#graph').getContext('2d');
  var table = $('#metadata');
  let chart = null;

  const config = {
    type: 'line',
    data: {
        datasets: [{
            borderWidth: 2,
            backgroundColor: '#ffeddd',
            borderColor: 'rgb(128,128,128)'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMax: 20,
                    stepSize: 1
                }
            }]
        },
        aspectRatio: 3
    }
  }

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
      chart.data.datasets[0].data = settings.data;
      chart.data.datasets[0].label = settings.legend;
      chart.update();
    } else {
      config.data.labels = settings.labels;
      config.data.datasets[0].data = settings.data;
      config.data.datasets[0].label = settings.legend;
      chart = new Chart(ctx, config);
    }
  }
})((s) => document.querySelector(s));