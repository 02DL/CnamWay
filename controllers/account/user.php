<?php
//récupère l'ensemble des favoris de l'utilisateur

$stmt = $pdo->prepare('SELECT FId FROM avoir where UId IN (SELECT UId FROM utilisateur WHERE UMail =?)');
$stmt->execute([$_SESSION['username']]);
$results = $stmt->fetchAll(PDO::FETCH_COLUMN);


$stmt = $pdo->prepare('SELECT FDest FROM favoris where FId = ?');
$stmt->bindValue('FId:',$results);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_COLUMN);

//passage des données récupérées à la vue
render('account/user', ['title' => 'Mon compte','data'=>$results]);


?>