import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {EliteApiProvider} from "../../providers/elite-api/elite-api";

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public tournaments : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi : EliteApiProvider,
              public loaderController : LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loaderController.create({
      content: 'Getting Tournaments...',
     // spinner : 'dots'
    });

    console.log('ionViewDidLoad TournamentsPage');
    loader.present().then(() => {
      this.eliteApi.getTournaments()
        .then(data => {
          this.tournaments = data;
          loader.dismiss();
        });
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TournamentsPage');
  }
  ionViewWillLeave() {
    console.log('ionViewWillLeave TournamentsPage');
  }
  ionViewWillUnload() {
    console.log('ionViewWillUnload TournamentsPage');
  }


  itemTapped($event, tournament) {
    console.log("call............");
    this.navCtrl.push(TeamsPage, tournament)
  }

}
