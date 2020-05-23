import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateChatPreview'
})
export class DateChatPreviewPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const TODAY = moment();
    const YESTERDAY = moment().subtract(1, 'd').startOf('d');
    const valueMoment = moment(value);

    if (valueMoment.isSame(TODAY, 'd')) return valueMoment.format('HH:mm');
    if (valueMoment.isSame(YESTERDAY, 'd')) return 'Yesterday';
    return valueMoment.format('DD/MM/YY');
  }

}
