import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chat-date',
  templateUrl: './chat-date.component.html',
  styleUrls: ['./chat-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatDateComponent {

  @Input() hideMode;
  @Input()
  set date(value: number) {
    const isToday = moment().isSame(value, 'day');
    this.dateView = isToday ?
      'TODAY' :
      this.datePipe.transform(value, 'MMMM dd, yyyy').toUpperCase();

    this.hideView = typeof this.hideMode === 'string' && isToday;
  }


  dateView = '';
  hideView = false;

  constructor(private datePipe: DatePipe) { }

}
