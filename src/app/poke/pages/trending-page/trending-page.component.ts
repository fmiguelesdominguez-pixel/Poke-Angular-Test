import { Component, inject, viewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PokemonService } from '../../services/poke.service';
import { PokeMasonry } from '../../components/poke-masonry/poke-masonry.component';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'trending-page',
  templateUrl: './trending-page.component.html',
  imports: [PokeMasonry],
})
export default class TrendingPageComponent implements AfterViewInit {
  pokeService = inject(PokemonService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  scrollStateService = inject(ScrollStateService);

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isNearBottom = scrollTop + clientHeight + 10 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isNearBottom) {
      this.pokeService.loadMorePokemon();
    }
  }
}
