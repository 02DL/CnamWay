<!DOCTYPE html>
<html>
<head>
	<title>Horaire des transports en commun</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="horaire.js"></script>
</head>
<body>
	<h1>Horaires</h1>
	<h2>Recherchez un horaire</h2>
	<h2>Lignes de métro</h2>
	<ul>
		<li><a href="#" id="metro-1">Ligne 1</a></li>
		<div id="metro-1-form">
		<label for="metro-1-station">Nom de la station :</label>
          <input type="text" id="metro-1-station">
          <button id="metro-1-search-button">Rechercher</button>
		</div>

		<li><a href="#" id="metro-2">Ligne 2</a></li>
		<div id="metro-2-form"></div>

		<li><a href="#" id="metro-3">Ligne 3</a></li>
		<div id="metro-3-form"></div>

		<li><a href="#" id="metro-4">Ligne 4</a></li>
		<div id="metro-4-form"></div>

		<li><a href="#" id="metro-5">Ligne 5</a></li>
		<div id="metro-5-form"></div>

		<li><a href="#" id="metro-6">Ligne 6</a></li>
		<div id="metro-6-form"></div>

		<li><a href="#" id="metro-7">Ligne 7</a></li>
		<div id="metro-7-form"></div>

		<li><a href="#" id="metro-8">Ligne 8</a></li>
		<div id="metro-8-form"></div>

		<li><a href="#" id="metro-9">Ligne 9</a></li>
		<div id="metro-9-form"></div>

		<li><a href="#" id="metro-10">Ligne 10</a></li>
		<div id="metro-10-form"></div>

		<li><a href="#" id="metro-11">Ligne 11</a></li>
		<div id="metro-11-form"></div>

		<li><a href="#" id="metro-12">Ligne 12</a></li>
		<div id="metro-12-form"></div>

		<li><a href="#" id="metro-13">Ligne 13</a></li>
		<div id="metro-13-form"></div>

		<li><a href="#" id="metro-14">Ligne 14</a></li>
		<div id="metro-14-form"></div>
	</ul>
	<h2>Lignes de RER</h2>
	<ul>
		<li><a href="#" id="rer-a">RER A</a></li>
		<div id="rer-a-form"></div>

		<li><a href="#" id="rer-b">RER B</a></li>
		<div id="rer-b-form"></div>

		<li><a href="#" id="rer-c">RER C</a></li>
		<div id="rer-c-form"></div>

		<li><a href="#" id="rer-d">RER D</a></li>
		<div id="rer-d-form"></div>

		<li><a href="#" id="rer-e">RER E</a></li>
		<div id="rer-e-form"></div>
	</ul>
	<div id="station-form" style="display: none;">
		<label for="station-name">Nom de la station :</label>
		<input type="text" id="station-name">
		<button id="search-button">Rechercher</button>
	</div>
	<div id="timetable"></div>
</body>
</html>
