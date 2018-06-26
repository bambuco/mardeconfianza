import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RepeatDirective } from './repeat/repeat';
import { PortraitDirective } from './portrait/portrait';

@NgModule({
	declarations: [RepeatDirective,
    PortraitDirective],
	imports: [
		IonicModule
	],
	exports: [RepeatDirective,
    PortraitDirective]
})
export class DirectivesModule {}
