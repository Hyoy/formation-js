
class Personne {
    constructor(prenom, nom, status = true) {
      this.prenom = prenom;
      this.nom = nom;
      this.status = status;
    }
  }
  
  
  let personnes = JSON.parse(localStorage.getItem("personnes")) || [];
  

  const prenomInput = document.querySelector("input[placeholder='Prénom']");
  const nomInput = document.querySelector("input[placeholder='Nom']");
  const ajouterButton = document.querySelector(".btn-success");
  const tableBody = document.querySelector("tbody");
  
 
  function afficherPersonnes() {
    tableBody.innerHTML = ""; 
    personnes.forEach((personne, index) => {
      const row = document.createElement("tr");
      row.className = personne.status ? "table-success" : "table-danger";
      row.dataset.indice = index;
  
      row.innerHTML = `
        <td>${personne.prenom}</td>
        <td>${personne.nom}</td>
        <td>
          <button class="btn btn-danger" data-action="supprimer">
            <i class="fa fa-trash"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-warning" data-action="changerStatut">
            <i class="fa fa-check"></i>
          </button>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  
  function ajouterPersonne() {
    const prenom = prenomInput.value.trim();
    const nom = nomInput.value.trim();
  
    if (prenom && nom) {
      const nouvellePersonne = new Personne(prenom, nom);
      personnes.push(nouvellePersonne);
      mettreAJourLocalStorage();
      afficherPersonnes();
      prenomInput.value = "";
      nomInput.value = "";
    } else {
      alert("Veuillez remplir les champs Prénom et Nom.");
    }
  }
  
 
  function enleverPersonne(index) {
    personnes.splice(index, 1);
    mettreAJourLocalStorage();
    afficherPersonnes();
  }
  

  function changerStatut(index) {
    personnes[index].status = !personnes[index].status;
    mettreAJourLocalStorage();
    afficherPersonnes();
  }
  

  function mettreAJourLocalStorage() {
    localStorage.setItem("personnes", JSON.stringify(personnes));
  }
  

  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
  
    const row = button.closest("tr");
    const index = row.dataset.indice;
    const action = button.dataset.action;
  
    if (action === "supprimer") {
      enleverPersonne(index);
    } else if (action === "changerStatut") {
      changerStatut(index);
    }
  });
  

  ajouterButton.addEventListener("click", ajouterPersonne);
  

  afficherPersonnes();
  