import { Routes } from '@angular/router';
import { KitsuneListe } from './components/kitsune-list/kitsune-list';
import { KitsuneDetails } from './components/kitsune-list/kitsune-details/kitsune-details';
import { KitsuneAjout } from './components/kitsune-ajout/kitsune-ajout';
import { KitsuneIntrouvable } from './components/kitsune-introuvable/kitsune-introuvable';
import { KitsuneBataille } from './components/kitsune-bataille/kitsune-bataille';
// Importe ton composant NotFound quand il sera créé (Écran Kitsune introuvable)

export const routes: Routes = [
  { path: '', component: KitsuneListe }, // L'écran par défaut
  { path: 'ajout', component: KitsuneAjout },
  { path: 'details/:nom', component: KitsuneDetails },  
  { path: 'bataille', component: KitsuneBataille },
  { path: 'introuvable', component: KitsuneIntrouvable },
  { path: '**', redirectTo: 'introuvable' }
];