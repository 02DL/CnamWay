    <h1>Je me connecte</h1>

    <form action="index.php?c=process_login" method="POST">
      <div class="form-group">
        <label for="email">Adresse E-mail</label>
        <input type="email" id="email" name="usernameC" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="mdpC" required>
      </div>
      <button type="submit">Je me connecte</button>

      <a class="btn btn-info btn-block" href="index.php?c=inscription">Je crée mon compte</a>
    </form>