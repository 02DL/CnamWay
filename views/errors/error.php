<?php
if ($_SESSION['error'] == 'errorLogin' || $_SESSION['error'] == 'errorLoginUsername') {
?>
  <div class="alert alert-info" role="alert">
    Wrong password or username !
  </div>
<?php
}
?>

<?php
if ($_SESSION['error'] == 'errorLoginUsernameEmpty') {
?>
  <div class="alert alert-info" role="alert">
    Username required !
  </div>
<?php
}
?>

<?php
if ($_SESSION['error'] == 'errorLoginPasswordEmpty') {
?>
  <div class="alert alert-info" role="alert">
    Password required !
  </div>
<?php
}
?>

<?php
//errors sign in
if ($_SESSION['error'] == 'SignUpUsername') {
?>
  <div class="alert alert-info" role="alert">
    This username is already taken !
  </div>
<?php
}
?>

<?php
if ($_SESSION['error'] == 'SignUpPassword') {
?>
  <div class="alert alert-info" role="alert">
    Incorrect Password !
  </div>
<?php
}
$_SESSION['error'] = null;
?>