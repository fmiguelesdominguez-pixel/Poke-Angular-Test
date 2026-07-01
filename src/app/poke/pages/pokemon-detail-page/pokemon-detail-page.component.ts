import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/poke.service';
import { Pokemon } from '../../interfaces/poke.interfaces';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
  styleUrl: './pokemon-detail-page.component.css',
  imports: [TitleCasePipe]
})
export default class PokemonDetailPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokeService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);

  pokemon: Pokemon | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokeService.getPokemonDetails(+id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    } else {
      this.error = true;
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['dashboard', 'trending']);
  }

  getNormalSprite(): string {
    if (!this.pokemon) return '';
    return (
      this.pokemon.sprites.other?.['official-artwork']?.front_default ||
      this.pokemon.sprites.front_default ||
      ''
    );
  }

  getShinySprite(): string {
    if (!this.pokemon) return '';
    return (
      this.pokemon.sprites.other?.['official-artwork']?.front_shiny ||
      this.pokemon.sprites.front_shiny ||
      ''
    );
  }
}
