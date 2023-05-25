
//alert(document.cookie);


function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

$(document).ready(function() {
  let cookieValue = ' ';

  if (checkCookieExists('incidentDeclare')) {
    cookieValue = getCookie("incidentDeclare");

  }else{
    cookieValue = getCookie("alerte");
    
  }
  // Afficher la valeur du cookie
    $('#alerte').html(cookieValue);
  });


// récupérer la valeur d'un cookie par son nom
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return '';
  }

  
  function checkCookieExists(cookieName) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName + '=') === 0) {
        // Le cookie existe
        return true;
      }
    }
    // Le cookie n'existe pas
    return false;
  }