<?php
$username = $_POST["usernameI"];
$password = $_POST["mdpI"];
$passwordConfirmation = $_POST["mdpVerifI"];

$stmt = $pdo->prepare('SELECT count(*) as nb FROM utilisateur WHERE UMail = ?');
$stmt->execute([$username]);
$r = $stmt->fetch();


if ($r['nb'] == 1) {
  $_SESSION['error'] = 'SignUpUsername';
  redirect('inscription');
  exit;
}

if($password != $passwordConfirmation){
  $_SESSION['error'] = 'SignUpPassword';
  redirect('inscription');
  exit;
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);


$stmt = $pdo->prepare('INSERT INTO utilisateur(UId, UMail, `UMdp`) VALUES(null, ?, ?)');
$stmt->execute([$username,$hashed_password]);


redirect('home');
?>