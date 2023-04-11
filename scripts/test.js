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
		var url = 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.356199%3B48.865871&to=2.329358%3B48.883682&';

		$.ajax({
			url: url,
			headers: {
				'Authorization': '78d327c8-89d1-4f9d-b3eb-db1d9be8c517' 
			},
			success: function(data) {
				// Récupération des itinéraires depuis les données renvoyées par l'API
                var journeys = data.journeys;
    
                // Parcours des itinéraires et affichage sur la carte
                for (var i = 0; i < journeys.length; i++) {
                  var journey = journeys[i];
                  
                  // Parcours des étapes de l'itinéraire
                  for (var j = 0; j < journey.sections.length; j++) {
                    var section = journey.sections[j];
                    
                    // Affichage des segments de transport en commun
                    if (section.type == "public_transport") {
                      var line = section.display_informations.code;
                      var color = section.display_informations.color;
                      
                      // Création d'une couche pour la ligne de transport en commun
                      L.geoJSON(section.geojson, {
                        style: function(feature) {
                          return {
                            color: color
                          };
                        }
                      }).addTo(mymap);
                    }
                    
                    // Affichage des segments de marche à pied
                    if (section.type == "street_network") {
                      // Création d'une couche pour le trajet à pied
                      L.polyline(section.geojson.coordinates, {
                        dashArray: "10,10"
                      }).addTo(mymap);
                    }
                  }
						}	
						
	
			}
		});
	});
});

var colors = ['red','blue','orange','green','pink'];
//Affichage d'une marqueur à une coordoonnée donnée
function afficheMarqueur(lat,long, popupContent){
	var marker = L.marker([lat, long]).addTo(mymap).bindPopup(popupContent);
}


//Permet d'afficher un point par une coordonnée donnée
function afficheItineraire(lat, long){
    // Ajoutez un cercle avec un rayon de 0 pour dessiner le point
	L.circleMarker([lat, long], {radius: 0}).addTo(mymap);
	// Ajustez la vue de la carte pour afficher le point
	mymap.setView([lat, long], 15);

}

//récupere la destination recherché
function recupDestination() {
	var valeur = document.getElementById("destination").value;
  }



//test api

fetch('https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.356199%3B48.865871&to=2.329358%3B48.883682&', {
  headers: {
    Authorization: '78d327c8-89d1-4f9d-b3eb-db1d9be8c517',
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

  // Récupération des données GeoJSON via l'API Navitia
$.ajax({
    url: 'https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.3749036%3B48.8467927&to=2.2922926%3B48.8583736',
    dataType: 'json',
    headers: {
        'Authorization': '78d327c8-89d1-4f9d-b3eb-db1d9be8c517' // Clé d'API Navitia
    }
});

