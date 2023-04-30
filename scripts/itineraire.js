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

	//affiche les transports qui sont autour de l'utilisateur à un rayon de 500m
	var url = 'https://api.navitia.io/v1/coverage/fr-idf/coord/'+e.latlng.lng+'%3B'+e.latlng.lat+'/stop_areas?distance=500&';

	$.ajax({
		url: url,
		headers: {
			'Authorization': '78d327c8-89d1-4f9d-b3eb-db1d9be8c517' 
		},
		success: function(data) {
			for (var i = 0; i < data.stop_areas.length; i++) {
				afficheMarqueur(data.stop_areas[i].coord.lat,data.stop_areas[i].coord.lon,data.stop_areas[i].name);
			
			}
		}
	});

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
				var results = '';
				for (var i = 0; i < data.journeys.length; i++) {
					var journey = data.journeys[i];
					results += '<h3>Itinéraire ' + (i) + '</h3>';


                    results += '<li>' + 'Durée : ' + journey.duration + '</li>';
                    if (journey.fare.total != null) {
                     results += '<li>' + 'Coût : ' + journey.fare.total.value + '</li>';

                    } else results += '<li>' + 'Coût : ' + "0" + '</li>'



                    // Extraire l'heure d'arrivée au format HH:mm à partir de la chaîne de caractères "arrival_date_time"
                    var arrivalTime = journey.arrival_date_time.slice(9, 14);
                    var hours = arrivalTime.slice(0, 2);
                    var minutes = arrivalTime.slice(2, 4);
                    var formattedArrivalTime = hours + ':' + minutes;
                    results += '<li>' + 'Heure d\'arrivée : ' + formattedArrivalTime + '</li>';
					results += '<ul>';


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
								afficheItineraire(section.geojson.coordinates, colors[i],'false');
							 }else{
								afficheItineraire(section.geojson.coordinates, colors[i],'true');
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
	});
});

var colors = ['red','blue','orange','green','pink'];
//Affichage d'une marqueur à une coordoonnée donnée
function afficheMarqueur(lat,long, popupContent){
	var marker = L.marker([lat, long]).addTo(mymap).bindPopup(popupContent);
}


//Permet d'afficher un point par une coordonnée donnée
function affichePoint(lat, long, popupContent){
    // Ajoutez un cercle avec un rayon de 0 pour dessiner le point
	L.circleMarker([lat, long], {radius: 0}).addTo(mymap).bindPopup(popupContent);
	// Ajustez la vue de la carte pour afficher le point
	mymap.setView([lat, long], 15);

}

//récupere la destination recherché
function recupDestination() {
	var valeur = document.getElementById("destination").value;
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
