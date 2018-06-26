import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class GameSetupProvider {
  private observer: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) {
    this.http.get('assets/game/setup.json').subscribe(setup => {
    	this.observer.next(setup);
    });
  }

  ready():Observable<any> {
    return this.observer;
  }
}
