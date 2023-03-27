var mymap = L.map('mapid').setView([48.8566, 2.3522], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	maxZoom: 18,
}).addTo(mymap);

//géolocalisation
var marker = L.marker([0, 0]).addTo(mymap);

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	marker.setLatLng(e.latlng).bindPopup("Vous êtes dans un rayon de " + radius + " mètres de ce point").openPopup();
	L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
	alert(e.message);
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


//recherche et affichage d'itinéraire avec des coordoonnes départ et arrivée après avoir appuyer sur le bouton 'c est parti'
$(document).ready(function() {
	$('#journey-form').submit(function(event) {
		event.preventDefault();
		
		//parametre de depart et d'arrivée a spécifier
		var url = 'https://api.navitia.io/v1/coverage/sandbox/journeys?from=2.3749036%3B48.8467927&to=2.2922926%3B48.8583736&';

		$.ajax({
			url: url,
			headers: {
				'Authorization': '3b036afe-0110-4202-b9ed-99718476c2e0' 
			},
			success: function(data) {
				var results = '';
				for (var i = 0; i < data.journeys.length; i++) {
					var journey = data.journeys[i];
					results += '<h3>Itinéraire ' + (i+1) + '</h3>';
					results += '<ul>';
					for (var j = 0; j < journey.sections.length; j++) { //parcour tous les trajets possibles
						var section = journey.sections[j];
						results += '<li>' + 'Durée : ' + section.duration + '</li>';

						// Vérifiez si l'objet "geojson" et son champ "coordinates" sont définis
						if (section.geojson && section.geojson.coordinates && section.geojson.coordinates.length > 0) {
      					/**on fait apparaitre tous les chemins possibles*/
                    		for(var y = 0; y < section.geojson.coordinates.length-1; y++){
                      			afficheItineraire(section.geojson.coordinates[y][1], section.geojson.coordinates[y][0]);
                   	 		}
						}
               		}
					results += '</ul>';
				}
				$('#results').html(results);
			}
		});
	});
});


function afficheItineraire(lat, long){
    // Ajoutez un cercle avec un rayon de 0 pour dessiner le point
	L.circleMarker([lat, long], {radius: 0}).addTo(mymap);
	// Ajustez la vue de la carte pour afficher le point
	mymap.setView([lat, long], 15);
}

//récuper la destination recherché
function recupDestination() {
	var valeur = document.getElementById("destination").value;
  }

//test api

fetch('https://api.navitia.io/v1/coverage/fr-idf/physical_modes/physical_mode:Bus/lines', {
  headers: {
    Authorization: '78d327c8-89d1-4f9d-b3eb-db1d9be8c517',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

