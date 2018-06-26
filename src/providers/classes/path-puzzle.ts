const MAX_LENGTH = 26;
const STOPPERS = ['iceberg', 'tornado'];

export function rand(max:number, min:number = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * max) + min);
}

export class PathPuzzle {
	options: any;
	board: any;
	private stepCount: number = 0;
	private lastTile: any;
	private completed: boolean;

	private _rows: number;
	get rows() {
		return this._rows == null ? (this._rows = this.board.length) : this._rows;
	}

	private _columns: number;
	get columns() {
		return this._columns == null ? (this._columns = this.board[0].length) : this._columns;
	}

	get currentStep() {
		return this.stepCount;
	}


	constructor(options:any){
		this.options = options;
		this.initialize();
	}

	initialize() {
		this.createBoard();
	}


	createBoard() {

		if (this.options.board.length > MAX_LENGTH) {
			throw "ERR_PUZZLE_MAXLENGTH";
		}

		let i = 0, j = 0;
		let board = [];
		for(let r of this.options.board) {
			j = 0;
			let row = []; 
			for(let c of r) {
				const text = this.options.strings[c];
				let cell = {
					key: String.fromCharCode(65+j)+(i+1),
					row: i,
					col: j,
					value: c,
					label: text.label,
					forward: text.forward
				};
				row.push(cell);
				j++;
			}
			i++;
			board.push(row);
		}

		if (i == 0 || j == 0) {
			throw "ERR_PUZZLE_MISSING_ROWS_OR_COLUMNS";
		}
		this.stepCount = 0;
		this.completed = false;
		this.lastTile = null;
		this.board = board;
	}

	walkTo(tile) {

		//Can walk to this?
		if (tile.walked || this.completed) {
			return;
		}

		const column = tile.col;
		const row = tile.row;

		if (!this.lastTile) {
			if ((row+1) < this._rows) {
				return;
			}
		}
		else {
			const deltaR = Math.abs(this.lastTile.row - row);
			const deltaC = Math.abs(this.lastTile.col - column);
			if (deltaR > 1 || deltaC > 1) {
				return;
			}
		}
		tile.correct = (tile.key == this.options.path[this.stepCount]);
		tile.walked = true;
		tile.current = true;
		if (tile.correct) {
			this.stepCount++;
			if (row == 0) {
				this.completed = true;
			}
		}
		else {
			this.completed = true;
			tile.stopper = STOPPERS[rand(STOPPERS.length, 1) - 1];
		}
		if (this.lastTile) this.lastTile.current = false;
		this.lastTile = tile;
		return tile.correct;
	}
}