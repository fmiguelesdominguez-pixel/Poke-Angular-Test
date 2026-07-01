import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import { Observable, switchMap, forkJoin, map, tap } from 'rxjs';
import {
  PokemonCatalog,
  PokemonListResponse,
  PokemonSpriteResponse,
  PokemonTypeResponse,
} from '../interfaces/pokemon.interfaces';
import { PokeMapper } from '../mapper/poke.mappper';

const HISTORY_KEY = 'pokemon_search_history';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private readonly GENERATION_5_LIMIT = 156;
  private readonly GENERATION_5_OFFSET = 493;
  private readonly GENERATION_3_LIMIT = 135;
  private readonly GENERATION_3_OFFSET = 251;

  private isLoadingMore = signal(false);
  private currentOffset = signal(this.GENERATION_5_OFFSET);

  private isLoadingMoreGen3 = signal(false);
  private currentOffsetGen3 = signal(this.GENERATION_3_OFFSET);

  trendingPokemon = signal<PokemonCatalog[]>([]);
  trendingPokemonLoading = signal(true);

  generation3Pokemon = signal<PokemonCatalog[]>([]);
  generation3PokemonLoading = signal(true);

  searchHistory = signal<Record<string, PokemonCatalog[]>>(this.loadHistoryFromStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadInitialPokemon();
    this.loadInitialGeneration3Pokemon();
  }

  /// HISTORY ///
  ///////////////
  savePokemonToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(HISTORY_KEY, historyString);
  });

  private loadHistoryFromStorage(): Record<string, PokemonCatalog[]> {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /// POKEMON LOAD ///
  ///////////////////
  private loadInitialPokemon(): void {
    this.trendingPokemonLoading.set(true);
    this.loadMorePokemon();
  }

  private loadInitialGeneration3Pokemon(): void {
    this.generation3PokemonLoading.set(true);
    this.loadMoreGeneration3Pokemon();
  }

  loadMorePokemon(): void {
    if (this.isLoadingMore()) return;

    if (this.trendingPokemon().length >= this.GENERATION_5_LIMIT) {
      console.log('Ya llegaste al límite de 156 Pokémon. No se cargarán más.');
      this.trendingPokemonLoading.set(false);
      return;
    }
    const loadedCount = this.trendingPokemon().length;
    const remainingPokemons = this.GENERATION_5_LIMIT - loadedCount;
    const nextLimit = Math.min(50, remainingPokemons);

    if (nextLimit <= 0) return;
    this.isLoadingMore.set(true);
    console.log(`Cargando ${nextLimit} Pokémon... (${loadedCount}/${this.GENERATION_5_LIMIT})`);

    this.getPokemonList(nextLimit, this.currentOffset())
      .pipe(
        switchMap((listResponse) => {
          const pokemonDetailsRequests = listResponse.results.map((pokemon) =>
            this.getPokemonSpriteDetails(pokemon.url),
          );
          return forkJoin(pokemonDetailsRequests);
        }),
        map((pokemonDetails) => {
          return pokemonDetails.map((pokemon) => PokeMapper.mapToPokemonCatalog(pokemon));
        }),
      )
      .subscribe({
        next: (newPokemons) => {
          this.trendingPokemon.update((current) => [...current, ...newPokemons]);
          this.currentOffset.update((offset) => offset + newPokemons.length);
          this.isLoadingMore.set(false);

          if (this.trendingPokemon().length >= this.GENERATION_5_LIMIT) {
            this.trendingPokemonLoading.set(false);
            console.log(
              `Completo! Cargados ${this.trendingPokemon().length} Pokémon de la Generación 5`,
            );
          }

          console.log(
            `Cargados ${newPokemons.length} Pokémon. Total: ${this.trendingPokemon().length}`,
          );
        },
        error: (error) => {
          console.error('Error cargando más Pokémon:', error);
          this.isLoadingMore.set(false);
          this.trendingPokemonLoading.set(false);
        },
      });
  }

  loadMoreGeneration3Pokemon(): void {
    if (this.isLoadingMoreGen3()) return;

    if (this.generation3Pokemon().length >= this.GENERATION_3_LIMIT) {
      console.log('Ya llegaste al límite de 135 Pokémon de Generación 3. No se cargarán más.');
      this.generation3PokemonLoading.set(false);
      return;
    }
    const loadedCount = this.generation3Pokemon().length;
    const remainingPokemons = this.GENERATION_3_LIMIT - loadedCount;
    const nextLimit = Math.min(50, remainingPokemons);

    if (nextLimit <= 0) return;
    this.isLoadingMoreGen3.set(true);
    console.log(`Cargando ${nextLimit} Pokémon de Generación 3... (${loadedCount}/${this.GENERATION_3_LIMIT})`);

    this.getPokemonList(nextLimit, this.currentOffsetGen3())
      .pipe(
        switchMap((listResponse) => {
          const pokemonDetailsRequests = listResponse.results.map((pokemon) =>
            this.getPokemonSpriteDetails(pokemon.url),
          );
          return forkJoin(pokemonDetailsRequests);
        }),
        map((pokemonDetails) => {
          return pokemonDetails.map((pokemon) => PokeMapper.mapToPokemonCatalog(pokemon));
        }),
      )
      .subscribe({
        next: (newPokemons) => {
          this.generation3Pokemon.update((current) => [...current, ...newPokemons]);
          this.currentOffsetGen3.update((offset) => offset + newPokemons.length);
          this.isLoadingMoreGen3.set(false);

          if (this.generation3Pokemon().length >= this.GENERATION_3_LIMIT) {
            this.generation3PokemonLoading.set(false);
            console.log(
              `Completo! Cargados ${this.generation3Pokemon().length} Pokémon de la Generación 3`,
            );
          }

          console.log(
            `Cargados ${newPokemons.length} Pokémon de Generación 3. Total: ${this.generation3Pokemon().length}`,
          );
        },
        error: (error) => {
          console.error('Error cargando más Pokémon de Generación 3:', error);
          this.isLoadingMoreGen3.set(false);
          this.generation3PokemonLoading.set(false);
        },
      });
  }

  getPokemonList(limit: number = 20, offset: number = 0): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${environment.apiUrl}/pokemon?limit=${limit}&offset=${offset}`,
    );
  }

  getPokemonById(id: number): Observable<PokemonSpriteResponse> {
    return this.http.get<PokemonSpriteResponse>(`${environment.apiUrl}/pokemon/${id}`);
  }

  getPokemonSpriteDetails(url: string): Observable<PokemonSpriteResponse> {
    return this.http.get<PokemonSpriteResponse>(url);
  }

  /// POKEMON SEARCH & HISTORY ///
  ///////////////////////////////
  searchByType(type: string, limit = 30): Observable<PokemonCatalog[]> {
    return this.http
      .get<PokemonTypeResponse>(`${environment.apiUrl}/type/${type.toLowerCase()}`)
      .pipe(
        switchMap((response) => {
          const requests = response.pokemon
            .slice(0, limit)
            .map((p) => this.getPokemonSpriteDetails(p.pokemon.url));
          return forkJoin(requests);
        }),
        map((pokemons) => pokemons.map((p) => PokeMapper.mapToPokemonCatalog(p))),
        tap((items) => {
          this.searchHistory.update((history) => {
            const updated = { ...history, [type.toLowerCase()]: items };
            return updated;
          });
        }),
      );
  }

  getHistoryPokemon(query: string): PokemonCatalog[] {
    return this.searchHistory()[query] ?? [];
  }
}
