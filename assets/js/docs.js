document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".docs-menu a");
  const contentContainer = document.getElementById("docs-content-container");

  // Utilitaire pour trouver le bon chemin, local ou Github Pages
  function getMdPath(file) {
    const pathParts = window.location.pathname.split('/');
    // Ex: /ShynoBot/index.html => pathParts[1] === "ShynoBot"
    if (location.hostname.endsWith('github.io') && pathParts[1]) {
      return `/${pathParts[1]}/assets/md/${file}.md`;
    }
    return `assets/md/${file}.md`;
  }

  // Configuration de `marked` pour gérer les blocs personnalisés
  marked.use({
    extensions: [
      {
        name: "customTipBlock",
        level: "block",
        start(src) {
          return src.match(/:::/)?.index;
        },
        tokenizer(src) {
          const rule = /^::: tip\s*([\s\S]+?)\n:::/;
          const match = rule.exec(src);
          if (match) {
            return {
              type: "customTipBlock",
              raw: match[0],
              text: match[1],
            };
          }
        },
        renderer(token) {
          return `<div class="tip-block">${marked.parse(token.text)}</div>`;
        },
      },
    ],
  });

  // Fonction pour charger le contenu Markdown
  async function loadMarkdown(file) {
    try {
      const mdPath = getMdPath(file);
      const response = await fetch(mdPath);
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier Markdown.");
      }
      const markdown = await response.text();
      // Convertir le Markdown en HTML
      contentContainer.innerHTML = marked.parse(markdown);
    } catch (error) {
      contentContainer.innerHTML = `<p>Erreur : Impossible de charger le contenu.</p>`;
      console.error(error);
    }
  }

  // Gérer les clics sur les liens de la barre latérale
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const category = link.getAttribute("data-category");
      loadMarkdown(category); // Charge le fichier Markdown correspondant
      // Met à jour l'état actif
      menuLinks.forEach((l) => l.classList.remove("docs-active"));
      link.classList.add("docs-active");
    });
  });

  // Charger un contenu par défaut
  loadMarkdown("introduction");
});
