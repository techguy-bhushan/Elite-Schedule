import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TeamDetailsPage} from "../team-details/team-details";
import {StandingPage} from "../standing/standing";
import {MyTeamPage} from "../my-team/my-team";

/**
 * Generated class for the TeamHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  public teamDetailsTab = TeamDetailsPage;
  public standingTab = StandingPage;
  public team : any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome() {
   // this.navCtrl.push(MyTeamPage);
    this.navCtrl.popToRoot();
  }
}
