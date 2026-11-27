import { Injectable, signal } from '@angular/core';
import { Kitsune } from '../models/kitsune';

@Injectable({
  providedIn: 'root'
})
export class Kitsunes {
  
  // Encapsulation dans un signal privé
  private _liste = signal<Kitsune[]>([
    { nom: 'Akira', description: 'Renard de feu très agile', pv: 100, force: 25, vitesse: 80, enRepos: false, victoires: 0, boost: false },
    { nom: 'Shiro', description: 'Esprit des neiges', pv: 120, force: 20, vitesse: 60, enRepos: false, victoires: 0, boost: false },
    { nom: 'Kuro', description: 'Créature des ombres', pv: 90, force: 35, vitesse: 70, enRepos: false, victoires: 0, boost: false },
    { nom: 'Yoko', description: 'Renard mystique équilibré', pv: 110, force: 22, vitesse: 75, enRepos: true, victoires: 0, boost: false },
    { nom: 'Raiju', description: 'Maître de la foudre', pv: 85, force: 40, vitesse: 95, enRepos: false, victoires: 0, boost: false }
  ]);

  // Exposition publique en lecture seule
  readonly liste = this._liste.asReadonly();

  // Méthode de mutation dédiée (immutabilité)
  activerBoost(nom: string): void {
    this._liste.update(kitsunes =>
      kitsunes.map(k => k.nom === nom ? { ...k, boost: true } : k)
    );
  }

  // Vérifie si le nom est déjà utilisé (insensible à la casse)
  nomExiste(nom: string): boolean {
    return this._liste().some(k => k.nom.toLowerCase() === nom.toLowerCase());
  }

  // Ajoute un nouveau Kitsune de manière immuable
  ajouter(nouveau: Kitsune): void {
    this._liste.update(liste => [...liste, nouveau]);
  }

  terminerCombat(nomGagnant: string, nomPerdant: string): void {
    // 1. Mise à jour immédiate (Victoire, repos du perdant, et perte des boosts)
    this._liste.update(liste => liste.map(k => {
      if (k.nom === nomGagnant) {
        return { ...k, victoires: k.victoires + 1, boost: false };
      }
      if (k.nom === nomPerdant) {
        return { ...k, enRepos: true, boost: false };
      }
      return k;
    }));

    // 2. Le Kitsune perdant repasse "enRepos" à false après 1 minute (60 000 ms)
    setTimeout(() => {
      this._liste.update(liste => liste.map(k =>
        k.nom === nomPerdant ? { ...k, enRepos: false } : k
      ));
    }, 60000);
  }
}