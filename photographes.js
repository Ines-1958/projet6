//récuperation id pages photographes
const idRecuperation = window.location.search;
const urlParams = new URLSearchParams(idRecuperation);
const urlId = urlParams.get('id')
console.log(urlId);

function factory(json, idPhotographe)
{
    let result = [];
    json.forEach(function(media){
        console.log(idPhotographe)
        if (media.photographerId == idPhotographe)
        {
            result.push(media);
        }
    })

    return result;
}

let rawFile = new XMLHttpRequest();
rawFile.overrideMimeType("application/json");
rawFile.open("GET","https://ines-1958.github.io/projet6/FishEyeData.json", true);
rawFile.onreadystatechange = function() {
    if(rawFile.readyState == 4 && rawFile.status == 200) {
        // console.log(rawFile.responseText)
        var json = rawFile.responseText;
        const obj = JSON.parse(json);
        console.log(obj);
        const photographes = obj.photographers;
        console.log(photographes);
        const medias = obj.media;
        console.log(medias);
        // console.log("FACTORY")
        // console.log(factory(medias, urlId))
        
        
        
        photographes.forEach(function(element) { 
          if (urlId == element.id)
          {
            console.log(element);
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
                                      element.tags.forEach(function(tagPhotographe) {
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
                      var somme = 0;
                      var images ="";
                      let mediaList = factory(medias, urlId);
                      console.log(mediaList)
                      mediaList.forEach(function(mediaPhotographe) { 
                        //console.log(photographerId);
                        // if (element.id === mediaPhotographe.photographerId)
                        // console.log(mediaPhotographe.likes);
                         //return medias.image;
                        {
                            somme = somme + mediaPhotographe.likes; 
                            
                            


                        images += `<div class="photographe-medias__lightbox">
                          <a href="">`
                          if (mediaPhotographe.image !== undefined){
                            images +=  ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.image}" alt="" class="photographe-medias__lightbox--img"/>`
                              
                            }
                            else if (mediaPhotographe.video !== undefined){
                            // medias+=   ` <video src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}" controls poster="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${element.id}.png/" width="100%" height="310px"></video>`
                            images+=    ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}.png" alt="" class="photographe-medias__lightbox--img"/>`
                            }
                          images += ` </a>
                          <div class="photographe-medias__lightbox--texte">
                              <p>${mediaPhotographe.title}</p>
                              <p>${mediaPhotographe.likes}<i class="fas fa-heart j-aime"></i></p>
                          </div>       
                        </div>`

                        //incrémentation likes au click
                        // const mesLikes = document.querySelectorAll('.j-aime');
                        // const likes = medias.likes;
                        // const mediaLikes = mediaPhotographe.likes; 
                        // mesLikes.forEach((myLike) => likes.addEventListener("click", ajoutLikes(mediaLikes)));
                        // mediaLikes.addEventListener("click", ajoutLikes);
                        // console.log(mediaLikes);
                        // function ajoutLikes(likes){
                        //     mediaLikes++;
                        //     somme++;
                        // }
 
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
            //positionHtml += sectionMedias;
            // positionHtml.innerHTML += myHtml;  console.log(positionHtml);
          }
        })//.then(function(){})

        const sectionGalerie = document.querySelector('.photographe-galerie');

        //console.log(obj.media[3].image);
        //sectionMedias.innerHTML += myHtml;
        //sectionHeading.innerHTML += myHtml; 

        //VERIFICATION ET VALIDATION DU FORMULAIRE

        var modaleFormulaire = document.querySelector('.conteneur-modale');
        //const modaleBouton = document.querySelector('.btn');
        const modaleClose = document.querySelector('.close');
        //window.addEventListener('DOMContentLoaded', function(){
        const modaleBouton = document.querySelector('.boutonContact');
        console.log("modaleBouton");
        console.log(modaleBouton);
        //modaleBouton.forEach((btn) => btn.addEventListener("click", affichageModale));

        //});
        // Appel fonction d'affichage de la modale
        modaleBouton.addEventListener("click", affichageModale);
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
        
  }
}
rawFile.send(null);



// const mesLikes = document.querySelector('.j-aime');
// const likes = mediaPhotographe.likes;
// console.log("mesLikes");
// console.log(mesLikes);
// console.log(likes);
// likes.forEach(() => mesLikes.addEventListener("click", ajoutLikes));
// function ajoutLikes(){
//     likes++;
// }   