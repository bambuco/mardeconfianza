import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreditsPage } from './credits';

@NgModule({
  declarations: [
    CreditsPage,
  ],
  imports: [
  	TranslateModule.forChild(),
    IonicPageModule.forChild(CreditsPage),
  ],
})
export class CreditsPageModule {}
