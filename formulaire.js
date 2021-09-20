// document.addEventListener("DOMContentLoaded", function(event) { 
//     const idRecuperation = window.location.search;
// const urlParams = new URLSearchParams(idRecuperation);
// const urlId = urlParams.get('id')
// console.log(urlId);
// let rawFile = new XMLHttpRequest();
// rawFile.overrideMimeType("application/json");
// rawFile.open("GET","https://ines-1958.github.io/projet6/FishEyeData.json", true);
// rawFile.onreadystatechange = function() {
//     if(rawFile.readyState == 4 && rawFile.status == 200) {
//         // console.log(rawFile.responseText)
//         var json = rawFile.responseText;
//         const obj = JSON.parse(json);
//         console.log(obj);
//         const photographes = obj.photographers;
//         console.log(photographes);
//         const aside = document.querySelector('aside');

//         photographes.forEach(function(element) { 
//             //var formulaireHtml;
//             if (urlId == element.id){
//              formulaireHtml = `
//                 <aside class="modale">    
//                 <form method="post" action="" class="formulaire">
//                     <div class="formulaire__heading">
//                         <h1 class="formulaire__titre">Contactez-moi <br/>${element.name}</h1>
//                         <i class="fas fa-times"></i>
//                     </div>
//                     <div class="formulaire__infos">
//                         <label for="first-prenom">Prénom</label><br/>
//                         <input type="text" id="first-prenom" name="prenom" class="zone-texte" required/>
//                     </div>
//                     <div class="formulaire__infos">
//                         <label for="last-nom">Nom</label><br/>
//                         <input type="text" id="last-nom" name="nom" class="zone-texte" required/>
//                     </div>
//                     <div class="formulaire__infos">
//                         <label for="email">Email</label><br/>
//                         <input type="text" id="email" name="prenom" class="zone-texte" required/>
//                     </div>
//                     <div class="formulaire__infos">
//                         <label for="message">Votre message</label><br/>
//                         <textarea id="message" name="message_text" rows="5" cols="20"></textarea><!--rows et cols donnent une largeur et un nombre de lignes définis. Agrandissent l'espace de saisie.Facultatif-->
//                     </div>
//                     <input class="bouton-envoyer" id="envoiFormulaire" type="submit" value="Envoyer"/>
//                 </form>
//             </aside>
//                 `; 
//             }
//         })
//         const positionHtml = document.querySelector('main');
//         positionHtml.innerHTML += formulaireHtml;
//     }
// }
// rawFile.send(null);
//   });

const modaleFormulaire = document.querySelector('.modale');
const modaleBouton = document.querySelector('.boutonContact');
//const modaleBouton = document.querySelector('.btn');
const modaleClose = document.querySelector('.close');

// launch modal event
//modaleBouton.forEach((btn) => btn.addEventListener("click", affichageModale));
modaleBouton.addEventListener("click", affichageModale);
console.log("miiiiiiiiiaaaaaa");

//appel de la fonction close modal
modaleClose.addEventListener("click", closeModal);

//Affichage modale
function affichageModale() {
  modalbg.style.display = "block";
}

//fermeture de la modale
function closeModal(){
  modaleFormulaire.style.display = "none";
}


//Vérification formulaire

const soumissionFormulaire = document.querySelector("#envoiFormulaire");
soumissionFormulaire.addEventListener("click", function(e){
  e.preventDefault()
  const prenomSelector = document.querySelector("input[name='prenom']").value;
  const nomSelector = document.querySelector("input[name='nom']").value;
  const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = document.querySelector("input[name='mail']").value;

  //Remise à zéro des erreurs
  document.getElementById('erreurPrenom').innerHTML = ""
  document.getElementById('erreurNom').innerHTML = ""
  document.getElementById('erreurMail').innerHTML = ""

  let errors = []

  //Vérification des erreurs
  if(!prenomSelector.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]([' _-]?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]){2,30}$/))
  {
    errors.push("prenom")
  }
  if(!nomSelector.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]([' _-]?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]){2,30}$/))
  {
    errors.push("nom")
  } 
  if(!email.match(emailRegex)){
    errors.push("email")  
  }

  //Affichage des erreurs, si erreurs
  if(errors.length > 0) {
    if(errors.includes("prenom"))
    {
      document.getElementById('erreurPrenom').innerHTML = "Veuillez entrer un prénom !"
    }
    if(errors.includes("nom"))
    {
      document.getElementById('erreurNom').innerHTML = "Veuillez entrer un nom !"
    }
    if(errors.includes("email"))
    {
      document.getElementById('erreurMail').innerHTML = "Veuillez saisir une adresse mail !"
    }
  }

  //si pas d'erreurs
  else {

  }
    
})


// var tagNavigation = ['portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'Event']
// let monFiltre = tagNavigation.filter(function(element) {
//   for (let i = 0; i < element.length; i++) {
//     if (element[i] == 'portrait' || element[i] == 'art' || element[i] == 'fashion' || element[i] == 'architecture' || element[i] == 'travel' || element[i] == 'sport' || element[i] == 'animals' || element[i] == 'event') {
//       console.log(tagNavigation);
//     }
//   }
// })

var myTagNavigation = document.querySelector('.heading__navigation--taggs');
let tagNavigation = ['portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'Event'];
myTagNavigation = tagNavigation;
tagNavigation.forEach(function(element) {

  if(tagNavigation !== undefined){
    console.log("MOIIIIIIII")
  }
  else if (photographes.tags == element) {
    for (let i = 0; i < element.length; i++) {
      if (element[i] == 'portrait' || element[i] == 'art' || element[i] == 'fashion' || element[i] == 'architecture' || element[i] == 'travel' || element[i] == 'sport' || element[i] == 'animals' || element[i] == 'event') {
       // console.log("mamanb");
      }
    console.log("tatatatata")
  }
  
  }
}) 
const mesLikes = document.querySelector('.j-aime');
        const likes = medias.likes;
        somme = 0;
        somme = somme + medias.likes; 
        console.log("somme");
        medias.forEach((likes) => likes.addEventListener("click", ajoutLikes));
        //likes.addEventListener("click", ajoutLikes);
        function ajoutLikes(){
            likes++;
        }