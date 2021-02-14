import {Component} from '@angular/core';
import {GameService} from '../services/game-service';

@Component(
  {
    templateUrl: './../views/game-table.html',
    styles: ['#table button {width: 30px; height: 30px;}'],
    providers: [],
  }
)
export class GameTableActionComponent {
  hasStartedGame = false;
  isFinishedGame = false;
  tableState: {[key: string]: string; } = {};
  activePlayerId: string | null = null;
  activeGameId: number | null = null;
  winner = '';

  private defaultTableState: {[key: string]: string; }  = {1: '-', 2: '-', 3: '-', 4: '-', 5: '-', 6: '-', 7: '-', 8: '-', 9: '-'};

  public constructor(private gameService: GameService) {
  }

  startGame(): void {
    this.gameService.start().subscribe(response => {
      this.activeGameId = response.data.id;
      this.activePlayerId = response.data.starterUserId;
      this.tableState = this.defaultTableState;
      this.hasStartedGame = true;
      this.isFinishedGame = false;
    });
  }

  choosePlace(placeId: string): void {
    if (this.isFinishedGame) {
      return;
    }
    console.log(this.activeGameId, placeId, this.activePlayerId);
    this.gameService.choosePlace({gameId: this.activeGameId, placeId, playerId: this.activePlayerId}).subscribe(reponse => {
      this.tableState = reponse.data.currentGameStatePlace;
      this.activePlayerId = reponse.data.nextPlayerId;
      if (reponse.data.finished) {
        this.isFinishedGame = true;
        this.winner = reponse.data.winner;
      }
    });
  }
}
