import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatPreview, AudioMessage, TextMessage, ImageMessage } from 'src/app/model/chat';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  @Input() chat: ChatPreview;
  @Input() set searchText(searchResult) {
    if (!searchResult) return;

    this.search = {
      prefix: searchResult.input.substring(0, searchResult.index),
      highlighted: searchResult[0],
      suffix: searchResult.input.substring(searchResult.index + searchResult[0].length, searchResult.input.lenght)
    };
  }
  @Output() avatar = new EventEmitter();
  @Output() item = new EventEmitter();

  search = {
    prefix: '',
    highlighted: '',
    suffix: ''
  };

  constructor(
    private ui: UIService
  ) {}

  ngOnInit() {}

  onAvatar(target: HTMLElement) {
    this.ui.profilePreview((target as HTMLElement).getBoundingClientRect(), this.chat);
  }

  onChat() {
    this.item.emit('');
  }

  // https://github.com/angular/angular/issues/17953
  get audioMessage() { return this.chat.lastMessage as AudioMessage; }
  get textMessage() { return this.chat.lastMessage as TextMessage; }
  get imageMessage() { return this.chat.lastMessage as ImageMessage; }

}
