// ---- Interfaces base reutilizables ----

interface NamedResource {
  name: string;
  url: string;
}

// ---- Abilities ----

interface PokemonAbility {
  ability: NamedResource;
  is_hidden: boolean;
  slot: number;
}

// ---- Cries ----

interface PokemonCries {
  latest: string;
  legacy: string;
}

// ---- Game Indices ----

interface PokemonGameIndex {
  game_index: number;
  version: NamedResource;
}

// ---- Moves ----

interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedResource;
  order: number | null;
  version_group: NamedResource;
}

interface PokemonMove {
  move: NamedResource;
  version_group_details: MoveVersionGroupDetail[];
}

// ---- Sprites ----

interface PokemonSpritesGenerationI {
  "red-blue": {
    back_default: string | null;
    back_gray: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_gray: string | null;
    front_transparent: string | null;
  };
  yellow: {
    back_default: string | null;
    back_gray: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_gray: string | null;
    front_transparent: string | null;
  };
}

interface PokemonSpritesGenerationII {
  crystal: {
    back_default: string | null;
    back_shiny: string | null;
    back_shiny_transparent: string | null;
    back_transparent: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_shiny_transparent: string | null;
    front_transparent: string | null;
  };
  gold: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent: string | null;
  };
  silver: {
    back_default: string | null;
    back_shiny: string | null;
    front_default: string | null;
    front_shiny: string | null;
    front_transparent: string | null;
  };
}

interface GenerationIIISprite {
  back_default: string | null;
  back_shiny: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

interface PokemonSpritesGenerationIII {
  emerald: Pick<GenerationIIISprite, "front_default" | "front_shiny">;
  "firered-leafgreen": GenerationIIISprite;
  "ruby-sapphire": GenerationIIISprite;
}

interface GenerationIVSprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface PokemonSpritesGenerationIV {
  "diamond-pearl": GenerationIVSprite;
  "heartgold-soulsilver": GenerationIVSprite;
  platinum: GenerationIVSprite;
}

interface AnimatedSprite extends GenerationIVSprite {}

interface PokemonSpritesGenerationV {
  "black-white": GenerationIVSprite & { animated: AnimatedSprite };
}

interface GenerationVISprite {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface PokemonSpritesGenerationVI {
  "omegaruby-alphasapphire": GenerationVISprite;
  "x-y": GenerationVISprite;
}

interface IconSprite {
  front_default: string | null;
  front_female: string | null;
}

interface GenerationVIISprite {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface PokemonSpritesGenerationVII {
  icons: IconSprite;
  "ultra-sun-ultra-moon": GenerationVIISprite;
}

interface PokemonSpritesGenerationVIII {
  "brilliant-diamond-shining-pearl": IconSprite;
  icons: IconSprite;
}

interface PokemonSpritesGenerationIX {
  "scarlet-violet": {
    front_default: string | null;
    front_female: string | null;
  };
}

interface PokemonSpritesVersions {
  "generation-i": PokemonSpritesGenerationI;
  "generation-ii": PokemonSpritesGenerationII;
  "generation-iii": PokemonSpritesGenerationIII;
  "generation-iv": PokemonSpritesGenerationIV;
  "generation-v": PokemonSpritesGenerationV;
  "generation-vi": PokemonSpritesGenerationVI;
  "generation-vii": PokemonSpritesGenerationVII;
  "generation-viii": PokemonSpritesGenerationVIII;
  "generation-ix": PokemonSpritesGenerationIX;
}

interface PokemonSpritesOther {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  "official-artwork": {
    front_default: string | null;
    front_shiny: string | null;
  };
  showdown: GenerationIVSprite;
}

interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: PokemonSpritesOther;
  versions: PokemonSpritesVersions;
}

// ---- Stats ----

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

// ---- Types ----

interface PokemonType {
  slot: number;
  type: NamedResource;
}

// ---- Past Abilities ----

interface PastAbilityEntry {
  ability: NamedResource | null;
  is_hidden: boolean;
  slot: number;
}

interface PokemonPastAbility {
  abilities: PastAbilityEntry[];
  generation: NamedResource;
}

// ---- Past Stats ----

interface PastStatEntry {
  base_stat: number;
  effort: number;
  stat: NamedResource;
}

interface PokemonPastStat {
  generation: NamedResource;
  stats: PastStatEntry[];
}

// ---- Pokemon (raíz) ----

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: PokemonCries;
  forms: NamedResource[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: unknown[]; // array vacío en la respuesta; ampliar si se necesita
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_abilities: PokemonPastAbility[];
  past_stats: PokemonPastStat[];
  past_types: unknown[]; // array vacío; ampliar si se necesita
  species: NamedResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
}