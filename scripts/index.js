fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic/metros')
  .then(response => response.json())
  .then(data => {
    const metros = data.result.metros;
    const list = document.createElement('ul');

    var isNormal = new Boolean(true);

    metros.forEach(metro => {
      const item = document.createElement('li');
      item.innerText = `Ligne ${metro.line} : ${metro.title}`;
      list.appendChild(item);


      if ( `${metro.title}`  != "Trafic normal") { isNormal = false;};
    });

    if(isNormal) {
      document.body.append("Le trafic est normal dans l'ensemble des lignes. ")
    } else { document.body.appendChild(list);
    };

  })
  .catch(error => console.error(error));