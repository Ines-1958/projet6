let rawFile = new XMLHttpRequest();
rawFile.overrideMimeType("application/json");
rawFile.open("GET","https://ines-1958.github.io/projet6/FishEyeData.json", true);
rawFile.onreadystatechange = function() {
    if(rawFile.readyState == 4 && rawFile.status == 200) {
        // console.log(rawFile.responseText)
        var json = rawFile.responseText;
        const obj = JSON.parse(json);
        const section = document.querySelector('.photographes');
    
        //Création HTML
        obj.photographers.forEach(function(photographes) {
            
            //const section = document.querySelector('.photographes')
            var monHtml = `
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
                    <a href="">
                        <nav class="main-navigation">
                            <ul class="main-navigation__taggs">
            `; console.log("TOTO")
            photographes.tags.forEach(function(tagPhotographe) {
                monHtml += `<li class="main-navigation__taggs--li">#${tagPhotographe}</li>`;
                });
    
            monHtml += `</ul>
            </nav>
            </a>`;
            
            section.innerHTML += monHtml;
    
            // console.log(monHtml);
            
        })
            

    }
}
rawFile.send(null);

var myTagNavigation = document.querySelector('.heading__navigation--taggs');
            let tagNavigation = ['portrait', 'art', 'fashion', 'architecture', 'travel', 'sport', 'animals', 'Event'];
            myTagNavigation = tagNavigation;
            tagNavigation.forEach(function(element) {
                if(tagNavigation !== undefined){
                    console.log(tagNavigation[6])
                }
                else
                
                {
                    console.log("tatatatata")
                }
            }) 


//   function getPhotographe (id) {
//       if (id === undefined) {
//           return obj.photographers;
//           //console.log("TOTO")
//       }

//       else {
//         let photographe = false;
//         obj.photographers.forEach(function(photographes){
//             if (photographes.id === id) {
//                 console.log("TATA");
//                 photographe = photographes;
//             }
//         })
//         return photographe;
//       }
//   }
//   const photographe = getPhotographe();
//   console.log(photographe);


  
  
  //console.log(photographes);
  