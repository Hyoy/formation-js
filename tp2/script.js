document.getElementById("calculer").addEventListener("click", function () {
    const poids = parseFloat(document.getElementById("poids").value);
    const taille = parseFloat(document.getElementById("taille").value);
  
    if (isNaN(poids) || isNaN(taille) || poids <= 0 || taille <= 0) {
      alert("Veuillez entrer des valeurs valides.");
      return;
    }
  
    const imc = poids / (taille * taille);
    let categorie = "";
    let couleur = "";
  
    if (imc < 18.5) {
      categorie = "Maigreur";
      couleur = "#f0e68c";
    } else if (imc < 25) {
      categorie = "Normal";
      couleur = "#90ee90";
    } else if (imc < 30) {
      categorie = "Surpoids";
      couleur = "#ffa07a";
    } else if (imc < 35) {
      categorie = "Obésité modérée";
      couleur = "#ff4500";
    } else if (imc < 40) {
      categorie = "Obésité sévère";
      couleur = "#ff6347";
    } else {
      categorie = "Obésité morbide";
      couleur = "#ff0000";
    }
  
    const poidsIdeal = (24.9 * taille * taille).toFixed(1);
    const differencePoids = (poids - poidsIdeal).toFixed(1);
    const perteOuGain = differencePoids > 0 ? `à perdre : ${Math.abs(differencePoids)} kg` : `à gagner : ${Math.abs(differencePoids)} kg`;
  
    const resultatDiv = document.getElementById("resultat");
    resultatDiv.style.display = "block";
    resultatDiv.style.backgroundColor = couleur;
    resultatDiv.innerHTML = `
      <div>IMC : ${imc.toFixed(1)}</div>
      <div>${categorie}</div>
      <div>Objectif : ${poidsIdeal}kg (${perteOuGain})</div>
    `;
  });
  