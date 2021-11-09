//window.onload = () => {
    
//     const body = document.getElementById("body");1
//     modaleBouton;2
//     const main = document.getElementById("main");3
//     modaleFormulaire;4
//     const modaleTitre = document.querySelector(".formulaire__titre")5
//     modaleClose;6


//     const onOpenModal = () => {
//         main.setAttribute('aria-hidden', 'true');
//         modaleFormulaire.setAttribute('aria-hidden', 'false');
//         body.classList.add('no-scroll');
//         modaleClose.focus();
//         //modaleFormulaire.style.display = 'flex';
//     }
//     const onCloseModal = () => {
//         main.setAttribute('aria-hidden', 'false');
//         modaleFormulaire.setAttribute('aria-hidden', 'true');
//         body.classList.remove('no-scroll');
//         modaleBouton.focus();
//         //modaleFormulaire.style.display = 'none';
//     }

//    // Event
//    modaleBouton.addEventListener("click", onOpenModal);
//    modaleClose.addEventListener("click", onCloseModal);

//    //Fermeture modale avec echap
//    document.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape') {
//       onCloseModal;
//     }
//   })


//}

//VERIFICATION ET VALIDATION DU FORMULAIRE

// var modaleFormulaire = document.querySelector('.conteneur-modale');//4
// const modaleClose = document.querySelector('.close');//6
// const body = document.getElementById("body");//1
// const main = document.getElementById("main");//3
// const modaleTitre = document.querySelector(".formulaire__titre")//5
// const modaleBouton = document.querySelector('.boutonContact');//2

// // Appel fonction d'affichage de la modale
// modaleBouton.addEventListener("click", affichageModale);

// //appel de la fonction close modal
// modaleClose.addEventListener("click", closeModal);

// //Affichage modale
// function affichageModale() {
//     modaleFormulaire.style.display = "block";
//     main.setAttribute('aria-hidden', 'true');
//     modaleFormulaire.setAttribute('aria-hidden', 'false');
//     body.classList.add('no-scroll');
//     modaleClose.focus();
// }

// //fermeture de la modale
// function closeModal() {
//     modaleFormulaire.style.display = "none";
//     main.setAttribute('aria-hidden', 'false');
//     modaleFormulaire.setAttribute('aria-hidden', 'true');
//     body.classList.remove('no-scroll');
//     modaleBouton.focus();
// }
// //Fermeture modale avec echap
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape') {
//         closeModal;
//     }
// })