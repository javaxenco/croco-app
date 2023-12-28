import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GamesService } from '../../core/services/games.service';
import { BaseGameModel } from '../../core/models/game.model';
import { Subject, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryList, CategoryNameList } from '../../core/enum/category.enum';
import { FilterEnum } from '../../core/enum/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.scss',
})
export class CategoryFiltersComponent implements OnInit, OnDestroy {
  gameService = inject(GamesService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  activeCategory: string;
  games: BaseGameModel[];
  destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.gameService.getCategories().pipe(take(1)).subscribe(() => {
      const param = this.activatedRouter.snapshot.queryParams['category'];
      if (param)
        this.gameService
          .categoryGames(param)
          .pipe(take(1))
          .subscribe(() => {
            this.activeCategory = param;
            this.gameService.activeFilter.set(FilterEnum.Category);
          });
      else this.chooseCategory(CategoryList.WebPopular);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  chooseCategory(category: string) {
    if (this.activeCategory === category) return;
      this.router
        .navigate([], {
          queryParams: {
            category,
          },
        })
        .then(() => {
          const gameData = this.gameService
            .categoryGameData()
            .find((data) => data.category === category);
          if(gameData)
          this.gameService.filteredGames.set(gameData.games);
          this.activeCategory = category;
          this.gameService.activeFilter.set(FilterEnum.Category);
        });
  }

  protected readonly CategoryList = CategoryList;
  protected readonly FilterEnum = FilterEnum;
  protected readonly CategoryNameList = CategoryNameList;
}
