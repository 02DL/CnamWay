//ID
const API_KEY = '78d327c8-89d1-4f9d-b3eb-db1d9be8c517';

var mymap = L.map('mapid').setView([48.8566, 2.3522], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	maxZoom: 18,
}).addTo(mymap);

//géolocalisation
var marker = L.marker([0, 0]).addTo(mymap);
var lonGeo;
var latGeo;

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	marker.setLatLng(e.latlng).bindPopup("Vous êtes dans un rayon de " + radius + " mètres de ce point").openPopup();
	L.circle(e.latlng, radius).addTo(mymap);
	lonGeo = e.latlng.lng;
	latGeo = e.latlng.lat;

	//affiche les transports qui sont autour de l'utilisateur à un rayon de 500m
	var url = 'https://api.navitia.io/v1/coverage/fr-idf/coord/'+lonGeo+'%3B'+latGeo+'/stop_areas?distance=500&';

	$.ajax({
		url: url,
		headers: {'Authorization': '78d327c8-89d1-4f9d-b3eb-db1d9be8c517'},
		success: function(data) {
			for (var i = 0; i < data.stop_areas.length; i++) {
				afficheMarqueur(data.stop_areas[i].coord.lat,data.stop_areas[i].coord.lon,data.stop_areas[i].name);
			}
		}
	});
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

mymap.locate({setView: true, maxZoom: 16});

L.control.locate({
    position: "topleft",
    strings: {
        title: "Ma position"
    },
}).addTo(mymap);
//fin géoloca

// Autocomplétion
const API_URL = 'https://api.navitia.io/v1/coverage/fr-idf/places?q=';
const addressInput = document.getElementById('destination');
const addressList = document.getElementById('address-list');

addressInput.addEventListener('input', () => {
  const query = addressInput.value;
  
  // Si la barre de recherche est vide, on vide la liste des adresses proposées
  if (!query) {
    addressList.innerHTML = '';
    return;
  }
  
  // On récupère les adresses correspondantes à partir de l'API de Navitia
  fetch(`${API_URL}${query}&count=10`, {
    headers: {
      Authorization: API_KEY
    }
  })
  .then(response => response.json())
  .then(data => {
    // On vide la liste des adresses proposées
    addressList.innerHTML = '';
    
    // On affiche chaque adresse dans la liste
    data.places.forEach(place => {
      const li = document.createElement('li');
      li.textContent = place.name;
      li.addEventListener('click', () => {
        addressInput.value = place.name;
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


// adresse de destination pour tracer l'itinéraire
var adresseDestination;
var lonA, latA;

function chercherCoordonnéesDestination(){
	recupDestination();

	// On récupère les adresses correspondantes à partir de l'API de Navitia
	fetch('https://api.navitia.io/v1/coverage/fr-idf/places?q='+ adresseDestination +'&count=1', {
		headers: {
		Authorization: API_KEY
		}
	})
	.then(response => response.json())
	.then(data => {
		// On récupère les coordonnées de l'adresse
		if(data.places[0].embedded_type == "address"){
			lonA = data.places[0].address.coord.lon;
			latA = data.places[0].address.coord.lat;
		}
		else{
			lonA = data.places[0].stop_area.coord.lon;
			latA = data.places[0].stop_area.coord.lat;
			
		}
				//parametre de depart et d'arrivée a spécifier
				//var lngD = 2.356199;
				//var latD = 48.865871;

				var url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from='+lonGeo+'%3B'+latGeo+'&to='+lonA+'%3B'+latA+'&';
		
				$.ajax({
					url: url,
					headers: {'Authorization': API_KEY },
					success: function(data) {
						var results = '';
						for (var i = 0; i < data.journeys.length; i++) {
							var journey = data.journeys[i];
							results += '<h3>Itinéraire ' + (i+1) + '</h3>';
							var duréeTrajet = Math.floor(journey.duration / 60) ;
							var coutTrajet = journey.fare.total.value/100;
							results += '<li>' + 'Durée : ' + duréeTrajet + ' min' +'</li>';
							if (journey.fare.total != null) {
								results += '<li>' + 'Coût : ' + coutTrajet + ' €'+ '</li>';
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

//recherche et affichage d'itinéraire avec des coordoonnes départ et arrivée après avoir appuyer sur le bouton 'c est parti'
    $(document).ready(function() {
	    $('#journey-form').submit(function(event) {
	        event.preventDefault();
	        mymap.on('locationfound', onLocationFound);
	        chercherCoordonnéesDestination();
	    });
     });

var colors = ['red','blue','orange','green','pink'];
//fonctions utiles

//Affichage d'un marqueur à une coordoonnée donnée
function afficheMarqueur(lat,long, popupContent){
	var marker = L.marker([lat, long]).addTo(mymap).bindPopup(popupContent);
}


//Permet d'afficher un point par une coordonnée donnée
function affichePoint(lat, long, popupContent){
	L.circleMarker([lat, long], 
		{radius: 2, color: 'black',weight: 5,}
	).addTo(mymap).bindPopup(popupContent);
	mymap.setView([lat, long], 12);
}

//récupere la destination recherché par l'utilisateur
function recupDestination() {
	adresseDestination = document.getElementById("destination").value;
  }

function afficheItineraire(coord,color,dash){
	var polyline;
	if(dash == 'true'){
		polyline = L.polyline(coord, {
			color: color,
			dashArray: "10,10"
		})
	}else{
		polyline = L.polyline(coord, {
			color: color,
		})
	}
	polyline.addTo(mymap);
}

function onLocationError(e) {
	alert(e.message);
}

