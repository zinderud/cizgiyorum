import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Cizim } from '../../../config/interface/cizim';

@Injectable()
export class CizimlerService {

  public listCizimler: FirebaseListObservable<Cizim[]>
  public cizimObject: FirebaseObjectObservable<Cizim>

  constructor(
    private _angularFireDatabase: AngularFireDatabase,
  ) { }

  public getListCizimler() {
    return this.listCizimler = this._angularFireDatabase.list('cizimler') as FirebaseListObservable<Cizim[]>;
  }

  public getCizimObject(key) {
    return this.cizimObject = this._angularFireDatabase.object('cizimler/' + key) as FirebaseObjectObservable<Cizim>;
  }

}
