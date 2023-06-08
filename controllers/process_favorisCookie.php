<?php 

$message = $_POST["destination"];

setcookie('destinationActuelle', $message);

redirect('itineraire');
?>