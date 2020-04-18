
(($) => {
  var listsWrapper = $('#lists-wrapper');
  var title = $('#title');
  var image = $('#image');
  var container = $('#container');

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

    title.textContent = settings.meta.title;
    if (settings.meta.image) {
      image.classList.remove('hide');
      image.style.backgroundImage = 'url(' + settings.meta.image + ')';
    } else {
      image.classList.add('hide');
    }
    container.style.backgroundColor = settings.meta.backgroundColor || 'white';
    container.style.color = settings.meta.color || 'black';
    
    listsWrapper.innerHTML = '';
    settings.data.forEach((data) => {
      var list = document.createElement('div');
      list.setAttribute('class', 'list')
      var tit = document.createElement('h2');
      tit.innerText = data.title;
      list.appendChild(tit);
      var table = document.createElement('table');
      var headers = document.createElement('thead');
      data.headers.forEach((header) => {
        var col = document.createElement('th');
        col.innerText = header;
        headers.appendChild(col);
      });
      table.appendChild(headers);
      data.rows.forEach((row) => {
        var tr = document.createElement('tr');
        row.forEach((column) => {
          var col = document.createElement('td');
          col.innerText = column;
          tr.appendChild(col);
        });
        table.appendChild(tr);
      });
      list.appendChild(table);
      listsWrapper.appendChild(list);
    });
  }
})((s) => document.querySelector(s));