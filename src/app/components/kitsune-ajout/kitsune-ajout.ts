import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormRoot, FormField, form, required, maxLength, max, min} from '@angular/forms/signals';
import { Kitsunes } from '../../services/kitsune';
import { Kitsune } from '../../models/kitsune';

@Component({
  selector: 'app-kitsune-ajout',
  standalone: true,
  imports: [FormRoot, FormField],
  templateUrl: './kitsune-ajout.html',
  styleUrls: ['./kitsune-ajout.css']
})
export class KitsuneAjout {
  private kitsunesService = inject(Kitsunes);
  private router = inject(Router);

  // État initial du formulaire
  protected readonly model = signal({
    nom: '',
    description: '',
    pv: 100,
    force: 10,
    vitesse: 10
  });

  // Initialisation du Signal Form
  form = form(this.model, 
    (schema) => {
      required(schema.nom, {message:'Le nom est obligatoire !'});
      maxLength(schema.nom, 100, {message:'le nom ne peut pas dépasser 100 caractère'});
      
      required(schema.description, {message:'La description est obligatoire !'});
      maxLength(schema.description, 10000, {message:'la description ne peut pas dépasser 10000 caractère'});
      
      required(schema.pv, {message:'Le nombre de pv est obligatoire !'});
      max(schema.pv, 1000, {message:'le nombre de pv ne peut pas dépasser 1000'});
      min(schema.pv, 1, {message:'le nombre de pv doit être supérieur à 0'});
      
      required(schema.force, {message:'La force est obligatoire !'});
      max(schema.force, 1000, {message:'La force ne peut pas dépasser 1000'});
      min(schema.force, 0, {message:'la force doit être au moins égal à 0'});
      
      required(schema.vitesse, {message:'La vitesse est obligatoire !'});
      max(schema.vitesse, 1000, {message:'La vitesse ne peut pas dépasser 1000'});
      min(schema.vitesse, 0, {message:'la vitesse doit être au moins égal à 0'});
    },
    {
    submission: {
      action: async (schema) => {
        const nom = schema().value().nom
        const description = schema().value().description
        const pv = schema().value().pv
        const force = schema().value().force
        const vitesse = schema().value().vitesse

        // 2. Vérification de l'unicité du nom avec la vraie valeur (string)
        if (this.kitsunesService.nomExiste(nom)) {
          alert('Impossible : Ce nom de Kitsune est déjà utilisé !');
          return;
        }

        const nouveauKitsune: Kitsune = {
          nom,
          description,
          pv,
          force,
          vitesse,
          enRepos: false,
          victoires: 0,
          boost: false
        };

        this.kitsunesService.ajouter(nouveauKitsune);
        
        // 4. Redirection vers la liste
        this.router.navigate(['/']);
      }
    }
  });
}