import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {EliteApiProvider} from "../../providers/elite-api/elite-api";
import {TeamHomePage} from "../team-home/team-home";
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";

/**
 * Generated class for the MyTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-team',
  templateUrl: 'my-team.html',
})
export class MyTeamPage {

  favorites = [];
  /*[
    {
      team : {id : 6182, name : "HC ELITE 7th", coach: "Michelott"},
      tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
      tournamentName: 'March Madness'
    },  {
      team : {id : 6182, name : "HC ELITE 7th", coach: "Michelott"},
      tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
      tournamentName: 'March Madness'
    }
  ];*/


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingController : LoadingController,
              private userSettings : UserSettingsProvider, private eliteApi : EliteApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamPage');
  }

  ionViewDidEnter() {
    //this.favorites = this.userSettings.getAllFavorites();
    this.userSettings.getAllFavorites()
      .then(favs => this.favorites = favs)
  }

  favoriteTeam($event, item) {

    let loader = this.loadingController.create( {
      content: 'Getting data',
      dismissOnPageChange : true
    });

    loader.present();

    this.eliteApi.getTournamentsData(item.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage,item.team ))
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage)
  }

  goToBack() {
    this.navCtrl.pop();
  }
}
