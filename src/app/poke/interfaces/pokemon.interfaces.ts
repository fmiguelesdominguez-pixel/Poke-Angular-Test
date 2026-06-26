export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

export interface PokemonBasic {
  name: string;
  url: string;
}

export interface PokemonCatalog {
  id: number;
  name: string;
  sprite_animated: string;
}

export interface PokemonSpriteResponse {
  id: number;
  name: string;
  sprites: {
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string | null;
            front_shiny: string | null;
          };
        };
      };
    };
  };
}

export interface PokemonTypeResponse {
  pokemon: {
    pokemon: PokemonBasic;
    slot: number;
  }[];
}
