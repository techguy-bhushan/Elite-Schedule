import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MyTeamPage} from "../my-team/my-team";

import * as _ from 'lodash'
import {EliteApiProvider} from "../../providers/elite-api/elite-api";
import {GamePage} from "../game/game";
import moment from 'moment'
import {UserSettingsProvider} from "../../providers/user-settings/user-settings";
/**
 * Generated class for the TeamDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-details',
  templateUrl: 'team-details.html',
})
export class TeamDetailsPage {

  public team: any = {};
  public games : any[];
  public tourneyData: any;
  private teamStanding : any = {};
  private dateFilter : any;
  private allGames : any[];
  private useDateFilter : boolean = false;
  public isFollowing : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private eliteApi : EliteApiProvider,
              public alertController: AlertController,
              public toastController: ToastController,
              private userSetting : UserSettingsProvider) {
   // console.log(this.navParams);
    this.team = this.navParams.data;

    this.tourneyData = this.eliteApi.getCurrentTournament();

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
          let isTeam1 =(g.team1Id === this.team.id);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          console.log("scoreDisplay", scoreDisplay);
          return {
            gameId : g.id,
            opponent: opponentName,
            time : Date.parse(g.time),
            locationUrl : g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? "vs." : "at")
          };
      }).value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {'teamId':this.team.id})
   this.userSetting.isFavoriteTeam(this.team.id.toString()).then(value => this.isFollowing = value)
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W" : "L";
      return winIndicator + teamScore + "-" + opponentScore;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailsPage');
  }

  dateChanged() {
    if(this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'))
    } else {
      this.games = this.allGames;
    }
  }

  goHome() {
    console.log("parent", this.navCtrl.parent);
    this.navCtrl.push(MyTeamPage);
    /*  this.navCtrl.popToRoot();
    this.navCtrl.parent.popToRoot();*/
  }
  gameClick($event, game) {
  let sourcegame = this.tourneyData.games.find(g => g.id=== game.gameId)
  this.navCtrl.parent.parent.push(GamePage, sourcegame)
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : "No available."
  }

  toggleFollow() {
    if (this.isFollowing){
      let confirm = this.alertController.create({
        title : "Unfollow",
        message : "Are you sure you want unfollow?",
        buttons: [
          {
            text : "Yes",
            handler:() => {
              this.isFollowing = false;
              this.userSetting.unFavoriteTeam(this.team)
              let toast = this.toastController
                .create({
                  message: "you have unfollowed the team.",
                  duration: 3000,
                  position: 'bottom'
                });
              toast.present()
            }
          },
          {
            text : "No"
          },
        ]
      });
      confirm.present();
    } else {
      this.isFollowing =true;
      this.userSetting.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name)
    }
  }

  refreshAll($event) {
    this.eliteApi.refreshCurrentTourney()
      .subscribe(() => {
        $event.complete();
        this.ionViewDidLoad()
      })
  }

}


