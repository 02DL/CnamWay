//etat du traffic metro
fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic/metros')
  .then(response => response.json())
  .then(data => {
    const metros = data.result.metros;
    const list = document.createElement('ul');

    var isNormal = new Boolean(true);

    metros.forEach(metro => {
      const item = document.createElement('li');
      item.innerText = `Ligne ${metro.line} : ${metro.message}`;
      list.appendChild(item);

      if ( `${metro.title}`  != "Trafic normal") { 
        isNormal = false;
        msg = `${metro.line} `;
        addToAlerte(msg)};
    });

    if(isNormal) {
      document.body.append("Le trafic est normal dans l'ensemble des lignes METRO. ")
    } else { document.body.appendChild(list);
    };

  })
  .catch(error => console.error(error));

  //etat du traffic rer
  fetch('https://api-ratp.pierre-grimaud.fr/v4/traffic/rers')
  .then(response => response.json())
  .then(data => {
    const rers = data.result.rers;
    const list = document.createElement('ul');

    var isNormal = new Boolean(true);

    rers.forEach(rer => {
      const item = document.createElement('li');
      item.innerText = `Ligne ${rer.line} : ${rer.title}`;
      list.appendChild(item);

      if ( `${rers.line}`  != "Trafic normal") { 
        isNormal = false;
        msg = `${rer.line} `;
        addToAlerte(msg)};
    });

    if(isNormal) {
      document.body.append("Le trafic est normal dans l'ensemble des lignes RER. ")
    } else { document.body.appendChild(list);
    };

  })
  .catch(error => console.error(error));

var alerteMsg ="Perturbations sur les lignes: ";
var msg = "";

function addToAlerte(msg){
  alerteMsg += msg;
  document.cookie = "alerte=" + alerteMsg;
}

 

