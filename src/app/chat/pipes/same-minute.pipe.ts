import { Pipe, PipeTransform } from '@angular/core';
import { Message } from 'src/app/model/chat';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'sameMinute'
})
export class SameMinutePipe implements PipeTransform {

  constructor(public datePipe: DatePipe) {}

  transform(message: Message, lastMessage: Message) {
    if (!lastMessage) return false;
    if (message.from !== lastMessage.from) return false;

    const lastMessageTime = this.datePipe.transform(lastMessage.date, 'HH:mm');
    const messageTime = this.datePipe.transform(message.date, 'HH:mm');
    return lastMessageTime === messageTime;
  }

}
