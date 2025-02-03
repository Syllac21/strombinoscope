// const select = document.getElementById('select');

// // selecteur de catégorie
// fetchPromo().then((listPromo) => {
//     const options = listPromo.map(promo => promo.slug);
//     const optionsText = options.map(promo =>`<option value = "${promo}">${promo}</option>`).join('');

//     const textSelector = `<select name="categories" id="categories">
//         <option value="">---</option>
//         ${optionsText}</select>`;
//     select.innerHTML = textSelector;
// })

// recupérer la liste des stagiaires
async function recupList() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants/?per_page=100');
    const listStagiaires = await reponse.json();
    console.log(listStagiaires);
    return listStagiaires;
}
recupList().then((listStagiaires)=>{
    const grid = document.getElementById('grid');
    listStagiaires.forEach(stagiaire => {
        // console.log(stagiaire.nom);
        grid.innerHTML+=createCard(stagiaire);
    });
})


function createCard(stagiaire){
        let textCard =`<div class="card">
                    <h4>${stagiaire.prenom} ${stagiaire.nom}  ${stagiaire.promo ? stagiaire.promo.slug : ''}</h4>
                    <img src="${stagiaire.image}" alt="${stagiaire.nom}">
                    <p>${stagiaire.excerpt.rendered}</p>
                    <button type="button" class="portfolio">Portfolio</button>
                    <button type="button" class="cv">cv</button>
                    <img src="" alt="">
                </div>`;
        return textCard;
}



    async function fetchCompetences() {
        try {
            const response = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/competences');
            return response.json();
        } catch (error) {
            console.error("Error fetching promotions:", error);
        }
    }

    
    async function filterCompetences() {
        const competences = await fetchCompetences();

        // const frontChecked = document.getElementById("front").checked;
        // const backChecked = document.getElementById("back").checked;

        // const filtered = promotions.filter(promo => {
        //     if (frontChecked && promo.slug.includes("front")) return true;
        //     if (backChecked && promo.slug.includes("back")) return true;
        //     return !frontChecked && !backChecked; 
        // });

        
        const resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = competences
            .map(competence => `<div><label>${competence.name}</label>
            <input type="checkbox" id="competence-${competence.name}" name="${competence.name}" value="${competence.name}" class="check"></div>
            `)
        .join("");
}

    
    // document.getElementById("front").addEventListener("change", filterPromotions);
    // document.getElementById("back").addEventListener("change", filterPromotions);

    
    filterCompetences();




    async function fetchPromo(){
        try{
            const response = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
            const promotions = await response.json();
            const listPromo =[]

            promotions.forEach(promo => {

                listPromo.push({
                    id: promo.id,
                    slug: promo.slug
                });
            });
            console.log(listPromo);
            return listPromo;
        }catch (error){
            console.log("Error fetching promotion:",error);
        }
    }


    
    let filterPromo = '';
    let listStagiaires = []; 

    async function fetchPromo() {
        const response = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
        return response.json();
    }

    const select = document.getElementById('select');

    fetchPromo().then((listPromo) => {
        listPromo.forEach(promo => {
            const option = document.createElement('option');
            console.log(promo);
            option.setAttribute('value', promo.id)
            // option.value = promo.slug;
            option.textContent = promo.slug;
            select.appendChild(option);
            select.appendChild(option);
        });
    });

    async function fetchStagiers() {
        const response = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants/?per_page=100');
        return response.json();  // Fetch stagiers
    }

    
    fetchStagiers().then((stagiers) => {
        listStagiaires = stagiers; 
        
        const grid = document.getElementById('grid');
        grid.innerHTML ='';
        listStagiaires.forEach(stagiaire => {
            grid.innerHTML += createCard(stagiaire);  
        });

    select.addEventListener('change', (event) => {
        const selectedId = event.target.value;
        filterPromo = selectedId;
        filterList(listStagiaires, filterPromo);
    });
});


    function filterList(listStagiaires, filterPromo) {
        const filteredList = [];
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
    
        for (let i = 0; i < listStagiaires.length; i++) {
            const stagiaire = listStagiaires[i];
    
            if (stagiaire.promotions[0] === Number(filterPromo)) {
                console.log('ok')
                filteredList.push(stagiaire);
            }
        }
        console.log("Filtered List:", filteredList);
        filteredList.forEach(stagiaire => {
            grid.innerHTML += createCard(stagiaire);  
        });
    }



    


    




