import { Injectable } from '@angular/core';
import { Cab } from '../models/cab.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CabService {
  cabsChanged = new Subject<Cab[]>();
  private cabs: Cab[] = [];

  constructor() {}

  setCabs(cabs: Cab[]) {
    this.cabs = cabs;
    this.cabsChanged.next(this.cabs.slice());
  }

  getCab(index: string) {
    return this.cabs[+index];
  }

  getCabByName(name: string) {
    let cab: Cab = this.cabs.find((cab) => {
      return cab.owner === name;
    });
    return cab;
  }

  addCab(cab: Cab) {
    this.cabs.push(cab);
    this.cabsChanged.next(this.cabs.slice());
  }

  updateCab(index: string, newCab: Cab) {
    this.cabs[+index] = newCab;
    this.cabsChanged.next(this.cabs.slice());
  }

  deleteCab(index: string) {
    this.cabs.splice(+index, 1);
    this.cabsChanged.next(this.cabs.slice());
  }
}
