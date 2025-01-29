const select = document.getElementById('select');
let filterComp = [];
let filterPromo = '';

// récupération des promotions
async function fetchPromo() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
    const listPromo = await reponse.json();
    return listPromo;
    
}

// selecteur de promotion
fetchPromo().then((listPromo) => {
    // const options = listPromo.map(promo => promo.slug);
    console.log(listPromo);
    const optionsText = listPromo.map(promo =>`<option value = "${promo.id}">${promo.slug}</option>`).join('');

    const textSelector = `<select name="promotions" id="promotions">
        <option value="">---</option>
        ${optionsText}</select>`;
    select.innerHTML = textSelector;
    //écouter la liste déroulante et filtrer
    const selectPromo = document.getElementById('promotions');
    selectPromo.addEventListener('change', ()=>{
       
            filterPromo = selectPromo.value;
            console.log(filterPromo);
            filterStudent();
        
    })
})

// recupérer la liste des stagiaires
async function recupList() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants/?per_page=100');
    const listStagiaires = await reponse.json();
    // console.log(listStagiaires);
    return listStagiaires;
}

filterCompetences();
recupList().then((listStagiaires)=>{
    const grid = document.getElementById('grid');
    fetchCompetences().then((competences)=>{
        listStagiaires.forEach(stagiaire => {
            fetchPromo().then((listPromo)=>{
                grid.innerHTML+=createCard(stagiaire, competences, listPromo);
            })
            // console.log(stagiaire.nom);
        });
    })
    
})

function createCard(stagiaire, competences, listPromo){
        let textCard =`<div class="card">
                    <h4>${stagiaire.prenom} ${stagiaire.nom}  ${textPromo(listPromo,stagiaire.promotions)}</h4>
                    <img src="${stagiaire.image}" alt="${stagiaire.nom}">
                    <p>${stagiaire.excerpt.rendered}</p>
                    <p>compétences : ${listeComp(competences,stagiaire.competences)}</p>
                    <button type="button" class="portfolio">Portfolio</button>
                    <button type="button" class="cv">cv</button>
                    
                </div>`;
        return textCard;
}
function textPromo(listPromo,promo){
    let slugPromo = '';
    // console.log(listPromo);
    listPromo.forEach((promotion)=>{
        if(promotion.id === promo[0]){
            slugPromo = promotion.slug;
        }
    })
    return slugPromo;
}

function listeComp(competences, comps){
    let listComp ='';
    comps.forEach(comp => {
        competences.forEach(competences=>{
            if(comp === competences.id){
                listComp += competences.name;
                listComp += ' ';
            }
        })

    })
    return listComp;

}

//récupérer la liste des compétences
async function fetchCompetences() {
    try {
        const response = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/competences');
        return response.json();
    } catch (error) {
        console.error("Error fetching promotions:", error);
    }
}

//afficher la liste des compétences
async function filterCompetences() {
    const competences = await fetchCompetences();
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = competences
        .map(competence => `<label>${competence.name}</label>
        <input type="checkbox" id="competence-${competence.name}" name="${competence.name}" value="${competence.id}" class="check">
        `)
    .join("<br>");

    //écouter les checkbox et filtrer
    const checkbox = document.querySelectorAll('.check');
    checkbox.forEach(check =>{
        check.addEventListener('change',()=>{
            if(check.checked){
                filterComp.push(check.value);
                filterStudent();
            }else{
                filterComp = filterComp.filter(function(f){return f !== check.value});
                filterStudent();
            }
        })
    })
}



// filtre de la liste
async function filterStudent() {
    try {
        const listStagiaires = await recupList();
        let list = listStagiaires;

        // Filtrer par compétences
        if (filterComp.length > 0) {
            list = list.filter(stagiaire =>
                filterComp.every(comp => stagiaire.competences.includes(Number(comp)))
            );
        }

        // Filtrer par promotion
        if (filterPromo !== '') {
            list.forEach((stagiaire)=>{
                console.log(Number(filterPromo),stagiaire.promotions[0])
                list = list.filter(stagiaire => stagiaire.promotions[0] === Number(filterPromo));
                
            })
        }

        // Affichage de la liste filtrée
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        const competences = await fetchCompetences();
        const listPromo = await fetchPromo();

        list.forEach(stagiaire => {
            grid.innerHTML += createCard(stagiaire, competences, listPromo);
        });
    } catch (error) {
        console.error('Erreur lors du filtrage des stagiaires:', error);
    }
}
    
