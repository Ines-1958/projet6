// window.onload = () => {
//     console.log("mamamamamaam")
//     //Récuperation du select
//     const selectElement = document.querySelector("select");

//     //Récupurétion 1ère div "select-filter"
//     const selectDiv = document.querySelector(".select-filter");

//     //Création nouveau select
//     const newFilterSelected = document.createElement("div");

//     //Ajout de la classe "new-select"
//     newFilterSelected.classList.add("select-filter-selected");

//     //Ajout de l'option actuellement choisie dans le select
//     console.log(selectElement.selectedIndex)
//     newFilterSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;

//     //Création de l'élément dans le DOM
//     selectDiv.appendChild(newFilterSelected);

//     //Création menu déroulant
//     const menuDeroulant = document.createElement("div");
//     menuDeroulant.classList.add("select-filter-items", "select-hide");

//     //Boucle sur les options dans le select et les copier dans la div
//     for(let option of selectElement.options) {
//         console.log(option)
//         //Création div pour cette option
//         const newOption = document.createElement("div");

//         //on copie le contenu de l'option
//         newOption.innerHTML = option.innerHTML;

//         //ajout de l'écouteur d'événement "clic" sur l'option
//         newOption.addEventListener("click", function() {
//             //boucle sur chacune des options du select original
//             console.log(document.getElementById("filtrer").value)
//             for(let option of selectElement.options) {
//                 if(option.innerHTML === this.innerHTML) {
//                     //on active la bonne option dans le select
//                     selectElement.selectedIndex = option.index;
//                     console.log(selectElement);
                    
//                     //on change le contenu et le titre du newFilterSelected
//                     newFilterSelected.innerHTML = this.innerHTML;
                    
//                     console.log(this.innerHTML)
//                     break;
//                 }
//             }
//             //on simule un clic sur newFilterSelected
//             newFilterSelected.click();
//         })

//         //Ajout de l'option dans le menu Deroulant
//         menuDeroulant.appendChild(newOption);
//     }

//     //Affichage du menu
//     selectDiv.appendChild(menuDeroulant)

//     //Ajout de l'écouteur d'événements click sur newFilterSelected
//     newFilterSelected.addEventListener("click", function(e) {
//         e.stopPropagation();
//         this.nextSibling.classList.toggle("select-hide");
//         this.classList.toggle("active")
//     })
// }

//ACCESSIBILITE LIGHTBOX
// Global var
// const prevBtn = document.querySelector(".prev-image")
// const nextBtn = document.querySelector(".next-image")
// const carouselItems = document.querySelector(".carousel-item")
// const carouselPauseBtn = document.querySelector(".carousel-pause-btn")
 
// let currentItemPosition = 0
// let carouselInterval
 
// // Funcs
// const goToNextSlide = () => {
//    if (currentItemPosition + 1 >=  carouselItems.length) {
      
//        const lastItem = `.item-${currentItemPosition}`
 
//        currentItemPosition = 0
//        const currentItem = `.item-${currentItemPosition}`
      
//        setNodeAttributes(lastItem, currentItem)
//    } else {
//        currentItemPosition += 1
//        const lastItem = `.item-${currentItemPosition - 1}`
//        const currentItem = `.item-${currentItemPosition}`
      
//        setNodeAttributes(lastItem, currentItem)
//    }
// }
 
// const goToPreviousSlide = () => {
//    if (currentItemPosition - 1 >=  0) {
//        currentItemPosition -= 1
//        const currentItem = `.item-${currentItemPosition}`
//        const lastItem = `.item-${currentItemPosition + 1}`
 
//        setNodeAttributes(lastItem, currentItem)
//    } else {
//        const lastItem = `.item-${currentItemPosition}`
      
//        currentItemPosition = 2
//        const currentItem = `.item-${currentItemPosition}`
      
//        setNodeAttributes(lastItem, currentItem)
//    }
// }
 
 
// const setNodeAttributes = (lastItem, currentItem) => {
//    $(lastItem).css('display', 'none')
//    $(currentItem).css('display', 'block')
//    $(lastItem).attr('aria-hidden', 'true')
//    $(currentItem).attr('aria-hidden', 'false')
// }
 
 
// // Events
// prevBtn.click(function() {
//    goToPreviousSlide()
// })
 
// nextBtn.click(function() {
//    goToNextSlide()
// })
 
 
// $(document).keydown(function(e) {
//    const keyCode = e.keyCode ? e.keyCode : e.which
 
//    if (keyCode === 39) {
//        goToNextSlide()
//    } else if (keyCode === 37) {
//        goToPreviousSlide()
//    }
// })
 
// carouselPauseBtn.on('click', function() {
//    clearInterval(carouselInterval)
// })
 
 
// $(document).ready(function() {
//    carouselInterval = setInterval(() => goToNextSlide(), 5000)
// })