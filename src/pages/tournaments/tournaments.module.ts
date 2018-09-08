import { NgModule } from '@angular/core';
import {IonicPageModule, NavController} from 'ionic-angular';
import { TournamentsPage } from './tournaments';

@NgModule({
  declarations: [
    TournamentsPage,
  ],
  imports: [
    IonicPageModule.forChild(TournamentsPage),
  ],
})
export class TournamentsPageModule {

}
