import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamHomePage} from "../team-home/team-home";
import {EliteApiProvider} from "../../providers/elite-api/elite-api";
import * as _ from 'lodash'
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [];
  private allTeams : any;
  private allTeamsDivisions : any;
  public queryText : string;
 /* public teams = [
    {id:1, name:"HC Elite"},
    {id:2, name:"Team Takeover"},
    {id:3, name:"DC thunder"},
  ];
*/
  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi :EliteApiProvider,
              public loaderController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectTournament = this.navParams.data;
    console.log("selectTournament", selectTournament.id);
    console.log("eliteApi", this.eliteApi);

    let loader = this.loaderController.create({
      content: 'Getting Tournaments...',
      // spinner : 'dots'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentsData(selectTournament.id)
        .subscribe(data => {
          this.allTeams = data.teams;
          this.allTeamsDivisions = _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();

          this.teams = this.allTeamsDivisions;

/*
          console.log("allTeamsDivisions-->",this.allTeamsDivisions);
*/
          loader.dismiss()
        })
    });

  }

  itemTapped($event, team) {
    console.log(team);
    this.navCtrl.push(TeamHomePage, team)
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push( {divisionName: td.divisionName, divisionTeams : teams});
      }
    });
    this.teams = filteredTeams;
  }
}
