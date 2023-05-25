<?php
//récupère l'ensemble des mails utilisateurs
$stmt = $pdo->prepare('SELECT UMail FROM utilisateur');
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_COLUMN);

require('views/account/nav.php');
//passage des données récupérées à la vue
render('account/userList', ['title' => 'Gestion des comptes','data'=>$results]);
?>