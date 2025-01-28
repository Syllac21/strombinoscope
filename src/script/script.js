async function recupList() {
    const reponse = await fetch('http://portfolios.ruki5964.odns.fr/wp-json/wp/v2/apprenants');
    const ListStagiaires = await reponse.json();
    console.log(ListStagiaires);
}
recupList();