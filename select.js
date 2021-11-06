window.onload = () => {
    console.log("mamamamamaam")
    //Récuperation du select
    const selectElement = document.querySelector("select");

    //Récupurétion 1ère div "select-filter"
    const selectDiv = document.querySelector(".select-filter");

    //Création nouveau select
    const newFilterSelected = document.createElement("div");

    //Ajout de la classe "new-select"
    newFilterSelected.classList.add("select-filter-selected");

    //Ajout de l'option actuellement choisie dans le select
    console.log(selectElement.selectedIndex)
    newFilterSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;

    //Création de l'élément dans le DOM
    selectDiv.appendChild(newFilterSelected);

    //Création menu déroulant
    const menuDeroulant = document.createElement("div");
    menuDeroulant.classList.add("select-filter-items", "select-hide");

    //Boucle sur les options dans le select et les copier dans la div
    for(let option of selectElement.options) {
        console.log(option)
        //Création div pour cette option
        const newOption = document.createElement("div");

        //on copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;

        //ajout de l'écouteur d'événement "clic" sur l'option
        newOption.addEventListener("click", function() {
            //boucle sur chacune des options du select original
            for(let option of selectElement.options) {
                if(option.innerHTML === this.innerHTML) {
                    //on active la bonne option dans le select
                    selectElement.selectedIndex = option.index;
                    console.log(selectElement);
                    //on change le contenu et le titre du newFilterSelected
                    newFilterSelected.innerHTML = this.innerHTML;
                    console.log(this.innerHTML)
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
    selectDiv.appendChild(menuDeroulant)

    //Ajout de l'écouteur d'événements click sur newFilterSelected
    newFilterSelected.addEventListener("click", function(e) {
        //on empêche la propagation du clic
        e.stopPropagation();

        //retrait du select-hide du menu
        this.nextSibling.classList.toggle("select-hide");
        
        //ajout de la classe active à newFilterSelected pour changer le sens de la flèche
        this.classList.toggle("active")

        //modifie l'attribut contenteditable
        if(this.getAttribute("contenteditable") == "true") {
            this.setAttribute("contenteditable", "false");
        }
        else {
            this.setAttribute("contenteditable", "true");
            //focus au champ
            this.focus
        }
    })

    //filtre de contenu
    // newFilterSelected.addEventListener("change", function() {
    //     let change = this.
    // })





}