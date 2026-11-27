## Choix techniques

Service (Données) : J'ai centralisé les données des Kitsunes dans un service. Cela permet de partager le même état entre la liste et les détails sans dupliquer l'information.

Écran Liste : J'ai créé un composant dédié pour la liste. Cela permet d'avoir une page d'accueil claire qui ne montre que l'essentiel (nom et statut).

Écran Détails : J'ai séparé les détails dans un autre composant. Cela permet d'isoler la logique complexe du "boost" (calcul de probabilité, règles de désactivation) pour ne pas surcharger le code de la liste.

Barre de navigation : J'ai utilisé `position: sticky` en CSS pour répondre à la consigne de la maintenir visible au scroll.

Écran Ajout (Formulaire) : J'ai utilisé les Signal Forms pour une gestion réactive de l'état. Les attributs par défaut (enRepos, victoires, boost) sont assignés manuellement lors de la soumission dans le composant, empêchant ainsi l'utilisateur de les modifier lors de la création.

Écran Introuvable (404) : J'ai créé un composant dédié pour cet écran. Cela permet de l'utiliser à la fois pour les mauvaises URL globales (via la route `**`) et pour les cas où l'utilisateur cherche un Kitsune spécifique qui n'existe pas dans le service.

Module Router : J'ai injecté le module `Router` dans le code pour gérer les redirections dynamiques. Cela permet notamment de renvoyer automatiquement l'utilisateur vers la page "Kitsune introuvable" s'il tape manuellement dans l'URL le nom d'un Kitsune qui n'existe pas.


Écran Bataille (Logique métier) : L'état local du combat (Kitsunes sélectionnés, message en cours) est géré dans le composant avec des Signals pour la réactivité. Les calculs de dégâts (PV) sont faits sur des copies d'objets pour ne pas altérer les données initiales, garantissant que les PV reviennent à la normale.

Mise à jour post-combat : La mise à jour finale de l'état (victoires, pertes de boost, passage `enRepos`) est déléguée au `KitsuneService` après le délai de 3 secondes, qui gère également le retour automatique du perdant après 1 minute via un `setTimeout`.