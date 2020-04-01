import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  postObserver : Observable<Object>;
  postData : Object;
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-d31cc243-3246-4594-adfd-815d213bbb75.ws-eu01.gitpod.io/');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  }
  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement,newSpeed: HTMLInputElement,newDeploy_Time: HTMLInputElement,newRange: HTMLInputElement,newTarget: HTMLInputElement,newCount: HTMLInputElement,newTransport: HTMLInputElement,newType: HTMLInputElement,newRarity: HTMLInputElement): boolean {
    let newData = new Unit(newUnit.value, newCost.value, newHitSpeed.value, newSpeed.value, newDeploy_Time.value, newRange.value, newTarget.value, newCount.value, newTransport.value, newType.value, newRarity.value);
    this.postObserver = this.http.post('https://3000-d31cc243-3246-4594-adfd-815d213bbb75.ws-eu01.gitpod.io', newData);
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }
}
