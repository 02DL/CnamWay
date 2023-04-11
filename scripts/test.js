var mymap = L.map('mapid').setView([48.8566, 2.3522], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
	maxZoom: 18,
}).addTo(mymap);

// test itinéraire 
var apiUrl = "https://api.navitia.io/v1/coverage/fr-idf/journeys?from=2.356199%3B48.865871&to=2.329358%3B48.883682&"

var apiKey = "78d327c8-89d1-4f9d-b3eb-db1d9be8c517";


$.ajax({
    url: apiUrl,
    type: "GET",
    headers: {
        'Authorization': '78d327c8-89d1-4f9d-b3eb-db1d9be8c517' 
    },
    dataType: "json",
    success: function(data) {
        var journeys = data.journeys;
    
    // Parcours des itinéraires et affichage sur la carte
    for (var i = 0; i < journeys.length; i++) {
      var journey = journeys[i];
      
      // Parcours des étapes de l'itinéraire
      for (var j = 0; j < journey.sections.length; j++) {
        var section = journey.sections[j];


        if (section.geojson && section.geojson.coordinates && section.geojson.coordinates.length > 0) {
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
            var poly = section.geojson.coordinates;
                poly.map((item)=>{
                item.reverse()
            })
          
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
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  }
});
    