import { Component, input, output } from '@angular/core';

@Component({
  selector: 'poke-list-item-component',
  templateUrl: './poke-list-item.component.html',
})
export class PokeListItemComponent {
  imageUrl = input.required<string>();
  pokemonId = input.required<number>();
  pokemonClick = output<number>();

  onClick(): void {
    this.pokemonClick.emit(this.pokemonId());
  }
}
