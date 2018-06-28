import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { TranslateService } from '@ngx-translate/core';
import { AudioPlayerProvider, AppConfigProvider } from '../providers';
import { SOUND_GAME_WIN, SOUND_GOOD_STEP, SOUND_WRONG_STEP } from '../providers/constants';

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
    private mobileAccessibility: MobileAccessibility,
    private translate: TranslateService,
    private audioPlayer: AudioPlayerProvider,
    appConfig: AppConfigProvider
  ) {
    platform.ready().then(() => {
      this.cordovaInit();
    });

    platform.resume.subscribe(() => {
      this.cordovaInit();
    });

    this.initTranslate();
    setTimeout(() => {
      this.assetPreload();
    }, 1);
  }

  cordovaInit() {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    setTimeout(() => {
      this.splashScreen.hide();
    }, 1000);
    this.mobileAccessibility.usePreferredTextZoom(false);
    this.androidFS.isImmersiveModeSupported()
      .then(() => this.androidFS.immersiveMode())
      .catch((error: any) => console.log(error));
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    //Check https://github.com/ngx-translate/core to see how to make it dynamic
  }

  private assetPreload() {
    //Register audio sounds so they can be easily preloaded later
    const path = "assets/game/aud/";
    let sounds = [
      { key: SOUND_GOOD_STEP, path: [path, 'good_step.mp3'].join(''), preload: true },
      { key: SOUND_WRONG_STEP, path: [path, 'wrong_step.mp3'].join(''), preload: true },
      { key: SOUND_GAME_WIN, path: [path, 'game_win.mp3'].join(''), preload: true }
    ];
    
    for (let sound of sounds){
      this.audioPlayer.register(sound.key, sound.path, sound.preload);
    }
  }


}

