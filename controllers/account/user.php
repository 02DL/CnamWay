<?php
//récupère l'ensemble des id favoris de l'utilisateur
$stmt = $pdo->prepare('SELECT FId FROM avoir where UId IN (SELECT UId FROM utilisateur WHERE UMail =?)');
$stmt->execute([$_SESSION['username']]);
$results = $stmt->fetchAll(PDO::FETCH_COLUMN);

$favoris = array();

//recupère le contenu des favoris
$stmt = $pdo->prepare('SELECT FDest FROM favoris where FId = ?');
foreach($results as $res){
    $stmt->execute([$res]);
    $fdest = $stmt->fetchAll(PDO::FETCH_COLUMN);
    array_push($favoris, $fdest[0]);
}

render('account/user', ['title' => 'Mon compte','data'=>$favoris]);
?>