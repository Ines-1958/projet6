//CREATION LIGHTBOX
// const modaleLightbox = document.getElementById("malightbox-modale");
// const modaleClose = document.getElementById('fermer');
// const modalePhoto = document.getElementById('img-lightbox');
// console.log("modalePhoto")

//CREATION LIGHTBOX
const modaleLightbox = document.getElementById("malightbox-modale");
const fermerModale = document.getElementById('fermer');
const modalePhoto = document.getElementById('img-lightbox');

// Appel fonction d'affichage de la modale
modalePhoto.addEventListener("click", affichageLightbox);
console.log("modalePhoto")

//appel de la fonction fermerLightbox
fermerModale.addEventListener("click", fermerLightbox);

//Affichage modale
function affichageLightbox(){
    modaleLightbox.style.display = "block";
}

//fermeture de la modale
function fermerLightbox() {
    modaleLightbox.style.display = "none";
}

modalePhoto.forEach(function(element) {
    element.addEventListener("click", (e) => affichageLightbox(e));
})

function affichageLightbox(event){
    let myImage = event.target;
    modaleLightbox.style.display = "block";
}