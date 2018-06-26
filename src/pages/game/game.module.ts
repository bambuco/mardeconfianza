import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DirectivesModule } from '../../directives/directives.module';
import { GamePage } from './game';

@NgModule({
  declarations: [
    GamePage,
  ],
  imports: [
  	DirectivesModule,
    IonicPageModule.forChild(GamePage),
  ],
})
export class GamePageModule {}
