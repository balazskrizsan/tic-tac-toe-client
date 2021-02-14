export interface IChoosePlaceResponse {
  currentGameStatePlace: {[key: string]: string; };
  finished: boolean;
  nextPlayerId: string;
  winner: string;
}
