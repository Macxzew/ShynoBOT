# Fonctionnalités de ShynoBot 🎉

Bienvenue dans la documentation complète des fonctionnalités de **ShynoBot** !  
Ce guide inclut toutes les commandes disponibles, leur usage et une image par commande pour vous aider à mieux comprendre leur fonctionnement. 🚀

---

## 📖 **Sommaire**

- 💻 Commandes générales
- 🛡 Commandes de modération
- 🌟 Commandes administratives
- 🎁 Commandes bonus

---

## 💻 **Commandes générales**

### `/help`  
🆘 **Afficher la liste des commandes disponibles.**  
**Usage :** Aucune option requise.  

![Help Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_help_1.png?v=1732625868842)
![Help Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_help_2.png?v=1732625972942)



### `/info`  
❓ **Afficher des informations générales sur le bot.**  
**Usage :** Aucune option requise.  

![Info Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_info.png?v=1732626333325)

---

## 🛡 **Commandes de modération**

### `/ban`  
🔨 **Bannir un membre du serveur.**  
**Usage :**  
- `/ban [@membre/id]` : Bannir un membre.  
- `/ban [@membre/id] [raison]` : Bannir un membre avec une raison.



### `/unban`  
🩹 **Débannir un utilisateur du serveur.**  
**Usage :**  
- `/unban [id]` : Débannir un utilisateur.  
- `/unban [id] [raison]` : Débannir avec une raison.



### `/kick`  
👊 **Expulser un membre du serveur.**  
**Usage :**  
- `/kick [@membre/id]` : Expulser un membre.  
- `/kick [@membre/id] [raison]` : Expulser un membre avec une raison.



### `/mute`  
🔇 **Rendre un membre muet.**  
**Usage :**  
- `/mute [@membre]` : Rendre muet.  
- `/mute [@membre] [raison]` : Rendre muet avec une raison.

![Mute Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_mute.png?v=1732630095119)



### `/unmute`  
🔊 **Rétablir la parole d’un membre.**  
**Usage :**  
- `/unmute [@membre]` : Annuler le muet.  
- `/unmute [@membre] [raison]` : Annuler avec une raison.



### `/lock`  
🔒 **Bloquer un salon pour empêcher les messages.**  
**Usage :** Aucune option requise.  

![Lock Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_lock.png?v=1732629791119)



### `/unlock`  
🔓 **Débloquer un salon pour autoriser les messages.**  
**Usage :** Aucune option requise.  

![Unlock Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_unlock.png?v=1732629866324)



### `/msg`  
📨 **Envoyer un message texte.**  
**Usage :**  
- `/msg [message]` : Envoyer dans le salon actuel.  
- `/msg [message] [@membre]` : Message privé à un membre.  
- `/msg [message] [#salon]` : Envoyer dans un salon spécifique.



### `/msgembed`  
📨 **Envoyer un message décoratif.**  
**Usage :**  
- `/msgembed [titre] [texte]` : Message décoratif dans le salon.  
- `/msgembed [titre] [texte] [@membre]` : À un membre.

![MsgEmbed Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_msgembed.png?v=1735042550713)

::: tip
  Il est possible de rendre un message MsgEmbed réagissable, permettant aux utilisateurs d'obtenir un rôle en réagissant avec un emoji. Pour cela, la description du message embed doit inclure une mention et un emoji alignés sur la même ligne.
:::


### `/webhookmsg`  
📨 **Envoyer un message via un webhook.**  
**Usage :**  
- `/webhookmsg [url-webhook] [message]` : Envoyer via un webhook.

![WebhookMsg Step1](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_webhookmsgembed_1.png?v=1735043507323)
![WebhookMsg Step2](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_webhookmsg.png?v=1735228941604)



### `/webhookmsgembed`  
📨 **Envoyer un message décoratif via un webhook.**  
**Usage :**  
- `/webhookmsgembed [url-webhook] [titre] [texte]` : Envoyer un message décoratif via un webhook.

![WebhookMsgEmbed Step1](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_webhookmsgembed_1.png?v=1735043507323)
![WebhookMsgEmbed Step2](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_webhookmsgembed_2.png?v=1735043363555)

::: tip
  Il est possible de rendre un message WebhookMsgEmbed réagissable, permettant aux utilisateurs d'obtenir un rôle en réagissant avec un emoji. Pour cela, la description du message embed doit inclure une mention et un emoji alignés sur la même ligne.
:::


### `/purge`  
🧹 **Nettoyer tous les messages du salon.**  
**Usage :** Aucune option requise.  


### `/giveaway`  
🏆 **Organiser un tirage au sort.**  
**Usage :**  
- `/giveaway [durée] [gagnants]` : Durée en minutes et nombre de gagnants.

![Giveaway Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_guveaway.png?v=1735229193546)


---

## 🌟 **Commandes administratives**

### `/setlanguage`  
🌍 **Changer la langue du bot.**  
**Usage :** `/setlanguage [fr/en]` : Français ou anglais.  


### `/setcolor`  
🎨 **Modifier la couleur des messages du bot.**  
**Usage :** `/setcolor [#code_couleur]`.  


### `/setwelcome`  
👋 **Configurer un salon pour les messages de bienvenue.**  
**Usage :** Aucune option requise.  


### `/setlogs`  
📰 **Configurer un salon pour la journalisation des événements.**  
**Usage :** Aucune option requise.  


### `/setrole`  
👥 **Attribuer un rôle à un utilisateur.**  
**Usage :** `/setrole [@membre] [@rôle]`.  


### `/autorole`  
🔄 **Configurer un système d’attribution de rôles automatique.**  
**Usage :** `/autorole [action] [@rôle] [...]`.  

![AutoRole Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_autorole.image.png?v=1735229840037)



---

## 🎁 **Commandes bonus**

### `$profil`  
👤 **Afficher le profil d’un utilisateur.**  
**Usage :** `$profil [@membre/id]`.  

![Profil Command](https://cdn.glitch.global/2a3d831c-cba9-43b3-aa31-791655232186/features_profil.png?v=1739326129676)

---

### `$anime`  
🎥 **Rechercher des informations sur un anime.**  
**Usage :** `$anime [nom]`.  

![Anime Command](./images/anime.png)

---

### `$manga`  
📙 **Rechercher des informations sur un manga.**  
**Usage :** `$manga [nom]`.  

![Manga Command](./images/manga.png)

---

### `$wallpaper`  
🖼 **Rechercher des fonds d’écran.**  
**Usage :** `$wallpaper [recherche]`.  

![Wallpaper Command](./images/wallpaper.png)

---

### `/imgen`  
🖼 **Générer une image basée sur une description.**  
**Usage :** `/imgen [description]`.  

![ImageGen Command](./images/imgen.png)

---

### `/passgen`  
🔐 **Générer un mot de passe aléatoire.**  
**Usage :** `/passgen`.  

![PassGen Command](./images/passgen.png)

---

### `/translate`  
🌐 **Traduire un texte.**  
**Usage :** `/translate [texte] [langue]`.  

![Translate Command](./images/translate.png)

---

## 📜 **Conclusion**

Avec toutes ces commandes, **ShynoBot** transforme la gestion de votre serveur Discord en une expérience fluide, interactive et personnalisée. Essayez-les maintenant ! 💜
