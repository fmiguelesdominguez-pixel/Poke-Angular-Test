import { Component, input } from '@angular/core';
import { PokeListItemComponent } from './poke-list-item/poke-list-item.component';
import { PokemonCatalog } from '../../interfaces/pokemon.interfaces';

@Component({
  selector: 'poke-list-component',
  templateUrl: './poke-list.component.html',
  imports: [PokeListItemComponent],
})
export class PokeListComponent {
  poke = input.required<PokemonCatalog[]>();
}
