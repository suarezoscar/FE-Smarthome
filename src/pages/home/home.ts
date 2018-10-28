import {Component, OnInit} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Ithermostat} from "../../config/thermostat.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public thermostat: Ithermostat;
  private basePath: string = 'http://178.62.62.5:3000/';

  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchAllThermostatInfo();
  }

  fetchAllThermostatInfo(event?) {
    this.http.get(this.basePath).subscribe({
      next: res => this.thermostat = <Ithermostat>res,
      error: err => console.error(err),
      complete: () => {
        if (event) event.complete()
      }
    });
  }

  doRefresh($event: Refresher) {
    this.fetchAllThermostatInfo($event);
  }
}
