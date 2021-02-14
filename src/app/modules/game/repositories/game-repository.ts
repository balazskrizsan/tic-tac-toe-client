import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {HttpService} from '../../../services/http-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';
import {IGameStartResponse} from '../interfaces/i-game-start-response';
import {IGameState} from '../interfaces/i-game-state';
import {IChoosePlaceResponse} from '../interfaces/i-choose-place-response';

@Injectable()
export class GameRepository extends AbstractApiRepository {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getController(): string {
    return 'v1/game';
  }

  public start(): Observable<IResponseEntity<IGameStartResponse>> {
    return this.get(this.getController() + '/start');
  }

  public choosePlace(gameState: IGameState): Observable<IResponseEntity<IChoosePlaceResponse>> {
    return this.post(this.getController() + '/' + gameState.gameId + '/choose-place', {
      placeId: gameState.placeId,
      playerId: gameState.playerId
    });
  }
}
