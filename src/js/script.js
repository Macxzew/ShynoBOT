document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector(".category-list")) {
        document.querySelectorAll(".category-list li").forEach(category => {
            category.addEventListener("click", function() {
                const categorySelected = this.getAttribute("data-category");
                const categoryName = this.textContent;
                document.querySelector(".commands-title").textContent = categoryName;
                document.querySelectorAll(".command-group").forEach(group => {
                    if (group.getAttribute("data-category-group") === categorySelected) {
                        group.classList.add("active");
                    } else {
                        group.classList.remove("active");
                    }
                });
            });
        });

        let generalCategory = document.querySelector("[data-category='general']");
        if (generalCategory) generalCategory.click();
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var licenseKey = document.getElementById('licenseKey').value;
    var passphrase = document.getElementById('passphrase').value;
    var loadingContainer = document.getElementById('loadingContainer');
    loadingContainer.style.transform = 'translateY(0)';
    loadingContainer.classList.remove('hidden');
    document.querySelector('.gear img').src = 'load.gif';
    var loginContainer = document.getElementById('loginContainer');

    fetch('https://shyno-api.glitch.me/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey: licenseKey, passphrase: passphrase })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadingContainer.style.transform = 'translateY(-100vh)';
            loginContainer.style.transform = 'translateY(-100vh)';
            loginContainer.classList.add('hidden');
            var dashboardContainer = document.getElementById('dashboardContainer');
            dashboardContainer.classList.remove('hidden');
            dashboardContainer.style.transform = 'translateY(-60px)';
            dashboardContainer.style.transition = 'transform 0.5s ease-in-out';
            document.getElementById('licenseKeyDisplay').textContent = licenseKey;
            document.getElementById('passphraseDisplay').textContent = passphrase;
            document.getElementById('expirationDateDisplay').textContent = data.data["expiration-date"];
        } else {
            alert('Invalid license key or passphrase');
            resetForm();
        }
    })
    .catch(error => {
        console.error('Error: ', error);
        alert('Error validating credentials');
        resetForm();
    });
});

document.getElementById('logoutButton').addEventListener('click', function() {
    var dashboardContainer = document.getElementById('dashboardContainer');
    var loginContainer = document.getElementById('loginContainer');
    dashboardContainer.style.transform = 'translateY(-100vh)';
    setTimeout(function() {
        dashboardContainer.classList.add('hidden');
    }, 500);
    setTimeout(function() {
        loginContainer.classList.remove('hidden');
        loginContainer.style.transform = 'translateY(0)';
    }, 500);
});

function resetForm() {
    document.getElementById('loginContainer').style.transform = 'translateY(0)';
    document.getElementById('loadingContainer').style.transform = 'translateY(100vh)';
    document.getElementById('loadingContainer').classList.add('hidden');
}


function sendEmail() {
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");

    var email = emailInput.value;
    var subject = "Buy a ShynoKey";  // Sujet fixe
    var message = messageInput.value;
    var mailtoLink = "mailto:" + encodeURIComponent(email) +
                     "?subject=" + encodeURIComponent(subject) +
                     "&body=" + encodeURIComponent(message);

    if (email.endsWith("@gmail.com")) {
        var gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email) +
                        "&su=" + encodeURIComponent(subject) +
                        "&body=" + encodeURIComponent(message);
        window.open(gmailLink, '_blank').focus();
    } else if (email.endsWith("@outlook.com") || email.endsWith("@hotmail.com") || email.endsWith("@live.com")) {
        var outlookLink = "https://outlook.live.com/owa/?path=/mail/action/compose&to=" + encodeURIComponent(email) +
                          "&subject=" + encodeURIComponent(subject) +
                          "&body=" + encodeURIComponent(message);
        window.open(outlookLink, '_blank').focus();
    } else if (email.endsWith("@orange.fr") || email.endsWith("@wanadoo.fr")) {
        // Orange et Wanadoo n'ont pas de lien de composition web direct, utiliser mailto
        window.location.href = mailtoLink;
    } else if (email.endsWith("@protonmail.com") || email.endsWith("@protonmail.ch")) {
        // ProtonMail n'a pas de lien de composition web direct, utiliser mailto
        window.location.href = mailtoLink;
    } else {
        // Pour tous les autres fournisseurs de messagerie, utiliser mailto
        window.location.href = mailtoLink;
    }
}