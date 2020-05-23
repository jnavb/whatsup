import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private onSearchToggle = new Subject<boolean>();

  constructor() {}

  notifySearchbar(isOpen) {
    this.onSearchToggle.next(isOpen);
  }

  onSearchToggle$() {
    return this.onSearchToggle.asObservable();
  }

}
