import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import {
  BaseGameModel,
  GameModel,
  GameModelArray,
  GameTypeModel,
} from '../models/game.model';
import { ProviderGamesModel } from '../models/providers.model';
import { FilterEnum } from '../enum/filter.enum';
import {
  CategoryIcons,
  CategoryList,
  CategoryNameList,
} from '../enum/category.enum';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  http = inject(HttpClient);
  API_KEY = 'https://cms.crocobet.com/integrations/v2/slot/categories';
  API_KEY2 = 'https://cms.crocobet.com/integrations/v2/slot/providers';
  filteredGames: WritableSignal<BaseGameModel[]> = signal([]);
  activeFilter: WritableSignal<FilterEnum> = signal(FilterEnum.Category);
  categoryGameData: WritableSignal<GameTypeModel[]> = signal([]);

  getCategories(): Observable<GameTypeModel[]> {
    const params = new HttpParams().append('include', 'games');
    return this.http
      .get<GameModelArray>(this.API_KEY, {
        params,
      })
      .pipe(
        map((result) => {
          return result.data
            .filter((result) => {
              return (
                result.category == CategoryList.WebPopular ||
                result.category == CategoryList.Favorites ||
                result.category == CategoryList.NewGames ||
                result.category == CategoryList.BuyBonus ||
                result.category == CategoryList.History
              );
            })
            .map((data) => {
              return {
                ...data,
                name: CategoryNameList[
                  data.category as keyof typeof CategoryNameList
                ],
                icon: CategoryIcons[
                  data.category as keyof typeof CategoryIcons
                ],
              };
            });
        }),
        tap((res) => {
          this.categoryGameData.set(res)
        })
      );
  }

  categoryGames(category: string): Observable<BaseGameModel[]> {
    const params = new HttpParams().append('include', 'games');
    return this.http
      .get<GameModel>(`${this.API_KEY}/${category}`, {
        params,
      })
      .pipe(
        map((result) => result.data.games),
        tap((games) => this.filteredGames.set(games))
      );
  }

  providerGames(provider: string): Observable<BaseGameModel[]> {
    return this.http
      .get<ProviderGamesModel>(`${this.API_KEY2}/${provider}`)
      .pipe(
        map((result) => result.data.games),
        tap((games) => {
          this.filteredGames.set(games);
        })
      );
  }
}
