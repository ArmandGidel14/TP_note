import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Kitsunes } from '../../services/kitsune';

@Component({
  imports: [RouterLink],
  selector: 'app-kitsune-list',
  styleUrl: './kitsune-list.css',
  templateUrl: './kitsune-list.html',
})

export class KitsuneListe {
  private kitsunesService = inject(Kitsunes);
  
  // Exposition directe du signal readonly depuis le service
  liste = this.kitsunesService.liste;
}
