import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AndroidBackService {

  private buttonCall = () => {};

  constructor(
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.buttonCall();
    });
  }

  onBack(callback: () => any) {
    this.buttonCall = callback;
  }

}
