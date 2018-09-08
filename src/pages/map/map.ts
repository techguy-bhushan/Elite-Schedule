import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EliteApiProvider} from "../../providers/elite-api/elite-api";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var window : any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public map: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private eliteApi: EliteApiProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat : location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    }
  }

  goToDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`

  }
}
