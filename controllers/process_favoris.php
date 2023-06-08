<?php 
//sauvegarde la destination dans les favoris
$stmt = $pdo->prepare('INSERT INTO favoris(FId, FDest) VALUES(null, ?)');
$stmt->execute([$_COOKIE['destinationActuelle']]);

//récupère id du favoris
$stmt = $pdo->prepare('SELECT FId FROM favoris WHERE FDest =?');
$stmt->execute([$_COOKIE['destinationActuelle']]);
$fid = $stmt->fetchAll(PDO::FETCH_COLUMN);

//récupère le id de l'utilisateur
$stmt = $pdo->prepare('SELECT UId FROM utilisateur WHERE UMail =?');
$stmt->execute([$_SESSION['username']]);
$uid = $stmt->fetchAll(PDO::FETCH_COLUMN);

//join le favoris à l'utilisateur
$stmt = $pdo->prepare('INSERT INTO avoir(FId, UId) VALUES(?,?)');
$stmt->execute([$fid[0],$uid[0]]);

redirect('itineraire');
?>