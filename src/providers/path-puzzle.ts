import { Injectable } from '@angular/core';

import { PathPuzzle } from './classes/path-puzzle';

@Injectable()
export class PathPuzzleProvider {
  
  private setup: any;
  private matrices: any[];

  constructor() {
  }

  initialize(setup: any) {
    this.setup = setup;
  }

  createPuzzle(level: number) {

    if (!this.setup) {
      throw "ERR_PUZZLE_MISSING_SETUP";
    }

    let matrix = this.getMatrix(level);

    if (!matrix.board) {
      throw "ERR_PUZZLE_MISSING_MATRIX_BOARD";
    }

    if (!matrix.path) {
      throw "ERR_PUZZLE_MISSING_MATRIX_PATH";
    }

    return new PathPuzzle({
      board: matrix.board,
      path: matrix.path,
      strings: this.setup.strings
    });
  }

  private getMatrix(level: number) {
    if (!this.setup.matrices || !this.setup.matrices.length) {
      throw "ERR_PUZZLE_MISSING_MATRICES";
    }

    //ToDo: Randomly choose a matrix if more than one
    if (!this.matrices || !this.matrices.length) {
      this.matrices = this.setup.matrices.slice(0);
    }
    return this.matrices.splice(Math.round((this.matrices.length - 1) * Math.random()), 1)[0];
  }
}
