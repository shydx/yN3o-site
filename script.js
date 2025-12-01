const titre = document.getElementById("titre");
const btn = document.getElementById("btn");
const texteInitial = titre.textContent;
const texte2Initial = btn.textContent;
const fileInput = document.getElementById("fileInput"); // <-- déclaration manquante

// Créer un container pour les particules
const container = document.createElement("div");
container.style.position = "absolute";
container.style.top = 0;
container.style.left = 0;
container.style.pointerEvents = "none";
document.body.appendChild(container);

btn.addEventListener("click", function(e) {
  // -------------------------
  // TOGGLE & TEXTE
  // -------------------------
  titre.classList.toggle("active");
  titre.textContent = "Document envoyé !";

  btn.disabled = true;
  btn.textContent = "Envoyé";

  // -------------------------
  // EXPLOSION DE PARTICULES
  // -------------------------
  const numberOfParticles = 20;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    container.appendChild(particle);

    // position initiale = centre du bouton
    const rect = btn.getBoundingClientRect();
    particle.style.position = "absolute";
    particle.style.width = "10px";
    particle.style.height = "10px";
    particle.style.backgroundColor = "orange";
    particle.style.borderRadius = "50%";
    particle.style.left = rect.left + rect.width/2 + "px";
    particle.style.top = rect.top + rect.height/2 + "px";
    particle.style.opacity = 1;
    particle.style.transition = "transform 0.6s ease, opacity 0.6s ease";

    // direction aléatoire
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;

    setTimeout(() => {
      particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
      particle.style.opacity = 0;
    }, 10);

    setTimeout(() => {
      particle.remove();
    }, 600);
  }

  // -------------------------
  // RESET après 5s
  // -------------------------
  setTimeout(function() {
    btn.disabled = false;
    btn.textContent = texte2Initial;

    titre.classList.remove("active");
    titre.textContent = texteInitial;
  }, 5000);

  // -------------------------
  // Ouvrir le sélecteur de fichiers
  // -------------------------
});

// Optionnel : juste afficher le nom du fichier choisi
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if(file){
    console.log("Fichier choisi :", file.name);
  }
});
