var obj;
let rawFile = new XMLHttpRequest();
rawFile.overrideMimeType("application/json");
rawFile.open("GET","https://ines-1958.github.io/projet6/FishEyeData.json", true);
rawFile.onreadystatechange = function() {
    if(rawFile.readyState == 4 && rawFile.status == 200) {
        var json = rawFile.responseText;
        obj = JSON.parse(json);
        
     mesPhotographes();  
     
    }
}
rawFile.send(null);

function mesPhotographes(filtre){
    const section = document.querySelector('.photographes');

    if (filtre == undefined) {
         //Création HTML
        obj.photographers.forEach(function(photographes) {
            
            var monHtml = `
            <div class="photographes__bloc">
                    <div class="photographe">
                        <a href="photographes.html?id=${photographes.id}">
                            <div class="photographe__image">
                                <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${photographes.portrait}" alt="Portrait réprésentatif du photographe ${photographes.name}" class="photographe__image--img">
                            </div>
                            <h2 class="photographe__titre">${photographes.name}</h2>
                        </a>
                    </div>            
                    <div class="photographes__description">
                        <p>${photographes.city}, ${photographes.country}</p>
                        <p>${photographes.tagline}</p>
                        <p>${photographes.price}€/jour</p>
                    </div>
                    
                        <nav class="main-navigation">
                            <ul class="main-navigation__taggs" aria-label="tags du photographe">
            `; 
            photographes.tags.forEach(function(tagPhotographe) {
                monHtml += `<li class="main-navigation__taggs--li" >#${tagPhotographe}</li>`;
                });

            monHtml += `</ul>
            </nav>
            `;
            
            section.innerHTML += monHtml;
            
        })
    }
    else {
        var monHtml = "";
        obj.photographers.forEach(function(photographes) {

            if(photographes.tags.indexOf(filtre) !== -1) {

            monHtml += `
            <div class="photographes__bloc">
                    <div class="photographe">
                        <a href="photographes.html?id=${photographes.id}">
                            <div class="photographe__image">
                                <img src="FishEye_Photos/Sample Photos/Photographers ID Photos/${photographes.portrait}" alt="" class="photographe__image--img">
                            </div>
                            <h2 class="photographe__titre">${photographes.name}</h2>
                        </a>
                    </div>            
                    <div class="photographes__description">
                        <p>${photographes.city}, ${photographes.country}</p>
                        <p>${photographes.tagline}</p>
                        <p>${photographes.price}€/jour</p>
                    </div>
                    
                        <nav class="main-navigation">
                            <ul class="main-navigation__taggs">
            `; 
            photographes.tags.forEach(function(tagPhotographe) {
                monHtml += `<li class="main-navigation__taggs--li">#${tagPhotographe}</li>`;
                });

            monHtml += `</ul>
            </nav>
            
            </div>`;   
        }
    })
    section.innerHTML = monHtml;
    }           
}

//FILTRES PAR TAGS PHOTOGRAPHES
const myTags = document.querySelectorAll(".heading__navigation--taggs .heading__navigation--taggs--li");
const tags = document.querySelectorAll("data-tag");

myTags.forEach(function(element){
    element.addEventListener("click", affichage);
})

function affichage(){

    var filtre = this.getAttribute("data-tag");//pour cibler chaque filtre(tag) dans ma liste
    mesPhotographes(filtre);
}