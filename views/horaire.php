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
		<h2>Lignes de RER</h2>
		<li data-line="line:IDFM:C01742">RER A</li>
		<li data-line="line:IDFM:C01743">RER B</li>
		<li data-line="line:IDFM:C01727">RER C</li>
		<li data-line="line:IDFM:C01728">RER D</li>
		<li data-line="line:IDFM:C01729">RER E</li>
	</ul>

	
	<ul id="rerLines">
		<li data-line="line:IDFM:C01742">RER A</li>
		<li data-line="line:IDFM:C01743">RER B</li>
		<li data-line="line:IDFM:C01727">RER C</li>
		<li data-line="line:IDFM:C01728">RER D</li>
		<li data-line="line:IDFM:C01729">RER E</li>
  	</ul>

	  <div id="metro-form">
		<label for="metro-station">Nom de la station :</label>
          <input name = "metro-station" type="text" id="metro-station" placeholder="nom de la station">
		  <ul id="station-list"></ul>
          <button id="search-button">Rechercher</button>
		</div>
		<div id="results"></div>
		
	<script src="scripts/horaire.js"></script>
