<h1>Quelle est votre destination ?</h1>
    
    <form id="journey-form" action="index.php?c=process_favorisCookie" method="POST">
      <label for="destination"></label>
      <input type="text" name="destination" id="destination" placeholder="station, adresse" />
      <ul id="address-list"></ul>
      <input type="submit" value="C'est parti !">
    </form>
   
    <?php
    if (connected()) {
      if($_SESSION['username'] != getAdminMail()) {
    ?>
    <a href="index.php?c=process_favoris">Mettre en favoris</a>
    <?php
      }
    }
    ?>

     <div>
      <p>Voici ....</p>
     </div>
      <div id="mapid"></div>
         

      <div id="results"></div>
  
      <script src="scripts/itineraire.js"></script>