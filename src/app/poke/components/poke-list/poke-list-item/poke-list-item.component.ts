import { Component, input } from '@angular/core';

@Component({
  selector: 'poke-list-item-component',
  templateUrl: './poke-list-item.component.html',
})
export class PokeListItemComponent {
  imageUrl = input.required<string>();
}
