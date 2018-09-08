import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import {Events, } from 'ionic-angular'
import {SqlStrogeProvider} from "../sql-stroge/sql-stroge";

/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const win : any = window;
@Injectable()
export class UserSettingsProvider {

  private sqlMode : boolean= false;
  constructor(public storage : Storage,
              public events : Events,
              public sqlStorage : SqlStrogeProvider) {
    console.log('Hello UserSettingsProvider Provider');
    if (win.sqlitePlugin) {
      this.sqlMode = true;
    } else {
      console.warn('SqLite plugin not install, falling back to regular ionic storage')
    }
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName : tournamentName
    };
    if(this.sqlMode) {
      this.sqlStorage.set(team.id.toString(),JSON.stringify(item))
    } else {
      this.storage.set(team.id.toString(),JSON.stringify(item));
    }
    this.events.publish('favorites:changed');
    console.log("added favoriteTeam")
    //console.log(this.getAllFavorites().length)
  }

  unFavoriteTeam(team) {
    if(this.sqlMode) {
      this.sqlStorage.remove(team.id.toString())

    } else {
      this.storage.remove(team.id.toString())
    }
    this.events.publish('favorites:changed');
    //console.log(this.getAllFavorites().length)
    console.log("removed favoriteTeam")

  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    if(this.sqlMode) {
      return this.sqlStorage.get(teamId.toString()).then(value => value ? true : false)

    } else {
      return new Promise(resolve => resolve(this.storage.get(teamId).then(value => value ? true : false)))
    }
  }

  getAllFavorites(): Promise<any> {
    if(this.sqlMode) {
      console.log("Retrieving all favorites.......")
      return this.sqlStorage.getAll();
    } else {
      return new Promise(resolve => {
        let  result = [];
        this.storage.forEach(data => {
          console.log("****inside storage loop***", data);
          result.push(JSON.parse(data))
        });
        return resolve(result);
      })
    }
  }

  initStorage() : Promise<any> {
    if (this.sqlMode) {
      return this.sqlStorage.initializeDatabase();
    } else {
      return new Promise(resolve => resolve())
    }
  }
}
