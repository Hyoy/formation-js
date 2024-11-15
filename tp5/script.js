const tableau = JSON.parse(localStorage.getItem('fruits')) || []; 

document.addEventListener('DOMContentLoaded', () => {
  mettreAJourTableau(); 
});

document.getElementById('btnAjouter').addEventListener('click', function() {
  const fruitInput = document.getElementById('fruit');
  const fruitValue = fruitInput.value.trim();

  if (fruitValue !== '') {
    tableau.push(fruitValue); 
    sauvegarderDansLocalStorage(); 
    mettreAJourTableau(); 
    fruitInput.value = ''; 
  }
});

function mettreAJourTableau() {
  const tbody = document.getElementById('myTbody');
  tbody.innerHTML = ''; 

  const template = document.querySelector("#idTemplate");

  tableau.forEach((fruit) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("td").innerText = fruit;

    clone.querySelector('.btn-danger').onclick = function() {
      supprimerFruit(this);
    };

    tbody.appendChild(clone);
  });
}

function supprimerFruit(button) {
  const row = button.closest('tr');
  const fruit = row.querySelector('td').innerText;
  const index = tableau.indexOf(fruit);

  if (index !== -1) {
    tableau.splice(index, 1); 
    sauvegarderDansLocalStorage(); 
    mettreAJourTableau(); 
  }
}

function sauvegarderDansLocalStorage() {
  localStorage.setItem('fruits', JSON.stringify(tableau)); 
}
