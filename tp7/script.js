const CLE_API = "efdc2275";
let series = [];
let seriesFavorites = [];


if (localStorage.getItem("favoris")) {
  seriesFavorites = JSON.parse(localStorage.getItem("favoris"));
  afficherFavoris();
}


async function rechercherSeries(query) {
  if (!query) return;
  const reponse = await fetch(`http://www.omdbapi.com/?apikey=${CLE_API}&s=${query}`);
  const donnees = await reponse.json();

  if (donnees.Response === "True") {
    series = donnees.Search;
    afficherResultatsRecherche();
  } else {
    series = [];
    alert("Aucune série trouvée !");
    afficherResultatsRecherche();
  }
}


async function obtenirNoteImdb(imdbID) {
  const reponse = await fetch(`http://www.omdbapi.com/?apikey=${CLE_API}&i=${imdbID}`);
  const donnees = await reponse.json();
  return donnees.imdbRating || "N/A";
}


function afficherResultatsRecherche() {
  const tbody = document.querySelector(".table-striped tbody");
  tbody.innerHTML = "";

  series.forEach((serie) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${serie.Title}</td>
      <td>${serie.Year}</td>
      <td><img src="${serie.Poster}" alt="${serie.Title}" width="80"></td>
      <td class="align-middle">
        <button class="btn btn-outline-secondary" onclick="ajouterAuxFavoris('${serie.imdbID}')">
          <i class="fa fa-plus"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


async function ajouterAuxFavoris(imdbID) {
  const serie = series.find((s) => s.imdbID === imdbID);
  if (!serie) return;

 
  serie.imdbRating = await obtenirNoteImdb(imdbID);

  seriesFavorites.push(serie); 
  localStorage.setItem("favoris", JSON.stringify(seriesFavorites)); 

  series = series.filter((s) => s.imdbID !== imdbID);
  afficherResultatsRecherche();
  afficherFavoris();
}


function afficherFavoris() {
  const tbody = document.querySelector(".offset-3 .table-striped tbody");
  tbody.innerHTML = "";

  seriesFavorites.forEach((serie) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${serie.Title}</td>
      <td>${serie.Year}</td>
      <td>${serie.imdbRating}</td>
      <td><img src="${serie.Poster}" alt="${serie.Title}" width="80"></td>
      <td class="align-middle">
        <button class="btn btn-outline-danger" onclick="supprimerDesFavoris('${serie.imdbID}')">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


function supprimerDesFavoris(imdbID) {
  seriesFavorites = seriesFavorites.filter((serie) => serie.imdbID !== imdbID);
  localStorage.setItem("favoris", JSON.stringify(seriesFavorites)); 
  afficherFavoris();
}


document.querySelector(".btn-success").addEventListener("click", () => {
  const input = document.querySelector(".form-control");
  const query = input.value.trim();
  rechercherSeries(query);
});
