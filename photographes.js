//récuperation id pages photographes
const idRecuperation = window.location.search;
const urlParams = new URLSearchParams(idRecuperation);
const urlId = urlParams.get('id')
console.log(urlId);


function factory(json, idPhotographe, order) {
    let result = [];
    json.forEach(function (media) {
        console.log(idPhotographe)
        if (media.photographerId == idPhotographe) {
            result.push(media);
        }
    })
    if (order == "Popularité") {
        result.sort(function(a, b) {
            if (a.likes < b.likes) {//tri par ordre decroissant et a>b, ordre croissant
                return 1;
            }
            else {
                return -1;
            }
        })
    }
    else if (order == "Date") {
        result.sort(function(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            else {
                return -1;
            }
        })
        console.log(result)
    }
    else if (order == "Titre") {
        result.sort(function(a, b) {
            if (a.title > b.title) {
                return 1;
            }
            else {
                return -1;
            }
        })
        console.log(result)
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

        const selectValue = document.getElementById("filtrer");
        const tri = "Popularité";
        //console.log(tri)

        createPictureCard(tri);
        // const triDate = selectValue.options[1].value;
        // console.log(triDate)
       
        selectValue.addEventListener('change', (event) => {
            const triSelectionne = selectValue.value;
            createPictureCard(triSelectionne)
            console.log(triSelectionne)
          });


        //console.log(obj.media)
    }
}
var mediaList;
function createPictureCard(order) {
console.log(order)
    const photographes = obj.photographers;
    //console.log(photographes);
    const medias = obj.media;

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
                                  <nav class="photographe-heading__bloc--navigation" role="navigation">
                                      <ul aria-label="tags du photographe">
                                      `;
            element.tags.forEach(function (tagPhotographe) {
                header += `<li tabindex="0">#${tagPhotographe}</li>`;
            });
            header += ` 
                                      </ul>
                                  </nav>
                              </a>
                          </div>
                          <button class="boutonContact btn" aria-haspopup="true">Contactez-moi</button>
                      </div>
                      <div>
                          <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${element.portrait}" alt="alt="Portrait réprésentatif de ${element.name}" class="heading-photo">
                      </div>`;

            var images = "";
            mediaList = factory(medias, urlId, order);
            //console.log(mediaList)
            mediaList.forEach(function (mediaPhotographe) {

                {
                    somme = somme + mediaPhotographe.likes;

                    images += `<div class="photographe-medias__lightbox">
                          <a href="#" role="button">`
                    if (mediaPhotographe.image !== undefined) {
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.image}" alt="${mediaPhotographe.title}, vue rapprochée" class="photographe-medias__lightbox--img" data-type="photo"  data-src="${mediaPhotographe.image}" data-id="${mediaPhotographe.id}"/>`

                    }
                    else if (mediaPhotographe.video !== undefined) {
                        // medias+=   ` <video src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}" controls poster="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${element.id}.png/" width="100%" height="310px"></video>`
                        images += ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}.png" alt="${mediaPhotographe.video}.png" class="photographe-medias__lightbox--img" data-type="video" data-src="${mediaPhotographe.video}" data-id="${mediaPhotographe.id}"/>`
                    }
                    images += ` </a>
                          <div class="photographe-medias__lightbox--texte">
                              <p class="photographe-medias__lightbox--texte--titre">${mediaPhotographe.title}</p>
                              <p class="test"><span class="likes">${mediaPhotographe.likes}</span><i class="fas fa-heart j-aime" data-like="${mediaPhotographe.id}" role="button" tabindex="0"></i></p>
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

var modaleFormulaire = document.querySelector('.conteneur-modale');//4
//const modaleClose = document.getElementById('close-modale');6
//const modaleClose = document.querySelector(".close")//6
const modaleClose = document.querySelector(".boutonClose")
const body = document.getElementById("body");//1
const main = document.getElementById("main");//3
const modaleTitre = document.querySelector(".formulaire__titre")//5
const modaleBouton = document.querySelector('.boutonContact');//2

// Appel fonction d'affichage de la modale
modaleBouton.addEventListener("click", affichageModale);

//appel de la fonction close modal
modaleClose.addEventListener("click", closeModal);

//Affichage modale
function affichageModale() {
    modaleFormulaire.style.display = "block";
    main.setAttribute('aria-hidden', 'true');
    modaleFormulaire.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    modaleClose.focus();
    console.log(modaleClose.focus())
}

//fermeture de la modale
function closeModal() {
    modaleFormulaire.style.display = "none";
    main.setAttribute('aria-hidden', 'false');
    modaleFormulaire.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    modaleBouton.focus();
}
//Fermeture modale avec echap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal(modaleClose);
    }
})

    //FIN ACCESSIBILITE

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
//const fermerModale = document.querySelector('.closeButton')
//const modalePhoto = document.getElementById('img-lightbox');
const modalePhoto = document.querySelectorAll('.photographe-medias__lightbox--img');
const dataImage = document.querySelectorAll("data-type");
const imageTitre = document.querySelectorAll('.photographe-medias__lightbox--texte--titre')
const lightboxImage = document.getElementById('lightbox__image')

const lightboxTitre = document.getElementById('lightbox__titre');

const myDataId = document.getElementsByTagName('data-id');


// Appel fonction d'affichage de la modale
// modalePhoto.addEventListener("click", affichageLightbox);

modalePhoto.forEach(function(photo) {
    photo.addEventListener("click", (e) => affichageLightbox(e));
})


// document.addEventListener('keydown', (event) => {
//     if (key === 13) {
//         console.log("formulaire")
//         affichageLightbox();
//     }
// })
// document.addEventListener('keydown', (event) => {
//     const keyCode = event.keyCode ? event.keyCode : event.which
  
//     if (keyCode === 39) {
//         setupNext()
//     } else if (keyCode === 37) {
//         setupPrevious()
//     }else if (keyCode === 13) {
//         affichageLightbox(modalePhoto)
//         console.log("enteeeeeeeerrrrrrrr");
//     }
//  })
 //Fermeture modale avec echap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
       fermerLightbox();
    }
    
})
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which
        if (keyCode === 13) {
            e.preventDefault
            
            affichageLightbox(e.target.querySelector('img'), true)
            // console.log(e.target.children)
            // console.log("enteeeeeeeerrrrrrrr");
        }
        else if (keyCode === 39) {
            setupNext(e)
            console.log("suivant")
        } 
        else if (keyCode === 37) {
            console.log(e)
            console.log(e.target.parentNode)
                // let test = e.target.parentNode;
                // e.src = e.target.parentNode;
                // console.log(e.src)
                setupPrevious()
                
            }
        })
        


//appel de la fonction fermerLightbox
fermerModale.addEventListener("click", fermerLightbox);

  
//Affichage modale  
function affichageLightbox(e, fromAccessibility){
    if (fromAccessibility) {
        //console.log(e.getAttribute("data-id"))
        affImagePrincipale(e)
    }
    affImagePrincipale(e.target)
  
}

function affImagePrincipale(image) {
    //console.log(image) 
    if(image) { 
    const id = image.getAttribute("data-id");
    console.log(id)
    const index = mediaList.findIndex(m => m.id === +id);

    lightboxTitre.innerHTML = image.parentNode.parentNode.querySelector(".photographe-medias__lightbox--texte--titre").innerHTML;//div image et div texte(parentNode 2 fois)

    const dataType = image.getAttribute("data-type");
    const dataSrc = image.getAttribute("data-src");
    const lightboxVideo = document.getElementById("lightbox__video");
    
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
}

function setupPrevious(index){
    //console.log(index)
    let i = +index;//peut s'écrire aussi parseInt(index)
    //console.log("i : " + i);
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
    let i = +index;//peut s'écrire aussi parseInt(index)
    //console.log("i : " + i);
    if (i === mediaList.length -1) {
        i = -1
    }
    i = i + 1;
    //console.log(i)
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


    //Récuperation du select
    const selectElement = document.querySelector("select");

    //Récupurétion 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter");
    console.log(selectDiv);
    //Création nouveau select
    const newFilterSelected = document.createElement("div");
    //const newFilterSelected = document.createElement("button");

    //Ajout de la classe "new-select"
    newFilterSelected.classList.add("select-filter-selected");

    //Ajout de l'option actuellement choisie dans le select
    newFilterSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;

    //Création de l'élément dans le DOM
    selectDiv.appendChild(newFilterSelected);

    //Création menu déroulant
    const menuDeroulant = document.createElement("div");
    //menuDeroulant.classList.add("select-filter-items", "select-hide");
    menuDeroulant.classList.add("select-filter-items", "select-hide");
    

    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElement.options) {
        console.log(option);
        //Création div pour cette option
        const newOption = document.createElement("div");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;
        newOption.setAttribute("data-filter", option.innerHTML);

        //ajout de l'écouteur d'événement "clic" sur l'option
        newOption.addEventListener("click", (event) => {
            menuDeroulant.classList.remove("select-hide");
            //boucle sur chacune des options du select original
            const filtreSelectionne = event.target.getAttribute("data-filter");
            

            createPictureCard(filtreSelectionne);
            
            for(let option of selectElement.options) {
                    console.log(option.innerHTML);
                    console.log(filtreSelectionne);
                    console.log(newFilterSelected.innerHTML);
                if(option.innerHTML !== this.innerHTML) {
                    
                    //on active la bonne option dans le select
                    selectElement.selectedIndex = option.index;
                    
                    //on change le contenu et le titre du newFilterSelected

                    newFilterSelected.innerHTML = filtreSelectionne;
                    createPictureCard(filtreSelectionne);
                    break;
                }
            }
            //on simule un clic sur newFilterSelected
            newFilterSelected.click();
        })

        //Ajout de l'option dans le menu Deroulant
        menuDeroulant.appendChild(newOption);
    }

    //Affichage du menu
    selectDiv.appendChild(menuDeroulant);

    //Ajout de l'écouteur d'événements click sur newFilterSelected
    newFilterSelected.addEventListener("click", function(e) {
        e.stopPropagation();
        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        //this.classList.add("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active");
    })

    







