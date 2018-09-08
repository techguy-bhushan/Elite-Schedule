import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of'

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EliteApiProvider {

  private tourneyData = {};
  private currentTournament : any;
  private baseUrl = "https://sample-app-cead3.firebaseio.com";
  constructor(public http: Http) {
    console.log('Hello EliteApiProvider Provider');
  }

  getCurrentTournament() {
    return this.currentTournament;
  }

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()));
    })
  }

/*
  getTournamentsData(tournamentId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
      .map(response => {
        this.currentTournament = response.json();
        return this.currentTournament;
      })
  }
*/

  getTournamentsData(tournamentId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tourneyData[tournamentId]) {
      console.log("->>>>>>>>>")
      this.currentTournament = this.tourneyData[tournamentId];
      return Observable.of(this.currentTournament);
    }
    console.log("about to make call")
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
      .map(response => {
        console.log("currentTournament id::", tournamentId);
        this.tourneyData[tournamentId] = response.json();
        this.currentTournament = this.tourneyData[tournamentId];
        return this.currentTournament;
      })
  }


  refreshCurrentTourney() {
    console.log(this.currentTournament.tournament.id)
    return this.getTournamentsData(this.currentTournament.tournament.id, true)
  }
}
