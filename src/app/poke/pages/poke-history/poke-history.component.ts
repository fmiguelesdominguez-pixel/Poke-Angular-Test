import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PokemonService } from '../../services/poke.service';
import { PokeListComponent } from "../../components/poke-list/poke-list.component";

@Component({
  selector: 'poke-history-component',
  templateUrl: './poke-history.component.html',
  imports: [PokeListComponent],
})
export default class PokeHistoryComponent {
  pokeService = inject(PokemonService);

  query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));

  pokemonByKey = computed(() => {
    return this.pokeService.getHistoryPokemon(this.query());
  });
}
