import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TextMessage } from 'src/app/model/chat';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {

  @Input() message: TextMessage;

  @HostBinding('class.message--outgoing')
  get toClass() { return !this.message.from; }
  @HostBinding('class.message--incoming')
  get fromClass() { return this.message.from; }

  constructor() { }

}
