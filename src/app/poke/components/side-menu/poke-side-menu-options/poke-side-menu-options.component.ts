import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PokemonService } from 'src/app/poke/services/poke.service';

interface MenuOption {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'poke-side-menu-options',
  templateUrl: './poke-side-menu-options.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class PokeSideMenuOptionsComponent {
  pokeService = inject(PokemonService);

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      sublabel: 'Poke Populares',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard/trending',
    },
    {
      label: 'Buscador',
      sublabel: 'Buscar pokemon',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/dashboard/search',
    },
  ];
}
