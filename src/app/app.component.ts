import { Component, ViewChild } from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyTeamPage} from "../pages/my-team/my-team";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {UserSettingsProvider} from "../providers/user-settings/user-settings";
import {TeamHomePage} from "../pages/team-home/team-home";
import {EliteApiProvider} from "../providers/elite-api/elite-api";

import {Events} from 'ionic-angular'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 favoriteTeams: any[];
  rootPage: any = MyTeamPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private userSettings: UserSettingsProvider,
              private loaderController : LoadingController,
              private eliteApi : EliteApiProvider,
              private  events : Events,
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
   /* this.pages = [
      { title: 'Home', component: MyTeamPage },
    ];*/

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.userSettings.initStorage();

      this.events.subscribe('favorites:changed', () => {
        console.log("received event....");
        this.refreshFavorites()
      });

      this.refreshFavorites();

      console.log("platform is ready");

    });
  }

 /* ionViewWillEnter() {
    this.refreshFavorites();
    console.log("ionViewDidLoad myapp")
  }
*/
  refreshFavorites() {
    console.log("aaya................")
    this.userSettings.getAllFavorites().then(favs => {
      this.favoriteTeams = favs;
      console.log("update favoriteTeams")
    }).catch(err => {
      console.log("Error.....", JSON.stringify(err))
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goHome() {
    this.nav.push(MyTeamPage)
  }

  goToTournaments() {
    this.nav.push(TournamentsPage)
  }

  goToTeam(fav){
    let loader = this.loaderController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();

    this.eliteApi.getTournamentsData(fav.tournamentId)
      .subscribe( d =>  {
        console.log("****", d)
          this.nav.push(TeamHomePage, fav.team)
      }
       )
  }
}
