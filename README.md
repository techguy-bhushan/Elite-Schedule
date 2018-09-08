# Elite-Schedule

This is demo app of Ionic with FireBase.


## Getting Started

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Install Cordova globally: `npm install -g cordova`
* Clone this repository: `git clone https://github.com/techguy-bhushan/Elite-Schedule.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.


## App Preview

All app preview screenshots were taken by running `ionic serve --lab`

 <img src="resources/screenshots/my-team.png" alt="My-Team">
 <img src="resources/screenshots/tournament-and-teams.png" alt="Tournament and Teams">
 <img src="resources/screenshots/team-details-and-standings.png" alt="Schedule">
 <img src="resources/screenshots/game.png" alt="Schedule">
 
 
 ## Deploying
 
 * Android - Run `ionic cordova run android --prod`
   - If you are deploying to Android 4.4 or below I recommend adding crosswalk: `cordova plugin add cordova-plugin-crosswalk-webview`
 * iOS - Run `ionic cordova run ios --pro
 
 
 Update google map key :
 https://github.com/techguy-bhushan/Elite-Schedule/blob/master/src/app/app.module.ts
 
  `AgmCoreModule.forRoot({apiKey: 'AIzaSyDEAOMY-dsotANOecM6ZqlOfOjBLn9sUkU'}),`
  
replace apiKey with yours map key in app.module.ts
