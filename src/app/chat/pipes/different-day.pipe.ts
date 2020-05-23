import { Pipe, PipeTransform } from '@angular/core';
import { Message } from 'src/app/model/chat';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'diffDay'
})
export class DifferentDayPipe implements PipeTransform {

  constructor(public datePipe: DatePipe) {}

  transform(message: Message, nextMessage: Message) {
    if (!nextMessage) return false;

    const messageDay = this.datePipe.transform(message.date, 'dd/MM/yy');
    const nextMessageDay = this.datePipe.transform(nextMessage.date, 'dd/MM/yy');
    return nextMessageDay !== messageDay;
  }

}
