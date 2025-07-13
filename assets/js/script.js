// Redirect HTTP to HTTPS
if (window.location.protocol === "http:") {
  window.location.href = window.location.href.replace("http:", "https:");
}

// Initialiser Stripe uniquement si le modal est activé
let stripe, cardElement;
if (document.getElementById('stripeModal')) {
  stripe = Stripe('pk_live_51QL4bBIm0CFAr0zoKobeykkmC7QnYpXQYxCGrd209HdGSTV0Gdqmyf905IH95yMma4ZcNnD9rlJPEj5pGSwbjc0L00CfXRRuLe');
  const elements = stripe.elements();

  // Style pour les champs Stripe
  const style = {
    base: {
      color: '#ffffff',
      fontFamily: '"Poppins", sans-serif',
      fontSize: '16px',
      '::placeholder': { color: '#b39ddb' },
    },
    invalid: { color: '#ff6b6b' },
  };

  // Créez l'élément de carte
  cardElement = elements.create('card', { style });
  cardElement.mount('#card-element'); // Montez l'élément dans le div prévu
}

document.getElementById('payment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const paymentStatus = document.getElementById('payment-status');
    const loader = document.getElementById('loader');

    if (!paymentStatus) {
        console.error('Élément payment-status introuvable dans le DOM.');
        return;
    }
    if (!loader) {
        console.warn('Élément loader introuvable dans le DOM.');
    }

    paymentStatus.textContent = 'Traitement du paiement de 10 €...';
    paymentStatus.style.color = 'white';
    if (loader) loader.style.display = 'block';

    try {
        // Étape 1 : Appeler le backend pour créer une intention de paiement
        const response = await fetch('https://shynoapi.onrender.com/generateKeyOnPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            paymentStatus.textContent = `Erreur : ${errorData.message || 'Erreur inconnue'}`;
            paymentStatus.style.color = 'red';
            return;
        }

        const data = await response.json();
        const clientSecret = data.clientSecret;

        // Étape 2 : Finaliser le paiement avec Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
        });

        if (error) {
            paymentStatus.textContent = `Paiement échoué : ${error.message}`;
            paymentStatus.style.color = 'red';
            return;
        }

        if (paymentIntent.status !== 'succeeded') {
            console.error('Le paiement n\'a pas réussi. Statut :', paymentIntent.status);
            paymentStatus.textContent = 'Le paiement n\'a pas été validé. Veuillez réessayer.';
            paymentStatus.style.color = 'red';
            return;
        }

        paymentStatus.textContent = `Paiement validé ! Récupération des informations...`;
        paymentStatus.style.color = 'green';

        // Ajouter un délai avant l'appel au webhook-data
        setTimeout(async () => {
            try {
                const webhookResponse = await fetch('https://shynoapi.onrender.com/webhook-data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
                });

                if (!webhookResponse.ok) {
                    const errorData = await webhookResponse.json();
                    console.error('Erreur lors de la récupération des données webhook :', errorData);
                    paymentStatus.textContent = 'Erreur lors de la récupération des données. Veuillez contacter le support.';
                    paymentStatus.style.color = 'red';
                    return;
                }

                const webhookData = await webhookResponse.json();

                if (!webhookData.activationKey || !webhookData.passphrase || !webhookData.expirationDate) {
                    paymentStatus.textContent = 'Données incomplètes reçues. Veuillez contacter le support.';
                    paymentStatus.style.color = 'red';
                    console.error('Données du webhook incomplètes :', webhookData);
                    return;
                }

                showDoubleModal(webhookData.activationKey, webhookData.passphrase, webhookData.expirationDate);

                setTimeout(() => {
                    closeModal('stripeModal');
                }, 2000);
            } catch (error) {
                paymentStatus.textContent = 'Une erreur est survenue lors de la récupération des données.';
                paymentStatus.style.color = 'red';
                console.error('Erreur lors de la récupération des données webhook :', error);
            }
        }, 3000); // Délai de 3 secondes
    } catch (error) {
        paymentStatus.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        paymentStatus.style.color = 'red';
        console.error('Erreur lors du paiement :', error);
    } finally {
        if (loader) loader.style.display = 'none';
    }
});


// Fonction pour re-générer une clé
async function regenerateActivationKey() {
  const activationKey = document.getElementById(
    "display-activationKey"
  ).textContent;
  const passphrase = document.getElementById("display-passphrase").textContent;

  try {
    const response = await fetch("https://shynoapi.onrender.com/regenerateKey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activationKey,
        passphrase,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Erreur : ${errorData.message}`);
      return;
    }

    const data = await response.json();

    // Mettre à jour la clé d'activation avec la nouvelle clé
    document.getElementById("display-activationKey").textContent =
      data.newActivationKey;

    // Afficher une notification de succès
    alert("Nouvelle clé d'activation générée avec succès !");
  } catch (error) {
    console.error("Erreur lors de la régénération de la clé :", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
  }
}
// Gestion du bouton de fermeture pour le double modal
function closeModal(modalId) {
  if (modalId === "doubleModal" && !canCloseDoubleModal) {
    alert("Veuillez télécharger les informations avant de fermer ce modal.");
    return; // Empêche la fermeture
  }
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}
window.onclick = function (event) {
  const modals = document.getElementsByClassName("modal");
  Array.from(modals).forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// Réveil du serveur backend
async function wakeUpServer() {
  try {
    const response = await fetch("https://shynoapi.onrender.com/wakeup");
    if (response.ok) {
      console.log("Backend server is awake!");
    } else {
      console.error("Failed to wake up the backend server.");
    }
  } catch (error) {
    console.error("Error waking up the backend server:", error);
  }
}

// Section and Navigation Management
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => (section.style.display = "none"));
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      showSection(sectionId);
    });
  });
}

function showSectionWithTransition(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
    section.classList.toggle("active", section.id === sectionId);
  });

  const allLinks = document.querySelectorAll(".nav-links a");
  allLinks.forEach((link) => link.classList.remove("active"));
  const activeLink = document.querySelector(
    `.nav-links a[href="#${sectionId}"]`
  );
  if (activeLink) activeLink.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.querySelector(".logo a");
  if (logoLink) {
    logoLink.addEventListener("click", (event) => {
      event.preventDefault();
      showSectionWithTransition("hero");
    });
  }

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (href.endsWith(".html")) {
        // Permettre la navigation externe (vers docs.html par exemple)
        return;
      }
      event.preventDefault();
      const sectionId = href.substring(1);
      showSectionWithTransition(sectionId);
    });
  });

  const navToggle = document.querySelector(".menu-icon");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const navLinks = document.querySelector(".nav-links");
      const menuIcon = document.querySelector(".menu-icon");
      if (navLinks && menuIcon) {
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("open");
      }
    });
  }
});

// Background Animation
function createAnimatedBackground() {
  const backgroundContainer = document.querySelector(".background-animation");
  if (!backgroundContainer) return;

  const symbols = ["▷", "O", "+", "/"];
  const numSymbols = 33;

  for (let i = 0; i < numSymbols; i++) {
    const symbolElement = document.createElement("div");
    symbolElement.innerText =
      symbols[Math.floor(Math.random() * symbols.length)];
    symbolElement.style.position = "absolute";
    symbolElement.style.left = `${Math.random() * 100}vw`;
    symbolElement.style.top = `${Math.random() * 100}vh`;
    symbolElement.style.opacity = Math.random().toFixed(2);
    symbolElement.style.fontSize = `calc(1rem + ${Math.random() * 2 + 1}vw)`;
    symbolElement.style.color = "rgba(179, 157, 219, 0.15)";
    symbolElement.style.animation = `floatSymbol ${
      5 + Math.random() * 5
    }s ease-in-out infinite`;
    symbolElement.style.userSelect = "none";
    backgroundContainer.appendChild(symbolElement);
  }

  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes floatSymbol {
      0%, 100% { transform: translateY(0) translateX(0) scale(1); }
      25% { transform: translateY(-10px) translateX(-10px) scale(1.1); }
      50% { transform: translateY(10px) translateX(10px) scale(1.05); }
      75% { transform: translateY(-5px) translateX(5px) scale(0.95); }
    }
  `;
  document.head.appendChild(style);
}

// Copy Email to Clipboard
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Texte copié : " + text);
      })
      .catch((err) => console.error("Échec de la copie : ", err));
  } else {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Texte copié : " + text);
  }
}

// Load and Display Commands from commands.json
function loadCommands() {
  fetch("/assets/json/commands.json")
    .then((response) => response.json())
    .then((data) => initializeCommands(data.sections))
    .catch((error) => console.error("Failed to load commands.json:", error));
}

function initializeCommands(sections) {
  const categoriesContainer = document.getElementById("command-categories");
  const commandDetailsContainer = document.getElementById("command-details");
  if (!categoriesContainer || !commandDetailsContainer) return;

  for (const [sectionName, commands] of Object.entries(sections)) {
    const categoryItem = document.createElement("li");
    categoryItem.textContent = sectionName;
    categoryItem.classList.add("category-item");

    categoryItem.onclick = () => {
      displayCommands(commands);
      document
        .querySelectorAll(".category-item")
        .forEach((item) => item.classList.remove("active"));
      categoryItem.classList.add("active");
    };

    categoriesContainer.appendChild(categoryItem);
  }
}

function displayCommands(commands) {
  const commandDetailsContainer = document.getElementById("command-details");
  if (!commandDetailsContainer) return;

  commandDetailsContainer.innerHTML = ""; // Clear previous commands

  commands.forEach((command) => {
    const commandItem = document.createElement("div");
    commandItem.classList.add("command-item");

    const title = document.createElement("div");
    title.classList.add("command-title");
    title.textContent = command.command;
    commandItem.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("command-description");
    description.textContent = command.description;
    commandItem.appendChild(description);

    const usageContainer = document.createElement("div");
    usageContainer.classList.add("usage");
    usageContainer.style.display = "none";
    for (const [usageCommand, usageDescription] of Object.entries(
      command.usage
    )) {
      const usageText = document.createElement("div");
      usageText.innerHTML = `<strong>${usageCommand}</strong> - ${usageDescription}`;
      usageContainer.appendChild(usageText);
    }
    commandItem.appendChild(usageContainer);

    commandItem.onclick = () => {
      usageContainer.style.display =
        usageContainer.style.display === "none" ? "block" : "none";
    };

    commandDetailsContainer.appendChild(commandItem);
  });
}



// Soumission du formulaire de connexion
document
  .querySelector(".login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const activationKey = document.getElementById("activationKey").value;
    const passphrase = document.getElementById("passphrase").value;
    try {
      const response = await fetch("https://shynoapi.onrender.com/loginweb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activationKey,
          passphrase,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message}`);
        return;
      }
      const data = await response.json();
      // Mettre à jour les informations utilisateur
      document.getElementById("display-activationKey").textContent =
        activationKey;
      document.getElementById("display-passphrase").textContent = passphrase;
      document.getElementById("display-expirationDate").textContent =
        data.expirationDate;
      // Basculer entre les sections
      showSectionWithTransition("user-info");
      // Mettre à jour le bouton de la navbar
      const loginNav = document.querySelector(".login a");
      loginNav.textContent = "Logged";
      loginNav.onclick = () => showSectionWithTransition("user-info");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });

// Gestion de la déconnexion
document.querySelector(".info-actions button").addEventListener("click", () => {
  // Réinitialiser les champs de connexion
  document.getElementById("activationKey").value = "";
  document.getElementById("passphrase").value = "";

  // Basculer entre les sections
  showSectionWithTransition("login");

  // Mettre à jour le bouton de la navbar
  const loginNav = document.querySelector(".login a");
  loginNav.textContent = "Login";
  loginNav.onclick = () => showSectionWithTransition("login");
});

document.getElementById('buy-key-button').addEventListener('click', () => {
  openModal('stripeModal');
});

let savedActivationKey = null;
let savedPassphrase = null;
let savedExpirationDate = null;
let canCloseDoubleModal = false;

// Affiche le double modal avec les informations récupérées ou sauvegardées
function showDoubleModal(activationKey, passphrase, expirationDate) {
  // Si des informations sont passées, les sauvegarder
  if (activationKey && passphrase && expirationDate) {
    savedActivationKey = activationKey;
    savedPassphrase = passphrase;
    savedExpirationDate = expirationDate;
  }

  // Utiliser les informations sauvegardées pour afficher le modal
  document.getElementById("modal-activationKey").textContent = savedActivationKey;
  document.getElementById("modal-passphrase").textContent = savedPassphrase;
  document.getElementById("modal-expirationDate").textContent = savedExpirationDate;

  canCloseDoubleModal = false; // Désactive la fermeture au début
  const closeButton = document.querySelector("#doubleModal .close");
  closeButton.classList.add("disabled"); // Désactive le bouton de fermeture
  openModal("doubleModal");
}

// Téléchargement des informations et activation de la fermeture du modal
function downloadTxtFile() {
  if (!savedActivationKey || !savedPassphrase || !savedExpirationDate) {
    alert("Les informations sont incomplètes. Veuillez réessayer.");
    return;
  }

  const content = `Clé d'activation : ${savedActivationKey}\nPassphrase : ${savedPassphrase}\nDate d'expiration : ${savedExpirationDate}`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "activation_info.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Autorise la fermeture du modal
  canCloseDoubleModal = true;
  const closeButton = document.querySelector("#doubleModal .close");
  closeButton.classList.remove("disabled"); // Active le bouton de fermeture
  closeButton.classList.add("enabled"); // Indique que le bouton est actif
}


// Télécharge les informations sous forme de fichier texte
document.getElementById("download-info-button").addEventListener("click", () => {
  // Récupérer les valeurs affichées
  const activationKey = document.getElementById("display-activationKey").textContent;
  const passphrase = document.getElementById("display-passphrase").textContent;
  const expirationDate = document.getElementById("display-expirationDate").textContent;

  // Vérifier si les informations sont complètes
  if (!activationKey || !passphrase || !expirationDate) {
    alert("Les informations sont incomplètes. Veuillez vérifier vos données.");
    return;
  }

  // Préparer le contenu du fichier
  const content = `
Clé d'activation : ${activationKey}
Passphrase : ${passphrase}
Date d'expiration : ${expirationDate}
`;

  // Créer un fichier texte à partir des données
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Télécharger le fichier
  const link = document.createElement("a");
  link.href = url;
  link.download = "informations_connexion.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});



// Fonction pour gérer l'achat d'une clé d'activation
document.getElementById("buy-key-button").addEventListener("click", () => {
  if (savedActivationKey && savedPassphrase && savedExpirationDate) {
    // Si des informations existent, ré-ouvrir le Double Modal
    showDoubleModal();
  } else {
    // Sinon, ouvrir le Stripe Modal pour un nouvel achat
    openModal("stripeModal");
  }
});

// Empêche la fermeture en cliquant en dehors ou sur le bouton de fermeture tant que les informations ne sont pas téléchargées
window.onclick = function (event) {
  const modal = document.getElementById("doubleModal");
  if (event.target === modal && !canCloseDoubleModal) {
    alert("Veuillez télécharger les informations avant de fermer ce modal.");
  }
};


document.addEventListener("DOMContentLoaded", () => {
  createAnimatedBackground();
  showSectionWithTransition("hero");
  loadCommands();
  wakeUpServer();
});
