import { Component, inject, computed, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Kitsunes } from '../../../services/kitsune';

@Component({
  selector: 'app-kitsune-details',
  standalone: true,
  imports: [],
  templateUrl: './kitsune-details.html',
  styleUrls: ['./kitsune-details.css']
})
export class KitsuneDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private kitsunesService = inject(Kitsunes);

  private paramMap = toSignal(this.route.paramMap);
  
  // récupération du nom du kitsune
  nomKitsune = computed(() => this.paramMap()?.get('nom'));

  // Kitsune trouvé dans le signal du service
  kitsune = computed(() => {
    const nom = this.nomKitsune();
    return nom ? this.kitsunesService.liste().find(k => k.nom === nom) : undefined;
  });

  // États locaux
  compteurClics = signal(0);
  desactiveAuChargement = signal(false);

  constructor() {
    effect(() => {
      const nom = this.nomKitsune();
      const k = this.kitsune();
      
      if (nom && !k) {
        this.router.navigate(['/introuvable'], { replaceUrl: true });
        return; 
      }

      if (k && this.compteurClics() === 0) {
        this.desactiveAuChargement.set(k.boost);
      }
    }, { allowSignalWrites: true });
  }

  // bouton désactivé ?
  boutonDesactive = computed(() => {
    const k = this.kitsune();
    if (!k) return true;
    if (this.desactiveAuChargement()) return true;
    if (k.boost) return true;
    if (this.compteurClics() >= 3 && !k.boost) return true;
    return false;
  });

  tenterBoost(): void {
    const k = this.kitsune();
    if (!k || this.boutonDesactive()) return;

    this.compteurClics.update(c => c + 1);
    
    const chance = Math.random();
    if (chance <= 0.25) {
      this.kitsunesService.activerBoost(k.nom);
    }
  }
}