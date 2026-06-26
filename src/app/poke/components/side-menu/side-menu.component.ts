import { Component } from '@angular/core';
import { PokeSideMenuHeaderComponent } from './poke-side-menu-header/poke-side-menu-header.component';
import { PokeSideMenuOptionsComponent } from './poke-side-menu-options/poke-side-menu-options.component';

@Component({
  selector: 'poke-side-menu-component',
  templateUrl: './side-menu.component.html',
  imports: [PokeSideMenuHeaderComponent, PokeSideMenuOptionsComponent],
})
export class SideMenuComponent {}
