import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite'
/*
  Generated class for the SqlStrogeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqlStrogeProvider {

  private db: SQLiteObject;
  constructor(public sqlite: SQLite) {
    console.log('Hello SqlStrogeProvider Provider');
  }

  initializeDatabase() {
    return this.sqlite.create({name: 'data.db', location: 'default'}).then(db => {
      this.db = db;
      return this.db.executeSql('CREATE TABLE IF NOT EXISTS team(key text PRIMARY KEY, value text)', [])
        .then((data : SQLiteObject) => {
          console.log("after create date check", JSON.stringify(data))
        })
    })
  }

  getAll() {
    return this.db.executeSql('SELECT  key, value FROM team', [])
      .then(data =>  {
      let result = [];
        for(let i=0; i < data.rows.length; i++) {
        result.push(JSON.parse(data.rows.item(i).value))
      }
      return result;
    })
  }

  get(key : string) {
    return this.db.executeSql('SELECT key, value FROM team WHERE key = ? limit 1', [key]).then(data =>  {
      if (data.rows.length > 0) {
        return JSON.parse(data.rows.item(0).value)
      }
    });
  }

  remove(key : string) {
    return this.db.executeSql('DELETE FROM team WHERE  key = ?', [key]);
  }

  set(key : string, value: string) {
    return this.db.executeSql('INSERT or REPLACE INTO team(key, value) VALUES (?, ?)', [key, value]).then( data => {
      if (data.rows.length > 0) {
        return JSON.stringify(data.rows.item(0).value);
      }
    })
  }


}
