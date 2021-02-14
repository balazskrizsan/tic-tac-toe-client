import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {GameTableActionComponent} from './controllers/game-table-action.component';

@NgModule(
  {
    imports: [CommonModule, RoutingModule],
    declarations: [GameTableActionComponent],
  }
)
export class GameModule {
}
