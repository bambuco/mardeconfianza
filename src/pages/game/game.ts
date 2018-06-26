import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GameSetupProvider, PathPuzzleProvider } from '../../providers';

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

	private setup: any;
	private loadingText: string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private loadingCtrl: LoadingController,
  	private translator: TranslateService,
  	private gameSetup: GameSetupProvider,
    private puzzleProvider: PathPuzzleProvider
  ) {
  	let translatorObs = translator.get(['LOADING_TEXT']);
  	gameSetup.ready().subscribe((setup) => {
  		this.setup = setup;
  		translatorObs.subscribe(translations => {
  			this.loadingText = translations.LOADING_TEXT;
	  		this.loadPuzzle(true);
  		});
  	});
  }

  ionViewDidEnter() {
  }

  restart() {
  	this.loadPuzzle();
  }

  loadPuzzle(initialize: boolean = false) {
  	//Present the loading indicator
  	this.ready = false;
    this.message = null;
  	let loading = this.loadingCtrl.create({ content: this.loadingText });
  	loading.present();

    if (initialize) {
      this.puzzleProvider.initialize(this.setup);
    }

  	//Get the matrix information;
    try {
      this.puzzle = this.puzzleProvider.createPuzzle(0);
    }
    catch (err) {
      this.translator.get(err).subscribe(value => {
        console.log(value);
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
    this.message = step ? tile.forward : this.setup.strings['wrong_step'];
  }
}
