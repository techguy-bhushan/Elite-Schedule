import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamDetailsPage } from './team-details';

@NgModule({
  declarations: [
    TeamDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamDetailsPage),
  ],
})
export class TeamDetailsPageModule {}
