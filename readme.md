# 🦊 Kitsunes Battle - Évaluation Front-End Angular

Ce projet est une application Angular développée dans le cadre de l'évaluation "Programmation Front-End". Il permet de consulter, créer, et faire combattre des "Kitsunes" (créatures mythologiques) en respectant les standards modernes d'Angular.

---

## Architecture du projet

Le projet a été structuré de manière à séparer clairement les responsabilités, même si l'application est de petite taille :

* **`/services` :** Contient le fichier `kitsunes.ts`. Centraliser la donnée ici permet de partager l'état global entre tous les composants (la liste, l'arène, les détails) sans dupliquer l'information.
* **`/models` :** Contient l'interface `kitsune.ts`. Regrouper les modèles de données dans un dossier dédié permet de garder le code typé et propre, tout en anticipant d'éventuelles nouvelles entités (ex: des objets, des arènes).
* **`/components` (à la racine de `src/app/`) :** Les composants (`kitsune-ajout`, `kitsune-bataille`, `kitsune-details`, `kitsune-liste`, `kitsune-introuvable`, `navbar`) sont organisés par dossiers. `kitsune-details` est compris dans `kitsune-list` car ce composant est directement relié. Cette structure facilite la navigation dans le code et reste assez simple.

---

## Choix Techniques & Conventions


* **Gestion d'état (Signals) :** J'ai encapsulé les données des Kitsunes dans un service via un signal privé. Les composants ne peuvent lire cet état que via `.asReadonly()`, et toute modification (ajout, boost, résultat de combat) passe par des méthodes de mutation immuables dans le service.
* **Routage Dynamique (Single Page Application) :** Le module `Router` est utilisé pour naviguer sans recharger la page. Il permet aussi de récupérer le nom du Kitsune dans l'URL pour la page détails, et de rediriger automatiquement les URL invalides vers l'écran `kitsune-introuvable`.
* **Formulaire Réactif (Signal Forms) :** L'écran d'ajout utilise l'API `@angular/forms/signals`. Les champs obligatoires sont validés via le composant (et non le HTML), et les attributs par défaut (repos, victoires, boost) sont forcés lors de la soumission pour empêcher l'utilisateur de tricher.
* **Logique de Bataille Isolé :** La sélection et le calcul du combat (tour par tour, boost de PV) sont gérés localement dans le composant `kitsune-bataille`. Des copies d'objets sont utilisées pour simuler les dégâts, garantissant que les PV originaux ne sont pas altérés. La mise à jour finale est déléguée au service après le délai imposé.
* **Composants dédiés :** La barre de navigation (`navbar`) et l'erreur 404 (`kitsune-introuvable`) ont leurs propres composants. La navbar utilise `position: sticky` pour rester visible, et la page 404 sert à la fois pour les mauvaises URL et si un Kitsune spécifique n'est pas trouvé dans la base.

---

## Problèmes rencontrés & Solutions

* **Validation du formulaire avec les Signal Forms :**
  * *Problème :* J'ai eu des difficulté à extraire les valeurs (le texte) pour vérifier si le kitsune existait déjà par son nom, car l'objet `schema` renvoyait des nœuds réactifs (`FieldTree`) et non des chaînes de caractères.
  * *Solution :* Utilisation de la méthode `.value()` sur chaque champ du schéma avant de créer l'objet final.
* **Redirection depuis l'écran Détails :**
  * *Problème :* Si on tapait manuellement une URL valide (ex: `/details/Inconnu`) mais que le nom du kitsune n'existait pas dans le service, la page crashait ou restait vide.
  * *Solution :* Ajout d'une vérification dans le constructeur avec un `effect()` dans `kitsune-details`. Si un nom est présent dans l'URL mais introuvable dans le service, le `Router` force la redirection vers `/introuvable`.

---