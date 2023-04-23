<?php

// informations de connexion à la base de données
$serveur = "localhost";
$utilisateur = "admin";
$mot_de_passe = "admin";
$nom_de_la_base_de_donnees = "votre_nom_de_base_de_donnees";

// connexion à la base de données
$connexion = mysqli_connect($serveur, $utilisateur, $mot_de_passe, $nom_de_la_base_de_donnees);

// vérification de la connexion
if (!$connexion) {
    die("La connexion à la base de données a échoué : " . mysqli_connect_error());
}

// requête SQL pour extraire des données
$sql = "SELECT * FROM ma_table";

// exécution de la requête SQL
$resultat = mysqli_query($connexion, $sql);

// vérification du résultat
if (!$resultat) {
    die("La requête SQL a échoué : " . mysqli_error($connexion));
}

// récupération des données
while ($ligne = mysqli_fetch_array($resultat)) {
    echo $ligne["nom"] . " " . $ligne["prenom"] . "<br>";
}

// fermeture de la connexion à la base de données
mysqli_close($connexion);

?>
