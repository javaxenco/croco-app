import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-game-card',
  standalone: true,
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  imports: [NgOptimizedImage],
})
export class GameCardComponent {
  @Input() url: string;
  @Input() name: string;
  @Input() tags: string[] = ['new', 'jackpot'];
}
