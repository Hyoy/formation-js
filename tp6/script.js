const firebaseUrl = 'https://firebaise-96d1f-default-rtdb.europe-west1.firebasedatabase.app/personnes';
const tableBody = document.querySelector("#tableBody");
const prenomInput = document.querySelector("#prenom");
const nomInput = document.querySelector("#nom");
const ajouterButton = document.querySelector("#btnAjouter");
const searchInput = document.querySelector("#search");


async function ajouterPersonne(personne) {
  try {
    const response = await axios.post(`${firebaseUrl}.json`, personne);
    console.log("Personne ajoutée avec ID :", response.data.name);
    return response.data.name;
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
}

async function modifierPersonne(id, data) {
  try {
    const response = await axios.patch(`${firebaseUrl}/${id}.json`, data);
    console.log("Personne modifiée :", response.data);
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
  }
}


async function supprimerPersonne(id) {
  try {
    const response = await axios.delete(`${firebaseUrl}/${id}.json`);
    console.log("Personne supprimée :", response.data);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
}


async function listerPersonnes() {
  try {
    const response = await axios.get(`${firebaseUrl}.json`);
    const personnes = response.data;
    return Object.keys(personnes || {}).map((id) => ({
      id,
      ...personnes[id],
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return [];
  }
}

async function afficherPersonnes() {
  const personnes = await listerPersonnes();
  tableBody.innerHTML = "";
  personnes.forEach((personne) => {
    const row = document.createElement("tr");
    row.className = personne.status ? "table-success" : "table-danger";

    row.innerHTML = `
      <td>${personne.prenom}</td>
      <td>${personne.nom}</td>
      <td>${personne.status ? "Actif" : "Inactif"}</td>
      <td>
        <button class="btn btn-danger" data-id="${personne.id}" data-action="supprimer">
          <i class="fa fa-trash"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" data-id="${personne.id}" data-action="changerStatut">
          <i class="fa fa-check"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


ajouterButton.addEventListener("click", async () => {
  const prenom = prenomInput.value.trim();
  const nom = nomInput.value.trim();

  if (prenom && nom) {
    const nouvellePersonne = { prenom, nom, status: true };
    await ajouterPersonne(nouvellePersonne);
    afficherPersonnes();
    prenomInput.value = "";
    nomInput.value = "";
  } else {
    alert("Veuillez remplir les champs Prénom et Nom.");
  }
});


tableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.action;

  if (action === "supprimer") {
    await supprimerPersonne(id);
    afficherPersonnes();
  } else if (action === "changerStatut") {
    await modifierPersonne(id, { status: false });
    afficherPersonnes();
  }
});


searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const personnes = await listerPersonnes();
  const filteredPersonnes = personnes.filter(
    (p) =>
      p.prenom.toLowerCase().includes(searchTerm) ||
      p.nom.toLowerCase().includes(searchTerm)
  );

  tableBody.innerHTML = "";
  filteredPersonnes.forEach((personne) => {
    const row = document.createElement("tr");
    row.className = personne.status ? "table-success" : "table-danger";

    row.innerHTML = `
      <td>${personne.prenom}</td>
      <td>${personne.nom}</td>
      <td>${personne.status ? "Actif" : "Inactif"}</td>
      <td>
        <button class="btn btn-danger" data-id="${personne.id}" data-action="supprimer">
          <i class="fa fa-trash"></i>
        </button>
      </td>
      <td>
        <button class="btn btn-warning" data-id="${personne.id}" data-action="changerStatut">
          <i class="fa fa-check"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
});


afficherPersonnes();
