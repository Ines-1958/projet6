//récuperation id pages photographes
//console.log('aaaaaaaaaaaaaaaaaaa')

const idRecuperation = window.location.search;
const urlParams = new URLSearchParams(idRecuperation);
const urlId = urlParams.get('id')
console.log(urlId);


function factory(json, idPhotographe, filter) {
    let result = [];
    json.forEach(function (media) {
        console.log(idPhotographe)
        if (media.photographerId == idPhotographe) {
            result.push(media);
        }
    })
    if (filter == 1)
    {

    }
    return result;
}


//list.sort((a, b) => (a.color > b.color) ? 1 : -1)*
// media.sort(function(a, b) {
//     if (a.likes > b.likes) {
//         return 1;
//     }
//     else {
//         return -1;
//     }
// })

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
function createPictureCard(filter) {

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
            mediaList = factory(medias, urlId, filter);
            //console.log(mediaList)
            mediaList.forEach(function (mediaPhotographe) {

                {
                    somme = somme + mediaPhotographe.likes;

                    images += `<div class="photographe-medias__lightbox">
                          <a href="">`
                    if (mediaPhotographe.image !== undefined) {
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.image}" alt="" class="photographe-medias__lightbox--img" data-type="photo"  data-src="${mediaPhotographe.image}" data-id="${mediaPhotographe.id}"/>`

                    }
                    else if (mediaPhotographe.video !== undefined) {
                        // medias+=   ` <video src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}" controls poster="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${element.id}.png/" width="100%" height="310px"></video>`
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}.png" alt="" class="photographe-medias__lightbox--img" data-type="video" data-src="${mediaPhotographe.video}" data-id="${mediaPhotographe.id}"/>`
                    }
                    images += ` </a>
                          <div class="photographe-medias__lightbox--texte">
                              <p class="photographe-medias__lightbox--texte--titre" data-title="${mediaPhotographe.title}">${mediaPhotographe.title}</p>
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
const modalePhoto = document.querySelectorAll('.photographe-medias__lightbox--img');
const dataImage = document.querySelectorAll("data-type");
const imageTitre = document.querySelectorAll('.photographe-medias__lightbox--texte--titre')
const lightboxImage = document.getElementById('lightbox__image')

const lightboxTitre = document.getElementById('lightbox__titre');


const dataTitle = document.querySelectorAll("data-title")
console.log(dataTitle)

const myDataId = document.getElementsByTagName('data-id');


// Appel fonction d'affichage de la modale
// modalePhoto.addEventListener("click", affichageLightbox);

modalePhoto.forEach(function(photo) {
    photo.addEventListener("click", (e) => affichageLightbox(e));
})

//appel de la fonction fermerLightbox
fermerModale.addEventListener("click", fermerLightbox);

  
//Affichage modale  
function affichageLightbox(e){
    e.preventDefault()
    const imageClick = e.target;
    
    console.log(imageClick)
    
    affImagePrincipale(imageClick)
  
}

function affImagePrincipale(image) {
    const id = image.getAttribute("data-id");
    console.log(id)
    const index = mediaList.findIndex(m => m.id === +id);

    lightboxTitre.innerHTML = image.parentNode.parentNode.querySelector(".photographe-medias__lightbox--texte--titre").innerHTML;//div image et div texte(parentNode 2 fois)

    // const lightboxVideo = document.getElementById("lightbox__video")
    // const data = document.querySelectorAll("data-type")
    // console.log(data)
    const dataType = image.getAttribute("data-type");
    const dataSrc = image.getAttribute("data-src");
    const lightboxVideo = document.getElementById("lightbox__video");
    // const dataTitle = image.getAttribute("data-title")
    

    
    if (dataType === 'photo') {
        lightboxImage.src = image.getAttribute("data-src")
        lightboxVideo.style.display = "none"
        lightboxImage.style.display = "block"
        console.log(dataSrc)
    }
    else if (dataType === 'video'){
        const urlId = urlParams.get('id');
        lightboxVideo.src = `FishEye_Photos/Sample Photos/PHOTOS/${urlId}/${dataSrc}`
        lightboxVideo.style.display = "block"
        lightboxImage.style.display = "none"
        console.log(dataSrc)
    }
    
    lightboxImage.src = image.getAttribute("src");//modification du src de l'image cliquée
    modaleLightbox.style.display = "block";
    setupPrevious(index);
    setupNext(index)
}

function setupPrevious(index){
    console.log(index)
    let i = +index;//peut s'écrire aussi parseInt(index)
    console.log("i : " + i);
    if (i === 0) {
        i = mediaList.length
    }
    i = i - 1;
    const previous = document.getElementById('previous');
    previous.setAttribute("data-previous", i);

    previous.addEventListener("click", (e) =>  {
        e.preventDefault
        const recupPrevious = e.target;
        const idImage = document.getElementById('lightbox__image')
        
        //const previousImage = mediaList[i];//image précédente
        const previousImage = document.querySelectorAll(".photographe-medias__lightbox--img")[i];//image précédente
        console.log(previousImage)
        //const urlId = urlParams.get('id')
        //FishEye_Photos/Sample Photos/PHOTOS/243/Travel_HillsideColor.jpg
        //idImage.src = `FishEye_Photos/Sample Photos/PHOTOS/${urlId}/${previousImage.image} `;
        
        affImagePrincipale(previousImage)
    })
    //console.log(previous)
}

function setupNext(index) {
    // const next = document.getElementById('next');
    // next.setAttribute("data-next", index);
    // next.addEventListener("click", (e) => {
    //     e.preventDefault
    //     const recupNext = e.target;
    //     const idImage = document.getElementById('lightbox__image')
    //     let i = +recupNext.getAttribute("data-next")//+ correspond à parseInt pour changer en entier le string
    //     if (i === mediaList.length - 1){
    //         i = -1
    //     }
    //     const nextImage = mediaList[i +1];
    //     console.log(nextImage)
    //     const urlId = urlParams.get('id')
    //     idImage.src = `FishEye_Photos/Sample Photos/PHOTOS/${urlId}/${nextImage.image} `;
    // })

    let i = +index;//peut s'écrire aussi parseInt(index)
    console.log("i : " + i);
    if (i === mediaList.length -1) {
        i = -1
    }
    i = i + 1;
    console.log(i)
    const next = document.getElementById('next');
    next.setAttribute("data-next", i);

    next.addEventListener("click", (e) =>  {
        e.preventDefault
        const recupNext = e.target;
        const idImage = document.getElementById('lightbox__image')
        const nextImage = document.querySelectorAll(".photographe-medias__lightbox--img")[i];//image suivante
        console.log(nextImage)
        
        affImagePrincipale(nextImage)
    })
    

}



//fermeture de la modale
function fermerLightbox() {
    modaleLightbox.style.display = "none";
}
//console.log(mediaList)



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






