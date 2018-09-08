import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyTeamPage} from "../pages/my-team/my-team";
import {GamePage} from "../pages/game/game";
import {TeamsPage} from "../pages/teams/teams";
import {TeamDetailsPage} from "../pages/team-details/team-details";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {TeamHomePage} from "../pages/team-home/team-home";
import {StandingPage} from "../pages/standing/standing";
import { EliteApiProvider } from '../providers/elite-api/elite-api';
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from '@ionic/storage'
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import {MapPage} from "../pages/map/map";
import {AgmCoreModule} from '@agm/core'
import {SQLite} from '@ionic-native/sqlite'
import { SqlStrogeProvider } from '../providers/sql-stroge/sql-stroge';

@NgModule({
  declarations: [
    MyApp,
    MyTeamPage,
    GamePage,
    TeamsPage,
    TeamDetailsPage,
    TournamentsPage,
    TeamHomePage,
    StandingPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDEAOMY-dsotANOecM6ZqlOfOjBLn9sUkU'}),
    IonicStorageModule.forRoot()
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamPage,
    GamePage,
    TeamsPage,
    TeamDetailsPage,
    TournamentsPage,
    TeamHomePage,
    StandingPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiProvider,
    UserSettingsProvider,
    SQLite,
    SqlStrogeProvider
  ]
})
export class AppModule {}
