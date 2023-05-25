<h1> Liste des comptes utilisateurs </h1>

<section class="container-loisir container text-center" id="userList">

<?php 
foreach ($data['data'] as $result){ 
?>
   
<li> <?php echo $result; ?>  <button type="submit">Supprimer son compte</button><button type="submit">Envoyer un mail</button></li>

<?php 
} 
?>

</section>