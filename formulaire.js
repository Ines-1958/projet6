var modaleFormulaire = document.querySelector('.modale');
//const modaleBouton = document.querySelector('.btn');
const modaleClose = document.querySelector('.close');
//window.addEventListener('DOMContentLoaded', function(){
  const modaleBouton = document.querySelector('.photographe-heading__bloc .boutonContact');
  console.log("modaleBouton");
  console.log(modaleBouton);
  //modaleBouton.forEach((btn) => btn.addEventListener("click", affichageModale));

//});
// Appel fonction d'affichage de la modale
// modaleBouton.addEventListener("click", affichageModale);
// console.log("miiiiiiiiiaaaaaa");

//appel de la fonction close modal
modaleClose.addEventListener("click", closeModal);

//Affichage modale
function affichageModale() {
  modaleFormulaire.style.display = "block";
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
    const envoiFormulaire = document.querySelector('.bouton-envoyer');
    envoiFormulaire.addEventListener("click", closeModal);
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

// const mesLikes = document.querySelector('.j-aime');
// const likes = medias.likes;
// somme = 0;
// somme = somme + medias.likes; 
// console.log("somme");
// medias.forEach((likes) => likes.addEventListener("click", ajoutLikes));
// //likes.addEventListener("click", ajoutLikes);
// function ajoutLikes(){
//     likes++;
//     //somme++;
// }