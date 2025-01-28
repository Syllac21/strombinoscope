// récupération des catégories
async function fetchCat() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/promotions');
    const listPromo = await reponse.json();
    
    return listPromo;
    
}
// selecteur de catégorie
fetchCat().then((listPromo) => {
    const options = listPromo.map(promo => options.slug);

    const textSelector = `<select name="categories" id="categories">
        <option value="">---</option>
        ${options}</select>`;
    select.innerHTML = textSelector;
    
})

// recupérer la liste des stagiaires
async function recupList() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants');
    const ListStagiaires = await reponse.json();
    console.log(ListStagiaires);
}
recupList().then((ListStagiaires)=>{
    console.log(ListStagiaires)
    let table = [];

})
    // ListStagiaires.forEach(stagiaire => {
    //             let apprenant = {"nom"=> stagiaire.nom}
    // });
