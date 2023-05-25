<h1>Déclarer un incident</h1>

<a href="index.php?c=process_signOut">Sign Out</a>

<form action="index.php?c=process_incident" method="POST">
  <div class="form-group">
    <label for="typeT">Quel moyen de transport est concerné ?</label>
    <select name="typeT" id="typeT">
    <option value="">--Choisissez le moyen de transport--</option>
    <option value="RER">RER</option>
    <option value="METRO">METRO</option>
    </select>

  </div>
  <div class="form-group">
    <label for="ligneT">Quelle ligne ?</label>
    <select name="ligneT" id="ligneT">
    <option value="">--Choisissez la ligne concernée--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    </select>

  </div>
  <div class="form-group">
    <label for="typeI">Quel type d'incident ?</label>
    <select name="typeI" id="typeI">
    <option value="">--Choisissez le type d'incident--</option>
    <option value="Perturbation">Perturbation</option>
    <option value="Incident">Incident</option>
    </select>
  </div>
  <div class="form-group">
    <label for="messageI">Message</label>
    <textarea rows ="5" id="messageI" name="messageI" required></textarea>
  </div>
  <button type="submit">Envoyer</button>

</form>

<?php 
if (isset($_COOKIE['incidentDeclare'])) {
?>
<form action="index.php?c=process_finIncident" method="POST">
  <button type="submit">Fin de l'incident</button>
</form>
<?php
}
?>
