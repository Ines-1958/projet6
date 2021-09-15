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
            var myHtml = `
                  <section class="photographe-heading">
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
                                          myHtml += `<li>#${tagPhotographe}</li>`;
                                          }); 
                                      myHtml += ` 
                                      </ul>
                                  </nav>
                              </a>
                          </div>
                          <button class="boutonContact">Contactez-moi</button><!--5-->
                      </div>
                      <div>
                          <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${element.portrait}" alt="" class="heading-photo">
                      </div>
                  </section>

                  <section class="photographe-galerie">    
                      <div class="photographe-galerie__texte">
                          <span class="photographe-galerie__texte--likes">
                              297 081<i class="fas fa-heart"></i>
                          </span>
                          <span>300€ / jour</span>
                          </div>
                          <label for="filtrer">Trier par</label><!--8-->
                          <select id="filtrer" name="tri"><!--9-->
                              <option value="popularite" class="popularite">Popularité</option>
                              <option value="date">Date</option>
                              <option value="titre">Titre</option>
                          </select>
                      </section>

                      <section class="photographe-medias">`;
                      medias.forEach(function(mediaPhotographe) { 
                        //console.log(photographerId);
                        if (element.id === mediaPhotographe.photographerId)
                        // console.log(mediaPhotographe.title);
                         //return medias.image;
                        {
                            
                        myHtml += `<div class="photographe-medias__lightbox">
                          <a href="">`
                          if (mediaPhotographe.image !== undefined){
                            myHtml +=  ` <img src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.image}" alt="" class="photographe-medias__lightbox--img"/>`
                              
                            }
                            else if (mediaPhotographe.video !== undefined){
                            myHtml+=   ` <video src="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${mediaPhotographe.video}" controls poster="FishEye_Photos/Sample Photos/PHOTOS/${element.id}/${element.id}.png/" width="100%" height="310px"></video>`
                            }
                          myHtml += ` </a>
                          <div class="photographe-medias__lightbox--texte">
                              <p>${mediaPhotographe.title}</p>
                              <p>${mediaPhotographe.likes}<i class="fas fa-heart"></i></p>
                          </div>       
                        </div>`
                    }   
                })
                myHtml += `</section>`;
                    //sectionMedias.innerHTML += myHtml
            const positionHtml = document.querySelector('main');
            //positionHtml += sectionMedias;
            positionHtml.innerHTML = myHtml;  console.log(positionHtml);
          }
        }) 

        const sectionHeading = document.querySelector('.photogragraphe-heading');
        const sectionGalerie = document.querySelector('.photographe-galerie');
        const sectionMedias = document.querySelector('.photographe-medias');

                          
            //console.log(obj.media[3].image);
            //sectionMedias.innerHTML += myHtml;
            //sectionHeading.innerHTML += myHtml; 
            
  }
}
rawFile.send(null);