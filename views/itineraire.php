<h1>Quelle est votre destination ?</h1>

    <form onsubmit="return chercherCoordonnéesDestination()"
     id="journey-form" method="POST" enctype="multipart/form-data">
      <label for="destination"></label>
      <input type="text" name="destination" id="destination" placeholder="station, adresse" />
      <ul id="address-list"></ul>
      <input type="submit" value="C'est parti !">
    </form>
   
    <?php
    //action="index.php?c=process_favorisCookie"
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