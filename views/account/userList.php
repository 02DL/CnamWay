<h1> Liste des comptes utilisateurs </h1>

<section class="container-loisir container text-center" id="userList">

<?php 
foreach ($data['data'] as $result){ 
?>
   
<li> <?php echo $result; ?>

<form action="index.php?c=process_supprimercompte.php" method="POST">
<button type="submit">Supprimer son compte</button>
</form>

<button type="submit">Envoyer un mail</button></li>

<?php 
} 
?>

</section>