import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http-service';
import {GameModule} from './modules/game/game.module';
import {GameService} from './modules/game/services/game-service';
import {GameRepository} from './modules/game/repositories/game-repository';

@NgModule(
  {
    declarations: [AppComponent],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot(
        [
          {path: 'game-table', loadChildren: () => GameModule},
        ],
        {preloadingStrategy: PreloadAllModules}
      ),
    ],
    providers: [
      HttpService,
      GameService,
      GameRepository
    ],
    bootstrap: [AppComponent],
  }
)
export class AppModule {
}
