<?php 


$stmt = $pdo->prepare('INSERT INTO favoris(FId, FDest) VALUES(null, ?)');
$stmt->execute([$_SESSION['destinationActuelle']);

echo 'mis en favoris';
redirect('itineraire');

?>