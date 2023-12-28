export interface GameModelArray {
  data: GameTypeModel[];
}

export interface GameModel {
  data: GameTypeModel;
}

export interface GameTypeModel {
  type: string;
  category: string;
  platform: string;
  name: string;
  order: number;
  totalGames: number;
  icon?: string;
  games: BaseGameModel[];
}

export interface BaseGameModel {
  game_id: string;
  name: string;
  provider: string;
  providerName: string;
  image: string;
  imageSet: {
    blurhash: string;
    original: string;
    webp: string;
  };
  url: string;
  order: 1;
  tags: string[];
  stats: string[];
  gameId: string;
  image2: string;
}
