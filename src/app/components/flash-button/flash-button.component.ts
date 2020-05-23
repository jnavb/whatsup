import { Component } from '@angular/core';

@Component({
  selector: 'app-flash-button',
  templateUrl: './flash-button.component.html',
  styleUrls: ['./flash-button.component.scss']
})
export class FlashButtonComponent  {

  isFlashActive = false;

  constructor() { }

}
