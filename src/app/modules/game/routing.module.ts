import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {GameTableActionComponent} from './controllers/game-table-action.component';

const routes: Routes = [
  {path: '', component: GameTableActionComponent}
];

@NgModule(
  {
    imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
    exports: [ReactiveFormsModule, RouterModule]
  }
)
export class RoutingModule {
}
