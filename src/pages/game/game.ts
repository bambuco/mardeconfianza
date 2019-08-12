import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GameSetupProvider, PathPuzzleProvider, AudioPlayerProvider, AppConfigProvider } from '../../providers';
import { SOUND_GAME_WIN, SOUND_GOOD_STEP, SOUND_WRONG_STEP, CONFIG_SOUNDS_ENABLED, CONFIG_HELP_ENABLED } from '../../providers/constants';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

	rows: number;
	columns: number;
	matrix: any[];
  puzzle: any = {};
	ready: boolean;
  message: string;

  private sea: string;
  private other_sea: string;
	private setup: any;
	private loadingText: string;
  private wrongStepText: string;
  private instructions: string;
  private hideInstructions: boolean = true;
  private wrongStepTexts: string[];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  	private translator: TranslateService,
    private puzzleProvider: PathPuzzleProvider,
    private audioPlayer: AudioPlayerProvider,
    private appConfig: AppConfigProvider,
    gameSetup: GameSetupProvider
  ) {
  	let translatorObs = translator.get(['LOADING_TEXT', 'INSTRUCTIONS_TRUST', 'INSTRUCTIONS_COMPE']);
  	gameSetup.ready().subscribe((setup) => {
  		this.setup = setup;
      this.sea = this.navParams.get('sea') || 'trust';
      this.other_sea = this.sea == 'trust' ? 'compe' : 'trust';
  		translatorObs.subscribe(translations => {
  			this.loadingText = translations.LOADING_TEXT;
        this.instructions = translations[`INSTRUCTIONS_${this.sea.toUpperCase()}`];
        this.wrongStepTexts = [];
	  		this.loadPuzzle(true);
  		});
  	});
  }

  ionViewDidEnter() {
  }

  ngOnDestroy() {
    this.audioPlayer.stopAll();
  }

  start() {
    this.hideInstructions = true;
  }

  restart() {
    this.audioPlayer.stopAll();
  	this.loadPuzzle();
  }

  navigate() {
    this.audioPlayer.stopAll();
    this.navCtrl.setRoot('GamePage', { sea: this.other_sea })
  }

  loadPuzzle(initialize: boolean = false) {
  	//Present the loading indicator
  	this.ready = false;
    this.message = null;
  	let loading = this.loadingCtrl.create({ content: this.loadingText });
  	loading.present();

    if (initialize) {
      this.puzzleProvider.initialize(this.setup, this.sea);
    }

  	//Get the matrix information;
    try {
      this.puzzle = this.puzzleProvider.createPuzzle(0);
      if (this.appConfig.get(CONFIG_HELP_ENABLED, true)) {
        this.hideInstructions = false;
      }
    }
    catch (err) {
      this.translator.get(err).subscribe(value => {
        this.message = value;
      });
    }  	
    this.ready = true;
  	loading.dismiss();
  }


  reveal(tile) {
    const step = this.puzzle.walkTo(tile);
    if (step == null) {
      return;
    }
    this.message = step ? tile.forward : ['<strong class="highlight-error">', tile.label, '</strong> - ', this.getWrongStepText()].join('');

    
    //
    if (!this.appConfig.get(CONFIG_SOUNDS_ENABLED, true)) {
      return; //
    }
    //Play a sound based on the result
    if (step) {
      this.audioPlayer.play(this.puzzle.completed ? SOUND_GAME_WIN : SOUND_GOOD_STEP);
    }
    else {
      this.audioPlayer.play(SOUND_WRONG_STEP);
    }
  }

  openConfig() {
    this.modalCtrl.create('SettingsPage').present();
  }

  private getWrongStepText() {
    if (this.wrongStepTexts.length == 0){
      this.wrongStepTexts = this.setup.strings['wrong_step'].slice(0);
    }
    return this.wrongStepTexts.splice(Math.round((this.wrongStepTexts.length - 1) * Math.random()), 1)[0];
  }
}
