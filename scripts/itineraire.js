fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic/metros')
  .then(response => response.json())
  .then(data => {
    const metros = data.result.metros;
    const list = document.createElement('ul');

    metros.forEach(metro => {
      const item = document.createElement('li');
      item.innerText = `Ligne ${metro.line} : ${metro.title}`;
      list.appendChild(item);
    });

    document.body.appendChild(list);
  })
  .catch(error => console.error(error));