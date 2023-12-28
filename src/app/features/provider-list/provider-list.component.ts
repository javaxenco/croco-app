import { Component, inject, OnInit } from '@angular/core';
import { ProvidersService } from '../../core/services/providers.service';
import { CommonModule } from '@angular/common';
import { map, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GamesService } from '../../core/services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterEnum } from '../../core/enum/filter.enum';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.scss',
})
export class ProviderListComponent implements OnInit {
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);
  games$ = inject(GamesService);
  providers$ = inject(ProvidersService)
    .getProviders()
    .pipe(map((result) => result.data));
  providerList = toSignal(this.providers$);
  openState = false;
  activeProvider: string;

  ngOnInit() {
    const param = this.activatedRouter.snapshot.queryParams['provider'];
    if (param)
      this.games$
        .providerGames(param)
        .pipe(take(1))
        .subscribe(() => {
          this.activeProvider = param;
          this.games$.activeFilter.set(FilterEnum.Provider);
        });
  }

  modifyProvider(provider: string): string | undefined {
    return this.providerList()?.find((_provider) => _provider.name == provider)
      ?.provider;
  }

  chooseProvider(provider: string) {
    if (this.activeProvider === provider) return;
    this.activeProvider = provider;
    this.games$.activeFilter.set(FilterEnum.Provider);
    this.games$
      .providerGames(provider)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate([], {
          queryParams: {
            provider,
          },
        });
      });
  }

  protected readonly FilterEnum = FilterEnum;
}
