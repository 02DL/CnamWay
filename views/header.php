<!DOCTYPE html>
<html lang="en">
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="styles/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
 
    <script src="scripts/alerte.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js"></script>

    <script src="https://unpkg.com/leaflet.locatecontrol/dist/L.Control.Locate.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.css" />

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
   
    <title><?php $data['title']; ?></title>
  </head>
  <body>

  <div id="alerte"></div>

  <header>
      <div class="logo">
        <img src="Images/logo.png" alt="Logo">
      </div>

      <nav>
        <ul>
          <li><a href="index.php?c=home">Accueil</a></li>
          <li><a href="index.php?c=itineraire">Itinéraires</a></li>
          <li><a href="index.php?c=horaire">Horaires</a></li>
        </ul>
      </nav>
     
  
    <?php
if (connected()) {
?>
 <div class="user-login">
        <span class="icon-user"></span>

        <?php

    if($_SESSION['username'] != getAdminMail()) {
      ?>
       <a href="index.php?c=account/account">Gérer mon compte</a>
    <?php
    }else{
      ?>
         <a href="index.php?c=account/account">Administrateur</a>
    <?php
    }
    ?>

      </div>
<?php
} else {
?>
    <div class="user-login">
        <span class="icon-user"></span>
        <a href="index.php?c=login">Se connecter</a>
      </div>
<?php
}
?>

</header>