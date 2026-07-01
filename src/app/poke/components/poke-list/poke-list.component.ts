import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PokeListItemComponent } from './poke-list-item/poke-list-item.component';
import { PokemonCatalog } from '../../interfaces/pokemon.interfaces';

@Component({
  selector: 'poke-list-component',
  templateUrl: './poke-list.component.html',
  imports: [PokeListItemComponent],
})
export class PokeListComponent {
  poke = input.required<PokemonCatalog[]>();
  private router = inject(Router);

  onPokemonClick(pokemonId: number): void {
    this.router.navigate(['dashboard', 'pokemon', pokemonId]);
  }
}
