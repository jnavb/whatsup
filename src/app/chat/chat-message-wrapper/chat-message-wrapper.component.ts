import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Output, QueryList, ViewChildren, EventEmitter, AfterViewInit } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-message-wrapper',
  templateUrl: './chat-message-wrapper.component.html',
  styleUrls: ['./chat-message-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageWrapperComponent implements OnInit, AfterViewInit {

  @Input() messages = [];
  @Output() dayInScroll = new EventEmitter();

  @ViewChildren('lastMessageOfDay') lastMessagesOfDays: QueryList<ChatMessageComponent>;
  @ViewChildren('lastMessageOfDay', { read: ElementRef }) lastMessagesOfDaysRef: QueryList<ElementRef>;
  private previousY = Number.MIN_SAFE_INTEGER;
  private firstTime = 0;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.observeChatDayChangesOnScroll();
  }

  trackByIndex(i) { return i; }

  private observeChatDayChangesOnScroll() {
    this.lastMessagesOfDaysRef.toArray().forEach(({ nativeElement }, index, arr ) => {
      const elementVisible = new IntersectionObserver((entries) => {
          const currentY = (entries[0].boundingClientRect as DOMRectReadOnly).y;
          const isIntersecting = entries[0].isIntersecting;

          if (this.firstTime++ < arr.length) return;

          if (isIntersecting) {
            this.dayInScroll.emit(this.lastMessagesOfDays.toArray()[index].message.date.toString());
          } else if (currentY < this.previousY) {
            const next = this.lastMessagesOfDays.toArray()[index + 1] || { message: { date: new Date() }};
            const parsedNext = next && next.message.date.toString() || new Date().toString();
            this.dayInScroll.emit(parsedNext);
          }

          this.previousY = currentY;
        },
        { threshold: [0.01] }
      );
      elementVisible.observe(nativeElement);
    });
  }

}
