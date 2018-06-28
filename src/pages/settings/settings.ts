import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController } from 'ionic-angular';
import { AppConfigProvider } from '../../providers';
import { CONFIG_SOUNDS_ENABLED, CONFIG_HELP_ENABLED } from '../../providers/constants';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare function require(moduleName: string): any;
const { version: appVersion } = require('../../../package.json');

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	version:any = appVersion;
	soundsEnabled: boolean;
	helpEnabled: boolean;

  constructor(
  	private viewCtrl: ViewController,
  	private modalCtrl: ModalController,
  	private appConfig: AppConfigProvider
  ) {
  }

  ngOnInit() {
    this.soundsEnabled = this.appConfig.get(CONFIG_SOUNDS_ENABLED, true);
    this.helpEnabled = this.appConfig.get(CONFIG_HELP_ENABLED, true);
  }

	dismiss() {
		this.viewCtrl.dismiss();
	}

  onChange(key) {
    switch (key) {
      case "sounds":
        this.appConfig.set(CONFIG_SOUNDS_ENABLED, !this.soundsEnabled).then(() => {
          this.soundsEnabled = !this.soundsEnabled;
        });

        break;
      case "help":
        this.appConfig.set(CONFIG_HELP_ENABLED, !this.helpEnabled).then(() => {
          this.helpEnabled = !this.helpEnabled;
        });

        break;
      
      default:
        break;
    }
  }

  viewCredits() {
    this.modalCtrl.create('CreditsPage').present();
  }

}
