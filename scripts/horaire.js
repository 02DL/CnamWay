const metroLinks = document.querySelectorAll('a[id^="metro-"]');
const rerLinks = document.querySelectorAll('a[id^="rer-"]');
const searchButton = document.querySelector('#search-button');
const stationName = document.querySelector('#station-name');
const timetable = document.querySelector('#timetable');

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


