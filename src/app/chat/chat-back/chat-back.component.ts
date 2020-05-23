import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-chat-back',
  templateUrl: './chat-back.component.html',
  styleUrls: ['./chat-back.component.scss']
})
export class ChatBackComponent {

  @Input() img = '';

  @HostBinding('class.ion-activatable') someField = true;

  constructor() { }

}
