import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { APP_CONFIG_KEY } from './constants';

@Injectable()
export class AppConfigProvider {
  private observer: ReplaySubject<any> = new ReplaySubject<any>(1);
  private config: any;

  constructor(private storage: Storage){
    this.storage.get(APP_CONFIG_KEY).then((data) => {
      this.config = {};
      if (data) {
        this.config = data;
      }
      this.observer.next(this.config);
    });
  }

  ready():Observable<any> {
    return this.observer;
  }

  get(key:string, defaultValue?:any):any {
    let v = this.config && this.config[key];
    return v === undefined ? defaultValue : v;
  }

  set(key:string, value:any) {
    this.config[key] = value;
    return this.storage.set(APP_CONFIG_KEY, this.config);
  }
}
