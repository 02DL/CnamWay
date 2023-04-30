<?php

unset($_SESSION);
session_destroy();
session_start();
$_SESSION['logged_in'] = false;
redirect('home');

?>