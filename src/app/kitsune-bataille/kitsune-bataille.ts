import { Component, inject, signal, computed } from '@angular/core';
import { Kitsunes } from '../services/kitsune';
import { Kitsune } from '../models/kitsune';

@Component({
  selector: 'app-kitsune-bataille',
  standalone: true,
  templateUrl: './kitsune-bataille.html',
  styleUrls: ['./kitsune-bataille.css']
})
export class KitsuneBataille {
  private kitsunesService = inject(Kitsunes);

  // Uniquement les Kitsunes qui ne sont pas en repos
  disponibles = computed(() => this.kitsunesService.liste().filter(k => !k.enRepos));

  // États locaux
  selection = signal<Kitsune[]>([]);
  combatEnCours = signal(false);
  message = signal<string | null>(null);

  // Etat du bouton
  boutonActif = computed(() => this.selection().length === 2 && !this.combatEnCours());

  basculerSelection(k: Kitsune): void {
    if (this.combatEnCours()) return; // Bloquer pendant le ocmbat

    const estSelectionne = this.selection().some(sel => sel.nom === k.nom);
    
    if (estSelectionne) {
      this.selection.update(s => s.filter(sel => sel.nom !== k.nom));
    } else if (this.selection().length < 2) {
      this.selection.update(s => [...s, k]);
    }
  }

  estSelectionne(k: Kitsune): boolean {
    return this.selection().some(sel => sel.nom === k.nom);
  }

  lancerCombat(): void {
    if (!this.boutonActif()) return;

    this.combatEnCours.set(true);
    this.message.set("⚔️ Combat en cours...");

    const [k1, k2] = this.selection();
    
    // Clonage local + pv doublé si boosté
    let c1 = { ...k1, pvActuels: k1.boost ? k1.pv * 2 : k1.pv };
    let c2 = { ...k2, pvActuels: k2.boost ? k2.pv * 2 : k2.pv };

    // Ordre d'attaque basé sur la vitesse
    let attaquant1, attaquant2;
    if (c1.vitesse > c2.vitesse) {
      attaquant1 = c1; attaquant2 = c2;
    } else if (c2.vitesse > c1.vitesse) {
      attaquant1 = c2; attaquant2 = c1;
    } else {
      // Égalité de vitesse : aléatoire
      if (Math.random() > 0.5) { attaquant1 = c1; attaquant2 = c2; }
      else { attaquant1 = c2; attaquant2 = c1; }
    }

    // Simulation du combat tour par tour
    while (attaquant1.pvActuels > 0 && attaquant2.pvActuels > 0) {
      attaquant2.pvActuels -= attaquant1.force;
      if (attaquant2.pvActuels <= 0) break;
      attaquant1.pvActuels -= attaquant2.force;
    }

    const gagnant = attaquant1.pvActuels > 0 ? attaquant1 : attaquant2;
    const perdant = attaquant1.pvActuels > 0 ? attaquant2 : attaquant1;

    // Délais de 3 secondes avant résultat
    setTimeout(() => {
      this.kitsunesService.terminerCombat(gagnant.nom, perdant.nom);
      this.message.set(`🏆 Victoire de ${gagnant.nom} contre ${perdant.nom} !`);
      
      // Remise à zéro
      this.selection.set([]);
      this.combatEnCours.set(false);
    }, 3000);
  }
}