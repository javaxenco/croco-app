import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NgOptimizedImage } from '@angular/common';
import { CategoryFiltersComponent } from '../category-filters/category-filters.component';
import { ProviderListComponent } from '../provider-list/provider-list.component';
import { GameListComponent } from '../game-list/game-list.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeaderComponent,
    SidenavComponent,
    NgOptimizedImage,
    CategoryFiltersComponent,
    ProviderListComponent,
    GameListComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
