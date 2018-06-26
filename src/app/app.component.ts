import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private androidFS: AndroidFullScreen,
    private translate: TranslateService
  ) {
    platform.ready().then(() => {
      this.cordovaInit();
    });

    platform.resume.subscribe(() => {
      this.cordovaInit();
    });

    this.initTranslate();
  }

  cordovaInit() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidFS.isImmersiveModeSupported()
        .then(() => this.androidFS.immersiveMode())
        .catch((error: any) => console.log(error));
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    //Check https://github.com/ngx-translate/core to see how to make it dynamic
  }

}

