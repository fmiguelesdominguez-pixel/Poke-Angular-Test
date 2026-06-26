import { Component, inject, signal } from '@angular/core';
import { PokeListComponent } from '../../components/poke-list/poke-list.component';
import { PokemonService } from '../../services/poke.service';
import { PokemonCatalog } from '../../interfaces/pokemon.interfaces';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  imports: [PokeListComponent],
})
export default class SearchPageComponent {
  pokeService = inject(PokemonService);
  pokemons = signal<PokemonCatalog[]>([]);

  onSearch(query: string) {
    this.pokeService.searchByType(query).subscribe((resp) => this.pokemons.set(resp));
  }
}
