//récuperation id pages photographes
//console.log('aaaaaaaaaaaaaaaaaaa')

const idRecuperation = window.location.search;
const urlParams = new URLSearchParams(idRecuperation);
const urlId = urlParams.get('id')
console.log(urlId);


function factory(json, idPhotographe) {
    let result = [];
    json.forEach(function (media) {
        console.log(idPhotographe)
        if (media.photographerId == idPhotographe) {
            result.push(media);
        }
    })

    return result;
}
let obj;
let rawFile = new XMLHttpRequest();
rawFile.overrideMimeType("application/json");
rawFile.open("GET", "https://ines-1958.github.io/projet6/FishEyeData.json", true);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState == 4 && rawFile.status == 200) {
        // console.log(rawFile.responseText)
        const json = rawFile.responseText;
        obj = JSON.parse(json);
        createPictureCard();
        //console.log(obj.media)
    }
}
var mediaList;
function createPictureCard() {

    //console.log(obj);
    const photographes = obj.photographers;
    //console.log(photographes);
    const medias = obj.media;
    //console.log(medias);
    // console.log("FACTORY")
    // console.log(factory(medias, urlId))
    

    var somme = 0;
    photographes.forEach(function (element) {
        if (urlId == element.id) {
            //console.log(element);
            const prix = element.price
            var formulaire__nom = document.getElementById("formulaire__nom")
            formulaire__nom.innerHTML += element.name;
            var header = `
                  
                      <div class="photographe-heading__bloc">
                          <div>
                              <h1>${element.name}</h1>
                              <div class="photographe-heading__bloc--description">
                                  <p>${element.city}, ${element.country}</p>
                                  <p>${element.tagline}</p>
                              </div>
                              <a href="">
                                  <nav class="photographe-heading__bloc--navigation">
                                      <ul>
                                      `;
            element.tags.forEach(function (tagPhotographe) {
                header += `<li>#${tagPhotographe}</li>`;
            });
            header += ` 
                                      </ul>
                                  </nav>
                              </a>
                          </div>
                          <button class="boutonContact btn">Contactez-moi</button>
                      </div>
                      <div>
                          <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${element.portrait}" alt="" class="heading-photo">
                      </div>`;

            var images = "";
            mediaList = factory(medias, urlId);
            //console.log(mediaList)
            mediaList.forEach(function (mediaPhotographe) {

                {
                    somme = somme + mediaPhotographe.likes;




                    images += `<div class="photographe-medias__lightbox">
                          <a href="">`
                    if (mediaPhotographe.image !== undefined) {
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.image}" alt="" class="photographe-medias__lightbox--img" id="img-lightbox" data-img="photos"/>`

                    }
                    else if (mediaPhotographe.video !== undefined) {
                        // medias+=   ` <video src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}" controls poster="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${element.id}.png/" width="100%" height="310px"></video>`
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}.png" alt="" class="photographe-medias__lightbox--img" id="video-lightbox" data-video="videos"/>`
                    }
                    images += ` </a>
                          <div class="photographe-medias__lightbox--texte">
                              <p>${mediaPhotographe.title}</p>
                              <p class="test"><span class="likes">${mediaPhotographe.likes}</span><i class="fas fa-heart j-aime" data-like="${mediaPhotographe.id}"></i></p>
                          </div>       
                        </div>`


                }

            })



            images += ` <div class="photographe-galerie__texte">
                                <span class="photographe-galerie__texte--likes">
                                    ${somme}<i class="fas fa-heart"></i>
                                </span>
                                <span>${prix}€ / jour</span>
                            </div>
                            </section>`;
            //sectionMedias.innerHTML += myHtml
            const positionHtml = document.querySelector('main');
            const sectionHeading = document.querySelector('.photographe-heading');
            sectionHeading.innerHTML = header;
            const sectionMedias = document.querySelector('.photographe-medias');
            sectionMedias.innerHTML = images;


        }
    })//.then(function(){})

    //INCREMENTATION BOUTON LIKE

    const myLikes = document.querySelectorAll('.j-aime');
    //console.log(myLikes);

    myLikes.forEach(function (element) {
        element.addEventListener("click", (e) => ajoutLike(e));
    });
    
    //console.log((document.querySelectorAll("myLikes").previousSibling))
    
    var nombreLikes = document.querySelectorAll('.likes');
    //console.log(nombreLikes)

    var sommeIncrement = document.querySelector(".photographe-galerie__texte--likes");
    
    function ajoutLike(event) {
        let myDataLike = event.target;//Récupération du like sur lequel on clique
        console.log(myDataLike);
        
        let nombreLike = myDataLike.previousSibling;//Récupération de l'élément précédant le like cliqué
        console.log(nombreLike.innerHTML)
        
        let increment = nombreLike.innerHTML;//Récupération du contenu de la span
        increment++;
        console.log(increment)
        nombreLike.innerHTML = increment;//Affichage nombre like incrementé
        
        somme++;//incrémentation de la somme
        
        // sommeIncrement.innerHTML = somme;//affichage de la somme incrementée
        
        sommeIncrement.innerHTML = `<span class="photographe-galerie__texte--likes">
        ${somme}<i class="fas fa-heart"></i>
        </span>`; //affichage de la somme incrementée
        console.log(somme)

        
    };


    const sectionGalerie = document.querySelector('.photographe-galerie');



    //VERIFICATION ET VALIDATION DU FORMULAIRE

    var modaleFormulaire = document.querySelector('.conteneur-modale');
    const modaleClose = document.querySelector('.close');
    
    //window.addEventListener('DOMContentLoaded', function(){
    const modaleBouton = document.querySelector('.boutonContact');

    // Appel fonction d'affichage de la modale
    modaleBouton.addEventListener("click", affichageModale);

    //appel de la fonction close modal
    modaleClose.addEventListener("click", closeModal);

    //Affichage modale
    function affichageModale() {
        modaleFormulaire.style.display = "block";
    }

    //fermeture de la modale
    function closeModal() {
        modaleFormulaire.style.display = "none";
    }


    //VERIFICATION FORMULAIRE

    const soumissionFormulaire = document.querySelector("#envoiFormulaire");
    soumissionFormulaire.addEventListener("click", function (e) {
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
        if (!prenomSelector.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]([' _-]?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]){2,30}$/)) {
            errors.push("prenom")
        }
        if (!nomSelector.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]([' _-]?[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]){2,30}$/)) {
            errors.push("nom")
        }

        if (!email.match(emailRegex)) {
            errors.push("email")
        }

        //Affichage des erreurs, si erreurs
        if (errors.length > 0) {
            if (errors.includes("prenom")) {
                document.getElementById('erreurPrenom').innerHTML = "Veuillez entrer un prénom !"
            }
            if (errors.includes("nom")) {
                document.getElementById('erreurNom').innerHTML = "Veuillez entrer un nom !"
            }
            if (errors.includes("email")) {
                document.getElementById('erreurMail').innerHTML = "Veuillez saisir une adresse mail !"
            }
        }

        //si pas d'erreurs
        else {
            const envoiFormulaire = document.querySelector('.bouton-envoyer');
            envoiFormulaire.addEventListener("click", closeModal);
        }

    })



//CREATION LIGHTBOX
const modaleLightbox = document.getElementById('conteneur-lightbox');
const fermerModale = document.getElementById('fermer');
//const modalePhoto = document.getElementById('img-lightbox');
const modalePhoto = document.querySelectorAll('#img-lightbox, #video-lightbox');
const dataImage = document.querySelectorAll("data-img");

// Appel fonction d'affichage de la modale
// modalePhoto.addEventListener("click", affichageLightbox);

modalePhoto.forEach(function(photo) {
    photo.addEventListener("click", (e) => affichageLightbox(e));
})

//appel de la fonction fermerLightbox
fermerModale.addEventListener("click", fermerLightbox);

//Affichage modale  
function affichageLightbox(){
    modaleLightbox.style.display = "block";
    //let myPhotos = mediaList;
    //console.log(this.getAtttibute("data-img"));
}

//fermeture de la modale
function fermerLightbox() {
    modaleLightbox.style.display = "none";
}
console.log(mediaList)



}

rawFile.send(null);

function getPhotographesByTag(tag) {

}
function toto() {
    console.log('toto');

}
function getPhotographes(callback) {
    console.log(json);
    if (callback == undefined) {

    }
}






