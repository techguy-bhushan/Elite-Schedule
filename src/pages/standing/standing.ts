import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash'
import {EliteApiProvider} from "../../providers/elite-api/elite-api";
/**
 * Generated class for the StandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-standing',
  templateUrl: 'standing.html',
})
export class StandingPage {

  public allStandings: any[];
  public standings: any[];
  public team: any;
  public  divisionFilter = 'division';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private eliteApi :EliteApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingPage');
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTournament();
    this.standings = tourneyData.standings;
    this.allStandings = tourneyData.standings;
    /*this.allStandings = _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value();*/
    this.filterDivision()
    console.log("standings", this.standings);
    console.log("devisionStanding", this.allStandings)

  }

  getHeader(recode, recoedIndex, records) {
    if (recoedIndex === 0 || recode.division !== records[recoedIndex-1].division) {
      return recode.division
    }
    return null
  }

  filterDivision() {
    if(this.divisionFilter === 'all') {
      this.standings = this.allStandings
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division)
    }
  }
}
