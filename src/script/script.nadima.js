const select = document.getElementById('select');
const searchbar = document.getElementById('search');
let filterComp = [];
let filterPromo = '';
let filterText ='';

//récupérer la liste des compétences
async function fetchCompetences() {
    try {
        const response = await fetch('https://api-trombi.webedy.fr/wp-json/wp/v2/competences/');
        return response.json();
    } catch (error) {
        console.error("Error fetching promotions:", error);
    }
}

// récupération des promotions
async function fetchPromo() {
    const reponse = await fetch('https://api-trombi.webedy.fr/wp-json/wp/v2/promotions/');
    
    const listPromo = await reponse.json();
    // console.log(listPromo);
    
    return listPromo;
    
}

// recupérer la liste des stagiaires
async function recupList() {
    
    const reponse = await fetch('https://api-trombi.webedy.fr/wp-json/wp/v2/apprenants/?per_page=100');
    const listStagiaires = await reponse.json();
    return listStagiaires;
}


recupList().then((listStagiaires)=>{
    const grid = document.getElementById('grid');
    fetchCompetences().then((competences)=>{
        listStagiaires.forEach(stagiaire => {
            fetchPromo().then((listPromo)=>{
                grid.innerHTML+=createCard(stagiaire, competences, listPromo);
                filterCompetences(listStagiaires, competences, listPromo);
            })
        });
    })
    
})

function createCard(stagiaire, competences, listPromo){
        let textCard =`<div class="card">
                    <h4>${stagiaire.prenom} ${stagiaire.nom}  ${textPromo(listPromo,stagiaire.promotions)}</h4>
                    <img src="${stagiaire.image}" alt="${stagiaire.nom}">
                    <p>${stagiaire.excerpt.rendered}</p>
                    <p>compétences : ${listeComp(competences,stagiaire.competences)}</p>
                    <a href=${stagiaire.portfolio} target="_blank">Portfolio</a>
                    
                    ${stagiaire.cv?`<a href=${stagiaire.cv} target="_blank">CV</a>`:''}
                    
                    
                </div>`;
        return textCard;
}

//afficher la liste des compétences
async function filterCompetences(listStagiaires, competences, listPromo) {
    
    // const competences = await fetchCompetences();
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = competences
    .map(competence => `<label>${competence.name}</label>
        <input type="checkbox" id="competence-${competence.name}" name="${competence.name}" value="${competence.id}" class="check">
        `)
        .join("");
<<<<<<< HEAD
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
=======
>>>>>>> c912dbe3ec9b800b32f32ea166a47cf209163e14
        
    //écouter les checkbox et filtrer
    const checkbox = document.querySelectorAll('.check');
    checkbox.forEach(check =>{
        check.addEventListener('change',()=>{
            if(check.checked){
                filterComp.push(check.value);
                filterStudent(listStagiaires,competences,listPromo);
            }else{
                filterComp = filterComp.filter(function(f){return f !== check.value});
                filterStudent(listStagiaires,competences,listPromo);
            }
        })
    })
    
    //création du sélécteur de promo
    const optionsText = listPromo.map(promo =>`<option value = "${promo.id}">${promo.slug}</option>`).join('</br>');
    
    const textSelector = `<select name="promotions" id="promotions">
    <option value="">- - -</option>
    ${optionsText}</select>`;
    select.innerHTML = textSelector;
    
    //écouter la liste déroulante et filtrer
    const selectPromo = document.getElementById('promotions');
    console.log(selectPromo);
    selectPromo.addEventListener('change', ()=>{
        
        filterPromo = selectPromo.value;
        console.log(filterPromo);
        filterStudent(listStagiaires,competences,listPromo);
        
    })
    
        //écouter la searchbar
        searchbar.addEventListener('input',()=>{
            filterText = searchbar.value;
            setTimeout(()=>{
                filterStudent(listStagiaires,competences,listPromo);
            },500);
        })
    }
    
    
    
    // filtre de la liste
    function filterStudent(listStagiaires,competences,listPromo) {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';
        try {
            // const listStagiaires = await recupList();
            let list = listStagiaires;
            
            // Filtrer par compétences
            if (filterComp.length > 0) {
                list = list.filter(stagiaire =>
                    filterComp.every(comp => stagiaire.competences.includes(Number(comp)))
                );
        }
        
        // Filtrer par promotion
        if (filterPromo !== '') {
            list = list.filter(stagiaire => stagiaire.promotions[0] === Number(filterPromo));
        }

        //Filtrer par texte
        if(filterText !== ''){
            const filterTextMin = filterText.toLowerCase();
            list = list.filter(stagiaire =>stagiaire.slug.includes(filterTextMin));
            console.log(list);
        }
        
        // Affichage de la liste filtrée
        
        list.forEach(stagiaire => {
            grid.innerHTML += createCard(stagiaire, competences, listPromo);
        });
    } catch (error) {
        console.error('Erreur lors du filtrage des stagiaires:', error);
    }
}

function textPromo(listPromo,promo){
    let slugPromo = '';
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