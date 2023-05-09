
//alert(document.cookie);


function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

$(document).ready(function() {
  if(document.getElementById("messageI").value != null){
    var alerteAdmin = document.getElementById("messageI").value;
  }
  

    let cookieValue = getCookie("alerte");
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

  