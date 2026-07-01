import { Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonCatalog } from '../../interfaces/pokemon.interfaces';

@Component({
  selector: 'poke-masonry-component',
  templateUrl: './poke-masonry.component.html',
  styleUrl: './poke-masonry.component.css',
})
export class PokeMasonry {
  pokemons = input.required<PokemonCatalog[]>();
  private router = inject(Router);

  onPokemonClick(pokemon: PokemonCatalog): void {
    this.router.navigate(['dashboard', 'pokemon', pokemon.id], {
      state: { returnUrl: this.router.url }
    });
  }
}
