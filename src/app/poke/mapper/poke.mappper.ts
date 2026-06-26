import { PokemonCatalog, PokemonSpriteResponse } from '../interfaces/pokemon.interfaces';

export class PokeMapper {
  static mapToPokemonCatalog(pokemon: PokemonSpriteResponse): PokemonCatalog {
    return {
      id: pokemon.id,
      name: this.capitalizeName(pokemon.name),
      sprite_animated:
        pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/383.gif",
    };
  }

  private static capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
