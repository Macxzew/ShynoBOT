# Installation

Bienvenue dans la section d'installation de **ShynoBot**! 🎉  
Cette partie vous guide à travers les étapes pour installer ShynoBot sur votre système, que ce soit sous Windows, Linux ou un autre environnement.

---

## Étapes d'installation sur Windows 🖥️

### Pré-requis :
Assurez-vous que les logiciels suivants sont installés :
- [`Python 3.9.4`](https://www.python.org/ftp/python/3.9.4/python-3.9.4-amd64.exe)
- [`Node.js 16.13.0`](https://nodejs.org/dist/v16.13.0/node-v16.13.0-x64.msi)

### Étapes :
1. Téléchargez et extrayez **ShynoBot** depuis [GitHub Releases](https://github.com/shwzr/ShynoBot/releases/latest).
    <a href="https://github.com/shwzr/ShynoBot/releases/latest" class="docs-download-button" target="_blank" rel="noopener noreferrer">
      Télécharger sur GitHub
    </a>
  
2. Ouvrez une **fenêtre de terminal** ou **PowerShell** et exécutez les commandes suivantes :
   ```cmd
   cd ShynoBot/bot
   ```
   ```cmd
   python.exe -m pip install --upgrade pip && pip install -r requirements.txt
   ```
   ```cmd
   npm install -g npm@9.8.1
   ```
   ```cmd
   npm install
   ```
3. Insérez votre [Discord Bot token](https://discord.com/developers/applications) dans `config.json`
   ```json
   {
       "color": "#f259a0",
       "lang": "fr",
       "token": [
           "Insérez votre token ici"
       ]
   }
   ```

---

## Étapes d'installation sur Linux 🐧

#### Pré-requis :
Pour commencer, nous allons installer les dépendances essentielles  :
- Python 3.11.2
- Node.js 18.13.0
- Git
- Curl (pour installer Node Version Manager - NVM)

#### Étapes :
1. **Mettre à jour le système et installer les dépendances essentielles** :

    1.1. Mettre à jour les paquets :

    ```bash
    apt update
    ```
    1.2. Installez Python, pip et curl :
    ```bash
    apt install git python3 python3-pip curl
    ```
    1.3. Téléchargez et installez nodejs 18.13.0 :
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```
    ```bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    ```
    ```bash
    nvm install 18.13.0
    ```
    1.4. Téléchargez la dernière version de ShynoBot :
    ```bash
    git clone https://github.com/shwzr/ShynoBot.git
    ```
    ```bash
    cd ShynoBot/bot
    ```
    1.5. Installez les bibliothèques python et nodejs :
    ```bash
    pip3 install --break-system-packages -r requirements.txt
    ```
    ```bash
    npm install
    ```
2. Insérez votre [Discord Bot token](https://discord.com/developers/applications) dans `config.json`
    ```json
    {
        "color": "#f259a0",
        "lang": "fr",
        "token": [
            "Insérez votre token ici"
        ]
    }
    ```

---

Merci de faire confiance à **ShynoBot** pour gérer votre serveur Discord. 🚀