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
var id_stop_area = "";
var current_line_id = '';
var current_line = '';


addressInput.addEventListener('input', () => {
  const query = addressInput.value;
  
  // Si la barre de recherche est vide, on vide la liste des adresses proposées
  if (!query) {
    addressList.innerHTML = '';
    return;
  }
  
  // On récupère les adresses correspondantes à partir de l'API de Navitia
  fetch(API_URL+query+'&filter=line.id='+current_line_id+'&type%5B%5D=stop_area&count=10', {
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

//fonction calcul différence heure
function differenceEnMinutes(heure1, heure2) {
  const heure1Minutes = parseInt(heure1.substr(0, 2)) * 60 + parseInt(heure1.substr(2, 2));
  const heure2Minutes = parseInt(heure2.substr(0, 2)) * 60 + parseInt(heure2.substr(2, 2));
  const difference = heure2Minutes - heure1Minutes;
  return difference;
}

// fonction affichage des horaires pour une station donnée : 

function afficherHoraire(){

				var url = 'https://api.navitia.io/v1/coverage/fr-idf/stop_areas/'+id_stop_area+'/stop_schedules?filter=line.id='+current_line_id+'&';
				$.ajax({
					url: url,
					headers: {'Authorization': API_KEY },
					success: function(data) {
						var results = '';
						for (var i = 0; i < data.stop_schedules.length; i++) {
							var station = data.stop_schedules[i];
              if(station.additional_informations != "terminus"){
                results += '<h3>'+ current_line+' ' + station.stop_point.name + ' direction '+ station.display_informations.direction+'</h3>';

                //calcul du temps d'arrivée en minutes
                var nextTrain;
                results += '<li>' + 'Prochain train dans : ' ;
                for(var j = 0; j<2; j++ ){
                  var arrivalTime = station.date_times[j].date_time.slice(9, 14);
                  var current_DT = data.context.current_datetime.slice(9, 14);;
                  nextTrain = differenceEnMinutes(current_DT, arrivalTime);
                  results +=  nextTrain+ ' min'+ ' ; ';
                }
                results += '<li>';
              }
						}
						$('#results').html(results);
					},
          error: function(xhr, status, error) {
            console.error("Une erreur s'est produite lors de la requête AJAX :", error);
          }
        });
	// fin de récupération de l'adresse de destination
}


// fin de la fonction d'affichage des horaires pour une station donnée

//fonction d'affichage de l'horaire après avoir appuyé sur rechercher
const bouton_recherche = document.getElementById('metro-1-search-button');
bouton_recherche.addEventListener("click", afficherHoraire);


// Fonction appelée lors de la sélection d'une ligne de métro
function handleSelection(event) {
  // Supprime la classe 'selected' de tous les éléments 'li'
  const metroLines = document.querySelectorAll("#metroLines li");
  metroLines.forEach(function (line) {
    line.classList.remove("selected");
  });

  // Ajoute la classe 'selected' à l'élément 'li' sélectionné
  const selectedLine = event.target;
  selectedLine.classList.add("selected");

  const selectedValue = selectedLine.dataset.line;
  console.log("Ligne sélectionnée :", selectedValue);
  current_line_id = selectedValue;
  current_line = selectedLine.textContent;

}

// Sélection de la liste des lignes de métro
const metroLines = document.getElementById("metroLines");

// Ajout d'un gestionnaire d'événements de clic sur chaque élément de la liste
metroLines.addEventListener("click", handleSelection);





