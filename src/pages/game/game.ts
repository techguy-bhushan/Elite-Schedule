import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TeamHomePage} from "../team-home/team-home";
import {EliteApiProvider} from "../../providers/elite-api/elite-api";
import {MapPage} from "../map/map";

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window : any;

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  public game: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi:EliteApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time)
    console.log(this.game)
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTournament();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team)
  }


  goToDirections() {
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[this.game.locationId]
    console.log("goToDirections", `geo:${location.latitude},${location.longitude};u=35`)

    window.location = `geo:${location.latitude},${location.longitude};u=35`

  }

  goToMap() {
    console.log("Going to map..");
      this.navCtrl.push(MapPage, this.game)
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger'
  }
}
