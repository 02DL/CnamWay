<?php

$typeT = $_POST["typeT"];
$ligneT = $_POST["ligneT"];
$typeI = $_POST["typeI"];
$message = $_POST["messageI"];

setcookie('incidentDeclare', $message);

redirect('account/admin');
?>