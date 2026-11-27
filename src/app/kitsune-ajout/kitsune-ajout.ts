import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormRoot, FormField, form, required, minLength } from '@angular/forms/signals';
import { Kitsunes } from '../services/kitsune';
import { Kitsune } from '../models/kitsune';

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
      required(schema.nom, {message:'Le nom est obligatoire !'})
      // minLength(schema.nom, 5,{message:'Le nom doit faire 5 lettres minimum !'})
      required(schema.description, {message:'La description est obligatoire !'})
      required(schema.pv)
      required(schema.force)
      required(schema.vitesse)
    },
    {
    submission: {
      action: async (schema) => {
        // 1. Extraction des valeurs primitives depuis les signaux du FieldTree
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

        // 3. Création de l'objet propre sans étendre directement le schema
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