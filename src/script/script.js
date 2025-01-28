const select = document.getElementById('select');

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
    listStagiaires.forEach(stagiaire => {
        // console.log(stagiaire.nom);
        grid.innerHTML+=createCard(stagiaire);
    });
})

function createCard(stagiaire){
        let textCard =`<div class="card">
                    <h4>${stagiaire.prenom} ${stagiaire.nom}  2024</h4>
                    <img src="${stagiaire.image}" alt="${stagiaire.nom}">
                    <p>${stagiaire.excerpt.rendered}</p>
                    <button type="button" class="portfolio">Portfolio</button>
                    <button type="button" class="cv">cv</button>
                    <img src="" alt="">
                </div>`;
        return textCard;
}
    // ListStagiaires.forEach(stagiaire => {
    //             let apprenant = {"nom"=> stagiaire.nom}
    // });
