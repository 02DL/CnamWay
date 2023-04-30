<h1>Bienvenue sur la page d'inscription</h1>
<section class="container text-center container-loisir" id="formulaire">
    <!--Le formulaire pour s'inscrire avec pseudo et mdp-->
    <form action="index.php?c=process_inscription" method="POST" enctype="multipart/form-data">
      <div class="mb-3">
        <input type="text" class="form-control" name="usernameI" placeholder="Username">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" name="mdpI" placeholder="Password">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" name="mdpVerifI" placeholder="Confirm your password">
      </div>

      <button type="submit" class="btn btn-info btn-block">Submit</button>
    </form>
 </section>