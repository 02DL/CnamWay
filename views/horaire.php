	<link rel="stylesheet" type="text/css" href="styles/horaire.css">
	<h1>Horaires</h1>
	<h2>Recherchez un horaire</h2>
	<h2>Lignes de métro</h2>
  <ul id="metroLines">
    <li data-line="line:IDFM:C01371">Ligne 1</li>
    <li data-line="line:IDFM:C01372">Ligne 2</li>
    <li data-line="line:IDFM:C01373">Ligne 3</li>
	<li data-line="line:IDFM:C01386">Ligne 3bis</li>
	<li data-line="line:IDFM:C01374">Ligne 4</li>
	<li data-line="line:IDFM:C01375">Ligne 5</li>
	<li data-line="line:IDFM:C01376">Ligne 6</li>
	<li data-line="line:IDFM:C01377">Ligne 7</li>
	<li data-line="line:IDFM:C01387">Ligne 7bis</li>
	<li data-line="line:IDFM:C01378">Ligne 8</li>
	<li data-line="line:IDFM:C01379">Ligne 9</li>
	<li data-line="line:IDFM:C01380">Ligne 10</li>
	<li data-line="line:IDFM:C01381">Ligne 11</li>
	<li data-line="line:IDFM:C01382">Ligne 12</li>
	<li data-line="line:IDFM:C01383">Ligne 13</li>
	<li data-line="line:IDFM:C01384">Ligne 14</li>

  </ul>
		<div id="metro-1-form">
		<label for="metro-1-station">Nom de la station :</label>
          <input name = "metro-1-station" type="text" id="metro-1-station" placeholder="nom de la station">
		  <ul id="station-list"></ul>
          <button id="metro-1-search-button">Rechercher</button>
		</div>
		<div id="results"></div>

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
	<div id="station-form" >
		<label for="station-name">Nom de la station :</label>
		<input type="text" id="station-name">
		<button id="search-button">Rechercher</button>
	</div>
	<div id="timetable"></div>
	<script src="scripts/horaire.js"></script>
