<?php

session_start();

$config = require('config.php');

function render($view, $data = [])
{
    require('views/errors/error.php');
    require('views/header.php');
    require('views/' . $view . '.php');
    require('views/footer.php');
}

function redirect($controller)
{
    header('Location: index.php?c=' . $controller);
}

if (!empty($_GET['c'])) {
    $c = $_GET['c'];
} else
   $c = $config['default'];

if (!file_exists('controllers/' . $c . '.php')) {
    $c = "404";
    redirect('errors/error404');
}

require('controllers/' . $c . '.php');

?>