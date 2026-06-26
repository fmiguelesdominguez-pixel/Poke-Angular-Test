import { Component, computed, ElementRef, input, viewChild } from '@angular/core';
import { PokemonCatalog } from '../../interfaces/pokemon.interfaces';

@Component({
  selector: 'poke-masonry-component',
  templateUrl: './poke-masonry.component.html',
  styleUrl: './poke-masonry.component.css',
})
export class PokeMasonry {
  pokemons = input.required<PokemonCatalog[]>();

}
