<h1>Mon compte</h1>

<?php 
echo $_SESSION['username'];

?>

<h1> Mes favoris </h1>

<section class="container-loisir container text-center" id="favorisList">

<?php 
foreach ($data['data'] as $result){ 
?>
   
<li> <?php echo $result; ?> </li>

<?php 
} 
?>

</section>




<a href="index.php?c=process_signOut">Sign Out</a>

