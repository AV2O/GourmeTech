function initMenuBurger() {
  // Trouve les boutons
  const burger = document.getElementById("burgerMenu");
  const menu = document.querySelector(".nav");

  // Toggle au clic
  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("menu-open");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // THÈME
  const body = document.body;
  const boutonTheme = document.getElementById("theme-toggle");

  // Charge thème précédent
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }

  // Change thème
  boutonTheme.addEventListener("click", function () {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  // BURGER
  initMenuBurger();

  // FAVORIS
  document.querySelectorAll(".favori-btn").forEach((btn) => {
    const id = btn.parentElement.dataset.id;
    let favoris = [];
    const stockes = localStorage.getItem("favoris");
    if (stockes) {
      favoris = JSON.parse(stockes);
    }
    if (favoris.includes(id)) {
      btn.textContent = "❤️";
    } else {
      btn.textContent = "🩶";
    }

    // CLIC
    btn.addEventListener("click", function () {
      const id = this.parentElement.dataset.id;
      let favoris = [];
      const stockes = localStorage.getItem("favoris");
      if (stockes) {
        favoris = JSON.parse(stockes);
      }

      if (this.textContent === "🩶") {
        this.textContent = "❤️";
        favoris.push(id);
      } else {
        this.textContent = "🩶";
        favoris = favoris.filter((x) => x !== id);
      }
      localStorage.setItem("favoris", JSON.stringify(favoris));
    });
  });

  // === PAGE FAVORIS ===
  if (window.location.pathname.includes("favoris.html")) {
    const zone = document.getElementById("mes-favoris");

    let favoris = JSON.parse(localStorage.getItem("favoris") || "[]");

    if (favoris.length === 0) {
      zone.innerHTML = `
        <div class="aucun-favori">
            <p>📭 Aucun favori pour le moment</p>
            <p><a href="index.html">← Ajouter depuis accueil</a></p>
        </div>
      `;
    } else {
      let html = '<div class="container-recipe">';

      if (favoris.includes("1")) {
        html +=
          '<article class="recipe"><img src="assets/images/tarte_aux_pommes.jpg" alt="Tarte"><h2>Tarte aux pommes</h2><div><p>Dessert</p><p>60 min</p><p>Facile</p></div><a href="recette.html">Voir</a><button class="favori-btn" data-favori="1">❤️</button></article>';
      }
      if (favoris.includes("2")) {
        html +=
          '<article class="recipe"><img src="assets/images/ratatouille.jpg" alt="Ratatouille"><h2>Ratatouille</h2><div><p>Plat</p><p>45 min</p><p>Moyen</p></div><a href="recette.html">Voir</a><button class="favori-btn" data-favori="2">❤️</button></article>';
      }
      if (favoris.includes("3")) {
        html +=
          '<article class="recipe"><img src="assets/images/Veloute.jpg" alt="Velouté"><h2>Velouté potiron</h2><div><p>Entrée</p><p>30 min</p><p>Facile</p></div><a href="recette.html">Voir</a><button class="favori-btn" data-favori="3">❤️</button></article>';
      }

      html += "</div>";
      zone.innerHTML = html;

      // SUPPRESSION FAVORIS
      document.querySelectorAll(".favori-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.dataset.favori;
          let favoris = JSON.parse(localStorage.getItem("favoris") || "[]");
          this.textContent = "🩶";
          favoris = favoris.filter((x) => x !== id);
          localStorage.setItem("favoris", JSON.stringify(favoris));
          location.reload();
        });
      });
    }
  }

  // ———— FILTRES RECETTES ————
  const inputRecherche = document.getElementById("recherche-recette");
  const recettes = document.querySelectorAll(".recipe");

  if (inputRecherche && recettes.length > 0) {
    // ← PROTÉGÉ

    function filtrerRecettes() {
      if (!inputRecherche) return;

      const mot = inputRecherche.value.toLowerCase();

      const categories = Array.from(
        document.querySelectorAll("input[data-categorie]:checked"),
      ).map((cb) => cb.dataset.categorie);

      const tempsFiltres = Array.from(
        document.querySelectorAll("input[data-time]:checked"),
      ).map((cb) => cb.dataset.time);

      const difficultes = Array.from(
        document.querySelectorAll("input[data-difficulte]:checked"),
      ).map((cb) => cb.dataset.difficulte);

      recettes.forEach(function (recette) {
        const texte = recette.textContent.toLowerCase();

        const categorieOk =
          categories.length === 0 ||
          categories.includes(recette.dataset.categorie);
        const tempsOk =
          tempsFiltres.length === 0 ||
          tempsFiltres.includes(recette.dataset.temps);
        const difficulteOk =
          difficultes.length === 0 ||
          difficultes.includes(recette.dataset.difficulte);

        if (
          (mot === "" || texte.includes(mot)) &&
          categorieOk &&
          tempsOk &&
          difficulteOk
        ) {
          recette.classList.remove("hidden");
        } else {
          recette.classList.add("hidden");
        }
      });
    }

    // Écouteurs SÉCURISÉS
    filtrerRecettes();
    inputRecherche.addEventListener("input", filtrerRecettes);

    document
      .querySelectorAll("input[type='checkbox']")
      .forEach((cb) => cb.addEventListener("change", filtrerRecettes));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nom = document.getElementById('nom');
  const email = document.getElementById('email');
  const consent = document.getElementById('consentement');
  const spans = form.querySelectorAll('.error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset erreurs
    spans.forEach(span => span.textContent = '');
    
    let ok = true;
    
    // Nom
    if (!nom.value.trim()) {
      nom.parentNode.querySelector('.error').textContent = 'Nom obligatoire';
      ok = false;
    }
    
    // Email
    if (!email.value.trim()) {
      email.parentNode.querySelector('.error').textContent = 'Email obligatoire';
      ok = false;
    } else if (!email.value.includes('@')) {
      email.parentNode.querySelector('.error').textContent = 'Email invalide';
      ok = false;
    }
    
    // Consent
    if (!consent.checked) {
      consent.parentNode.querySelector('.error').textContent = 'RGPD obligatoire';
      ok = false;
    }
    
    if (ok) {
      alert('Votre message a bien été envoyé !');
      form.reset();
    }
  });
});
