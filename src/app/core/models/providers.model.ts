import { BaseGameModel } from './game.model';

export interface ProvidersModel {
  data: BaseProvidersModel[];
}

export interface BaseProvidersModel {
  _id: string;
  name: string;
  iframeW: number;
  iframeH: number;
  vendor: string;
  provider: string;
  type: string;
  order: number;
  enabled: true;
  logo: string;
  tags: string[];
  gamesCount: number;
}

export interface ProviderGamesModel {
  data: {
    type: string;
    provider: string;
    vendor: string;
    iframeW: number;
    iframeH: number;
    name: string;
    order: number;
    games: BaseGameModel[];
  };
}
