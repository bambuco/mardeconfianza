import { Injectable } from '@angular/core';

import { PathPuzzle } from './classes/path-puzzle';

@Injectable()
export class PathPuzzleProvider {
  
  private setup: any;
  private matrices: any[];
  private sea: string;

  constructor() {
  }

  initialize(setup: any, sea: string) {
    this.setup = setup;
    this.sea = sea;
    this.matrices = [];
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

    if (!this.matrices || !this.matrices.length) {
      this.matrices = this.setup.matrices.slice(0).filter(m => m.sea == this.sea);
    }

    if (!this.matrices || !this.matrices.length) {
      throw "ERR_PUZZLE_MISSING_MATRICES";
    }
    return this.matrices.splice(Math.round((this.matrices.length - 1) * Math.random()), 1)[0];
  }
}
