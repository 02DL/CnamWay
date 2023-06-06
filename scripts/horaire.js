const metroLinks = document.querySelectorAll('a[id^="metro-"]');
const rerLinks = document.querySelectorAll('a[id^="rer-"]');
const searchButton = document.querySelector('#search-button');
const stationName = document.querySelector('#station-name');
const timetable = document.querySelector('#timetable');
const API_KEY = '78d327c8-89d1-4f9d-b3eb-db1d9be8c517';

// Autocomplétion
const API_URL = 'https://api.navitia.io/v1/coverage/fr-idf/pt_objects?q=';
const addressInput = document.getElementById('metro-1-station');
const addressList = document.getElementById('station-list');
const id_stop_area = '';
const line_id = '';

// id ligne 1 line:IDFM:C01371

addressInput.addEventListener('input', () => {
  const query = addressInput.value;
  
  // Si la barre de recherche est vide, on vide la liste des adresses proposées
  if (!query) {
    addressList.innerHTML = '';
    return;
  }
  
  // On récupère les adresses correspondantes à partir de l'API de Navitia
  fetch(`${API_URL}${query}&filter=line.id%3Dline%3AIDFM%3AC01371&type%5B%5D=stop_area&count=10`, {
    headers: {
      Authorization: API_KEY
    }
  })
  .then(response => response.json())
  .then(data => {
    // On vide la liste des adresses proposées
    addressList.innerHTML = '';
    
    // On affiche chaque adresse dans la liste
    data.pt_objects.forEach(station => {
      const li = document.createElement('li');
      li.textContent = station.name;
      li.addEventListener('click', () => {
        addressInput.value = station.name;
        id_stop_area = station.id;
        addressList.innerHTML = '';
      });
      addressList.appendChild(li);
    });
  })
  .catch(error => {
    console.error(error);
  });
});
//fin auto complétion

// fonction affichage des horaires pour une station donnée : 

function afficherHoraire(){
				//parametre de depart et d'arrivée a spécifier
				//var lngD = 2.356199;
				//var latD = 48.865871;

				var url = 'https://api.navitia.io/v1/coverage/fr-idf/stop_areas/'+id_stop_area+'/stop_schedules?filter=line.id%3Dline%3AIDFM%3AC01371&';
		
				$.ajax({
					url: url,
					headers: {'Authorization': API_KEY },
					success: function(data) {
						var results = '';
						for (var i = 0; i < data.stop_schedules.length; i++) {
							var station = data.stop_schedules[i];
							results += '<h3> Ligne 1 : ' + station.stop_point.name + ' direction '+ station.display_informations.direction+'</h3>';

              //calcul du temps d'arrivée en minutes
              var nextTrain;
              for(int i = 0; i<2; i++ ){
                var arrivalTime = station.date_times[i].slice(9, 14);
                var current_DT = data.context.current_datetime;
                var hours = arrivalTime.slice(0, 2);
							  var minutes = arrivalTime.slice(2, 4);
                var currentH = current_DT.slice(0, 2);
                var currentM = current_DT.slice(2, 4);
              }
              var arrivalTime = station.date_times[0].slice(9, 14);
							var hours = arrivalTime.slice(0, 2);
							var minutes = arrivalTime.slice(2, 4);
							var formattedArrivalTime = hours + ':' + minutes;
		
							results += '<li>' + 'Prochain train dans : ' + data.c + '</li>';
							if (journey.fare.total != null) {
								results += '<li>' + 'Coût : ' + journey.fare.total.value + '</li>';
							} else results += '<li>' + 'Coût : ' + "0" + '</li>';
		
		
							// Extraire l'heure d'arrivée au format HH:mm à partir de la chaîne de caractères "arrival_date_time"
							var arrivalTime = journey.arrival_date_time.slice(9, 14);
							var hours = arrivalTime.slice(0, 2);
							var minutes = arrivalTime.slice(2, 4);
							var formattedArrivalTime = hours + ':' + minutes;
							results += '<li>' + 'Heure d\'arrivée : ' + formattedArrivalTime + '</li>' + '<ul>';
						
							for (var j = 0; j < journey.sections.length; j++) {
								var section = journey.sections[j];
		
								// Vérifiez si l'objet "geojson" et son champ "coordinates" sont définis
								if (section.geojson && section.geojson.coordinates && section.geojson.coordinates.length > 0) {
									//afficher le pt de départ et d'arrivée
									if(j == 0 ) 
										afficheMarqueur(section.geojson.coordinates[0][1], section.geojson.coordinates[0][0],'Départ');
									if(j == journey.sections.length-1)	
										afficheMarqueur(section.geojson.coordinates[section.geojson.coordinates.length-1][1], section.geojson.coordinates[section.geojson.coordinates.length-1][0],'Arrivée');
		
									//inverser les coordonnées récupéré de l'api pr l'afficher correctement utilisant polyline
									var poly = section.geojson.coordinates;
									poly.map((item)=>{
										item.reverse()
									 })
									 if (section.type == "public_transport") {
										afficheItineraire(section.geojson.coordinates, "#"+section.display_informations.color,'false');
										console.log(section.display_informations.color);
									 }else{
										afficheItineraire(section.geojson.coordinates, 'black','true');
									 }
									 if(section.type == "public_transport"){
										for(var i = 0; i<section.stop_date_times.length; i++){
											var lat = section.stop_date_times[i].stop_point.coord.lat;
											var lon = section.stop_date_times[i].stop_point.coord.lon;
											var name = section.stop_date_times[i].stop_point.name;
											affichePoint(lat,lon,name);
										}
									 }
								}		
							   }	
							results += '</ul>';
						}
						$('#results').html(results);
					}
				});	
	})
	.catch(error => {
		console.error(error);
	});
	// fin de récupération de l'adresse de destination
}


// fin de la fonction d'affichage des horaires pour une station donnée


metroLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();
		timetable.innerHTML = `<h3>Horaires pour la station ${link.textContent}</h3>`;
		stationForm.style.display = 'block';
	});
});

rerLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();
		timetable.innerHTML = `<h3>Horaires pour la station ${link.textContent}</h3>`;
		stationForm.style.display = 'block';
	});
});

searchButton.addEventListener('click', e => {
	e.preventDefault();
	const station = stationName.value.trim();
	if (station) {
		timetable.innerHTML = `<h3>Horaires pour la station ${station}</h3>`;
	} else {
		timetable.innerHTML = '<p>Veuillez entrer le nom de la station.</p>';
	}
});

const stationForm = document.getElementById("station-form");

metroLinks.concat(rerLinks).forEach(link => {
  link.addEventListener("click", () => {
    stationForm.style.display = "block";
  });
});

metroLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    timetable.innerHTML = `<h3>Horaires pour la station ${link.textContent}</h3>`;
    stationForm.style.display = 'block';
  });
});

rerLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    timetable.innerHTML = `<h3>Horaires pour la station ${link.textContent}</h3>`;
    stationForm.style.display = 'block';
  });
});

const metro1Form = document.querySelector('#metro-1-form');
const metro1SearchButton = document.querySelector('#metro-1-search-button');
const metro1StationName = document.querySelector('#metro-1-station');

const rerAForm = document.querySelector('#rer-a-form');
const rerASearchButton = document.querySelector('#rer-a-search-button');
const rerAStationName = document.querySelector('#rer-a-station');

// Gestionnaire d'événements pour le lien de la ligne de métro 1
document.querySelector('#metro-1').addEventListener('click', e => {
  e.preventDefault();
  timetable.innerHTML = `<h3>Horaires pour la station ${e.target.textContent}</h3>`;
  metro1Form.style.display = 'block';
});

// Gestionnaire d'événements pour le bouton "Rechercher" de la ligne de métro 1
metro1SearchButton.addEventListener('click', e => {
  e.preventDefault();
  const station = metro1StationName.value.trim();
  if (station) {
    timetable.innerHTML = `<h3>Horaires pour la station ${station}</h3>`;
  } else {
    timetable.innerHTML = '<p>Veuillez entrer le nom de la station.</p>';
  }
});

// Gestionnaire d'événements pour le lien de la ligne de RER A
document.querySelector('#rer-a').addEventListener('click', e => {
  e.preventDefault();
  timetable.innerHTML = `<h3>Horaires pour la station ${e.target.textContent}</h3>`;
  rerAForm.style.display = 'block';
});

// Gestionnaire d'événements pour le bouton "Rechercher" de la ligne de RER A
rerASearchButton.addEventListener('click', e => {
  e.preventDefault();
  const station = rerAStationName.value.trim();
  if (station) {
    timetable.innerHTML = `<h3>Horaires pour la station ${station}</h3>`;
  } else {
    timetable.innerHTML = '<p>Veuillez entrer le nom de la station.</p>';
  }
});

const form = document.querySelector('#station-form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const station = stationName.value.trim();
  if (station) {
    fetch(`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${metroId}/${station}`)
      .then(response => response.json())
      .then(data => {
        const schedules = data.result.schedules;
        let html = '';
        if (schedules.length > 0) {
          html += '<table>';
          html += '<tr><th>Destination</th><th>Prochain train</th><th>Heure suivante</th></tr>';
          schedules.forEach(schedule => {
            html += `<tr><td>${schedule.destination}</td><td>${schedule.message}</td><td>${schedule.nextDeparture}</td></tr>`;
          });
          html += '</table>';
        } else {
          html = '<p>Aucun train à venir pour cette station.</p>';
        }
        timetable.innerHTML = html;
      })
      .catch(error => {
        console.error(error);
        timetable.innerHTML = '<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>';
      });
  } else {
    timetable.innerHTML = '<p>Veuillez entrer le nom de la station.</p>';
  }
});


