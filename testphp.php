<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$config = require('config.php');


try {
//----------PDO----------
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
];
$pdo = new PDO($config['dsn'], "root", "", $options);
//----------PDO----------
echo "La connexion à la base de données a réussi";
} catch(PDOException $e) {
    echo "La connexion a échoué: " . $e->getMessage();
}


$stmt = $pdo->prepare('SELECT * FROM reseau');
$stmt->execute();
while ($row = $stmt->fetch()) {
    // traitement des résultats
    echo $row['RNom'];
}
?>