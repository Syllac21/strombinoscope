const select = document.getElementById('select');
let filterComp = [];

// récupération des catégories
async function fetchPromo() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
    const listPromo = await reponse.json();
    return listPromo;
    
}

// selecteur de catégorie
fetchPromo().then((listPromo) => {
    // console.log(listPromo[0]);
    const options = listPromo.map(promo => promo.slug);
    const optionsText = options.map(promo =>`<option value = "${promo}">${promo}</option>`).join('');

    const textSelector = `<select name="categories" id="categories">
        <option value="">---</option>
        ${optionsText}</select>`;
    select.innerHTML = textSelector;
})

// recupérer la liste des stagiaires
async function recupList() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants/?per_page=100');
    const listStagiaires = await reponse.json();
    console.log(listStagiaires);
    return listStagiaires;
}
recupList().then((listStagiaires)=>{
    const grid = document.getElementById('grid');
    filterCompetences();
    fetchCompetences().then((competences)=>{
        listStagiaires.forEach(stagiaire => {
            // console.log(stagiaire.nom);
            grid.innerHTML+=createCard(stagiaire, competences);
        });
    })
    
})

function createCard(stagiaire, competences){
        let textCard =`<div class="card">
                    <h4>${stagiaire.prenom} ${stagiaire.nom}  2024</h4>
                    <img src="${stagiaire.image}" alt="${stagiaire.nom}">
                    <p>${stagiaire.excerpt.rendered}</p>
                    <p>compétences : ${listeComp(competences,stagiaire.competences)}</p>
                    <button type="button" class="portfolio">Portfolio</button>
                    <button type="button" class="cv">cv</button>
                    
                </div>`;
        return textCard;
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
    const checkbox = document.querySelectorAll('.check');
    console.log(checkbox);
    checkbox.forEach(check =>{
        check.addEventListener('change',(e)=>{
            if(check.checked){
                filterComp.push(check.value);
                console.log(filterComp);
                filter();
            }
        })
    })
}

//filtre de la liste
function filter(){
    if(filterComp )
}
