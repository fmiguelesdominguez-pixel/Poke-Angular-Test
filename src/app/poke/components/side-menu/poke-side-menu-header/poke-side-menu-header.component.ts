import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'poke-side-menu-header',
  templateUrl: './poke-side-menu-header.component.html',
})
export class PokeSideMenuHeaderComponent {
  envs = environment;
}
