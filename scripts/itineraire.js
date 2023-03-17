fetch("https://api-ratp.pierre-grimaud.fr/v4/traffic/metros/1")
// récupére la réponse du serveur
.then(response => {
    // lit le contenu JSON dans le corps de la réponse:
    return response.json()
})
// récupére le contenu JSON:
.then(json => {
    console.log(json);
    // ici on pourrait mettre à jour l'interface avec les données de l'API
})
// capture les éventuelles erreur:
.catch(error => {
    console.error(`Oops, went wrong: ${error.code} => ${error.message}`);
})