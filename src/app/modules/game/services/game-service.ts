import {Injectable} from '@angular/core';
import {GameRepository} from '../repositories/game-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {IGameStartResponse} from '../interfaces/i-game-start-response';
import {IGameState} from '../interfaces/i-game-state';
import {IChoosePlaceResponse} from '../interfaces/i-choose-place-response';

@Injectable()
export class GameService {

  constructor(private gameRepository: GameRepository) {
  }

  public start(): Observable<IResponseEntity<IGameStartResponse>> {
    return this.gameRepository.start();
  }

  public choosePlace(gameState: IGameState): Observable<IResponseEntity<IChoosePlaceResponse>> {
    return this.gameRepository.choosePlace(gameState);
  }
}
