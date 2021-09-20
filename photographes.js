//récuperation id pages photographes
const idRecuperation = window.location.search;
const urlParams = new URLSearchParams(idRecuperation);
const urlId = urlParams.get('id')
console.log(urlId);

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
                          <button class="boutonContact btn">Contactez-moi</button><!--5-->
                      </div>
                      <div>
                          <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${element.portrait}" alt="" class="heading-photo">
                      </div>`;
                      var somme = 0;
                      var images ="";
                      medias.forEach(function(mediaPhotographe) { 
                        //console.log(photographerId);
                        if (element.id === mediaPhotographe.photographerId)
                        //console.log(mediaPhotographe.likes);
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
        }) 

        const sectionGalerie = document.querySelector('.photographe-galerie');

        //console.log(obj.media[3].image);
        //sectionMedias.innerHTML += myHtml;
        //sectionHeading.innerHTML += myHtml; 

        
        
  }
}
rawFile.send(null);

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